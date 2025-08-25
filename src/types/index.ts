export interface Prediction {
  class: string;
  confidence: number;
  timestamp: number;
}

export interface CombinedResult {
  majorityClass: string;
  averageConfidence: number;
}

export interface ConnectionStatus {
  isConnected: boolean;
  connectionType: 'usb' | 'bluetooth' | null;
}