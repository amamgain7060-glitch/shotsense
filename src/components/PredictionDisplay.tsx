import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Prediction, CombinedResult } from '@/types';

interface PredictionDisplayProps {
  latestPrediction: Prediction | null;
  combinedResult: CombinedResult | null;
  lastFivePredictions: Prediction[];
  averagePredictions: Array<{
    class: string;
    confidence: number;
    count: number;
    timestamp: number;
  }>;
}

export function PredictionDisplay({ latestPrediction, combinedResult, lastFivePredictions, averagePredictions }: PredictionDisplayProps) {
  const formatConfidence = (confidence: number) => `${(confidence * 100).toFixed(1)}%`;

  const getClassColor = (className: string) => {
    const normalizedName = className.toLowerCase().replace(/[\s_]/g, '');
    const colors: Record<string, string> = {
      'forehandserve': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'backhandserve': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'netshot': 'bg-gradient-to-r from-orange-500 to-amber-500',
      'idle': 'bg-gradient-to-r from-gray-500 to-slate-500',
    };
    return colors[normalizedName] || 'bg-gradient-to-r from-purple-500 to-violet-500';
  };

  const getClassIcon = (className: string) => {
    const normalizedName = className.toLowerCase().replace(/[\s_]/g, '');
    const icons: Record<string, string> = {
      'forehandserve': '🏘',
      'backhandserve': '🏘',
      'netshot': '🥅',
      'idle': '⏸️',
    };
    return icons[normalizedName] || '🏘';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white text-xl">
            <div className="p-2 bg-cyan-500/20 rounded-full">
              <span className="text-lg">🎯</span>
            </div>
            Latest Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {latestPrediction ? (
            <div className="space-y-6">
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl mb-3">{getClassIcon(latestPrediction.class)}</div>
                <Badge className={`${getClassColor(latestPrediction.class)} text-white px-6 py-2 text-lg font-semibold rounded-full border-0`}>
                  {latestPrediction.class}
                </Badge>
              </div>
              
              <div className="text-center text-sm text-blue-300/70 mt-4">
                {new Date(latestPrediction.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ) : (
            <div className="text-center text-blue-300/60 py-12">
              <div className="text-4xl mb-4">🎯</div>
              <p>No predictions yet</p>
              <p className="text-sm mt-2">Connect your Arduino to start analyzing shots</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white text-xl">
            <div className="p-2 bg-purple-500/20 rounded-full">
              <span className="text-lg">📊</span>
            </div>
            Average of Last 5 Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {averagePredictions.length > 0 ? (
            <div className="space-y-3">
              {averagePredictions.map((avgPrediction, index) => (
                <div key={avgPrediction.class} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getClassIcon(avgPrediction.class)}</span>
                      <div>
                        <Badge className={`${getClassColor(avgPrediction.class)} text-white px-3 py-1 rounded-full border-0 text-sm font-medium`}>
                          {avgPrediction.class}
                        </Badge>
                        <div className="text-xs text-blue-300/70 mt-1">
                          {avgPrediction.count} occurrence{avgPrediction.count > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-blue-300/70">
                      Avg. of {avgPrediction.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-blue-300/60 py-12">
              <div className="text-4xl mb-4">📊</div>
              <p>No predictions yet</p>
              <p className="text-sm mt-2">Start analyzing to see average predictions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}