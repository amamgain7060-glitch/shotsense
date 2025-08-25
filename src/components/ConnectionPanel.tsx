import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Usb, Bluetooth, Wifi, WifiOff, Play } from 'lucide-react';
import { ConnectionStatus } from '@/types';

interface ConnectionPanelProps {
  connectionStatus: ConnectionStatus;
  error: string | null;
  debugInfo?: string;
  onConnectUSB: () => void;
  onConnectBluetooth: () => void;
  onDisconnect: () => void;
  onSimulateData: () => void;
}

export function ConnectionPanel({
  connectionStatus,
  error,
  debugInfo,
  onConnectUSB,
  onConnectBluetooth,
  onDisconnect,
  onSimulateData,
}: ConnectionPanelProps) {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          {connectionStatus.isConnected ? (
            <div className="p-2 bg-green-500/20 rounded-full">
              <Wifi className="h-5 w-5 text-green-400" />
            </div>
          ) : (
            <div className="p-2 bg-gray-500/20 rounded-full">
              <WifiOff className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <span className="text-xl font-semibold">Arduino Connection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <span className="text-blue-200 font-medium">Status:</span>
          <Badge 
            variant={connectionStatus.isConnected ? "default" : "secondary"}
            className={connectionStatus.isConnected 
              ? "bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2" 
              : "bg-gray-500/20 text-gray-400 border-gray-500/30 px-4 py-2"
            }
          >
            {connectionStatus.isConnected
              ? `🟢 Connected via ${connectionStatus.connectionType?.toUpperCase()}`
              : "🔴 Disconnected"}
          </Badge>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 text-red-200">
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}

        {debugInfo && connectionStatus.isConnected && (
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <AlertDescription className="text-blue-200 font-mono text-sm">{debugInfo}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap gap-3">
          {!connectionStatus.isConnected ? (
            <>
              <Button 
                onClick={onConnectUSB} 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                <Usb className="h-4 w-4" />
                Connect USB
              </Button>
              <Button 
                onClick={onConnectBluetooth} 
                variant="outline" 
                className="flex items-center gap-2 border-blue-400/30 text-blue-200 hover:bg-blue-500/20 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                <Bluetooth className="h-4 w-4" />
                Connect Bluetooth
              </Button>
            </>
          ) : (
            <Button 
              onClick={onDisconnect} 
              variant="outline"
              className="border-red-400/30 text-red-200 hover:bg-red-500/20 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            >
              Disconnect
            </Button>
          )}
          
          <Button 
            onClick={onSimulateData} 
            variant="ghost" 
            className="flex items-center gap-2 text-cyan-200 hover:bg-cyan-500/20 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            <Play className="h-4 w-4" />
            Simulate Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}