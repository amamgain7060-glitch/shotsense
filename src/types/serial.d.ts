declare global {
  interface Navigator {
    serial?: {
      requestPort(): Promise<SerialPort>;
    };
    bluetooth?: {
      requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
    };
  }

  interface SerialPort {
    open(options: { baudRate: number }): Promise<void>;
    close(): Promise<void>;
    readable: ReadableStream<Uint8Array>;
  }

  interface RequestDeviceOptions {
    filters?: BluetoothLEScanFilter[];
    optionalServices?: BluetoothServiceUUID[];
  }

  interface BluetoothLEScanFilter {
    services?: BluetoothServiceUUID[];
  }

  interface BluetoothDevice {
    name?: string;
    gatt?: BluetoothRemoteGATTServer;
  }

  interface BluetoothRemoteGATTServer {
    connect(): Promise<BluetoothRemoteGATTServer>;
  }
}

export {};