import { useState, useCallback, useRef } from 'react';
import { Prediction, ConnectionStatus } from '@/types';

export const useArduinoConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    connectionType: null,
  });
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const portRef = useRef<SerialPort | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);

  const connectUSB = useCallback(async () => {
    try {
      setError(null);
      
      if (!('serial' in navigator)) {
        throw new Error('Web Serial API not supported in this browser');
      }

      const port = await navigator.serial!.requestPort();
      await port.open({ 
        baudRate: 115200, // Arduino Nano BLE Sense typically uses 115200
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        flowControl: 'none'
      });
      
      portRef.current = port;
      setConnectionStatus({ isConnected: true, connectionType: 'usb' });
      setDebugInfo('USB connected successfully. Waiting for data...');
      console.log('Arduino Nano BLE Sense connected via USB');

      const reader = port.readable.getReader();
      readerRef.current = reader;

      let buffer = '';
      
      // Start reading data
      const readData = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const text = new TextDecoder().decode(value);
            buffer += text;
            
            // Process complete lines
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer
            
            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed && trimmed.startsWith('{') && trimmed.endsWith('}')) {
                try {
                  const prediction = parseArduinoLine(trimmed);
                  if (prediction) {
                    setPredictions(prev => [...prev, prediction].slice(-50));
                    setDebugInfo(`Latest: ${prediction.class} (${(prediction.confidence * 100).toFixed(1)}%)`);
                  } else {
                    setDebugInfo(`Received: ${trimmed}`);
                  }
                } catch (parseError) {
                  console.warn('Failed to parse Arduino line:', trimmed, parseError);
                }
              }
            }
          }
        } catch (readError) {
          console.error('Error reading from serial port:', readError);
          setError('Error reading from USB connection');
          setConnectionStatus({ isConnected: false, connectionType: null });
        }
      };

      readData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect via USB');
      console.error('USB connection error:', err);
    }
  }, []);

  const connectBluetooth = useCallback(async () => {
    try {
      setError(null);

      if (!('bluetooth' in navigator)) {
        throw new Error('Web Bluetooth API not supported in this browser');
      }

      const device = await navigator.bluetooth!.requestDevice({
        filters: [
          { namePrefix: 'Arduino' },
          { namePrefix: 'Nano' },
          { services: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e'] } // Nordic UART Service
        ],
        optionalServices: [
          '6e400001-b5a3-f393-e0a9-e50e24dcca9e', // Nordic UART Service
          '6e400002-b5a3-f393-e0a9-e50e24dcca9e', // TX Characteristic
          '6e400003-b5a3-f393-e0a9-e50e24dcca9e'  // RX Characteristic
        ]
      });

      const server = await device.gatt!.connect();
      const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
      const rxCharacteristic = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e');
      
      setConnectionStatus({ isConnected: true, connectionType: 'bluetooth' });

      let buffer = '';
      
      // Start notifications for incoming data
      await rxCharacteristic.startNotifications();
      rxCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
        if (value) {
          const text = new TextDecoder().decode(value);
          buffer += text;
          
          // Process complete lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && trimmed.startsWith('{') && trimmed.endsWith('}')) {
              try {
                const prediction = parseArduinoLine(trimmed);
                if (prediction) {
                  setPredictions(prev => [...prev, prediction].slice(-50));
                }
              } catch (parseError) {
                console.warn('Failed to parse Bluetooth line:', trimmed, parseError);
              }
            }
          }
        }
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect via Bluetooth');
      console.error('Bluetooth connection error:', err);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      if (readerRef.current) {
        await readerRef.current.cancel();
        readerRef.current = null;
      }
      
      if (portRef.current) {
        await portRef.current.close();
        portRef.current = null;
      }

      setConnectionStatus({ isConnected: false, connectionType: null });
      setError(null);
    } catch (err) {
      console.error('Disconnect error:', err);
    }
  }, []);

  // Parse Arduino JSON format
  const parseArduinoLine = (line: string): Prediction | null => {
    try {
      // Clean the line - remove any extra whitespace or control characters
      const cleanLine = line.replace(/[\r\n\t]/g, '').trim();
      
      if (!cleanLine.startsWith('{') || !cleanLine.endsWith('}')) {
        return null;
      }
      
      const data = JSON.parse(cleanLine);
      
      // Find class with highest probability
      let maxClass = '';
      let maxConfidence = 0;
      
      for (const [className, confidence] of Object.entries(data)) {
        const conf = typeof confidence === 'string' ? parseFloat(confidence) : confidence;
        if (typeof conf === 'number' && !isNaN(conf) && conf > maxConfidence) {
          maxConfidence = conf;
          maxClass = className.replace(/_/g, ' '); // Replace underscores with spaces for display
        }
      }
      
      // Only return prediction if confidence is above threshold and not Idle with very low confidence
      if (maxClass && maxConfidence > 0.7 && !(maxClass.toLowerCase().includes('idle') && maxConfidence < 0.1)) {
        return {
          class: maxClass,
          confidence: maxConfidence,
          timestamp: Date.now(),
        };
      }
    } catch (error) {
      console.warn('Parse error for line:', line, error);
    }
    return null;
  };

  // Simulate incoming data for demo purposes
  const simulateData = useCallback(() => {
    const classes = ['Forehand serve', 'Backhand serve', 'Net shot', 'Idle'];
    const probabilities = [Math.random(), Math.random(), Math.random(), Math.random()];
    const total = probabilities.reduce((sum, p) => sum + p, 0);
    const normalized = probabilities.map(p => p / total);
    
    // Find highest probability
    const maxIndex = normalized.indexOf(Math.max(...normalized));
    
    const prediction: Prediction = {
      class: classes[maxIndex],
      confidence: normalized[maxIndex],
      timestamp: Date.now(),
    };

    setPredictions(prev => [...prev, prediction].slice(-50));
  }, []);

  const resetPredictions = useCallback(() => {
    setPredictions([]);
  }, []);

  return {
    connectionStatus,
    predictions,
    error,
    debugInfo,
    connectUSB,
    connectBluetooth,
    disconnect,
    simulateData,
    resetPredictions,
  };
};