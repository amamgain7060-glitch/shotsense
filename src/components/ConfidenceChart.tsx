import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ChartDataPoint {
  x: number;
  y: number;
  class: string;
  timestamp: number;
}

interface ConfidenceChartProps {
  data: ChartDataPoint[];
}

export function ConfidenceChart({ data }: ConfidenceChartProps) {
  const formatTooltip = (value: number, name: string, props: unknown) => {
    if (name === 'y') {
      return [`${value.toFixed(1)}%`, 'Confidence'];
    }
    return [value, name];
  };

  const formatLabel = (label: number) => {
    const point = data[label];
    return point ? `${point.class} - ${new Date(point.timestamp).toLocaleTimeString()}` : '';
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <div className="p-2 bg-green-500/20 rounded-full">
            <span className="text-lg">📈</span>
          </div>
          Confidence Over Time
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80 w-full bg-white/5 rounded-xl p-4 border border-white/10">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="x" 
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tick={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <YAxis 
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value.toFixed(0)}%`}
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <Tooltip 
                  formatter={formatTooltip}
                  labelFormatter={formatLabel}
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <ReferenceLine y={50} stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, stroke: '#06b6d4', strokeWidth: 3, fill: '#0891b2' }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-blue-300/60">
              <div className="text-4xl mb-4">📈</div>
              <p>No data to display</p>
              <p className="text-sm mt-2">Chart will appear once predictions start coming in</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}