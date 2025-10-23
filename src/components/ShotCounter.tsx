import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ShotCounterProps {
  totalShots: number;
  shotCounts: Record<string, number>;
  onReset: () => void;
}

export function ShotCounter({ totalShots, shotCounts, onReset }: ShotCounterProps) {
  const getClassIcon = (className: string) => {
    const normalizedName = className.toLowerCase().replace(/[\s_]/g, '');
    const icons: Record<string, string> = {
      'forehandserve': '🏸',
      'backhandserve': '🏸',
      'netshot': '🥅',
      'idle': '⏸️',
    };
    return icons[normalizedName] || '🏸';
  };

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

  const sortedShots = Object.entries(shotCounts)
    .filter(([className]) => className.toLowerCase() !== 'idle' && className.toLowerCase() !== 'confidence')
    .sort(([, a], [, b]) => b - a);

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-white text-xl">
            <div className="p-2 bg-green-500/20 rounded-full">
              <span className="text-lg">📊</span>
            </div>
            Shot Counter
          </CardTitle>
          <Button 
            onClick={onReset}
            variant="outline" 
            size="sm"
            className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
          >
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-cyan-400">{totalShots}</div>
            <div className="text-sm text-blue-300/70">Total Shots</div>
          </div>

          {sortedShots.length > 0 ? (
            <div className="space-y-3">
              {sortedShots.map(([className, count]) => (
                <div key={className} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getClassIcon(className)}</span>
                    <Badge className={`${getClassColor(className)} text-white px-3 py-1 rounded-full border-0 text-sm font-medium`}>
                      {className}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-white">{count}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-blue-300/60 py-8">
              <div className="text-3xl mb-2">🎯</div>
              <p>No shots detected yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}