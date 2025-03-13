import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface OrderChartProps {
  data: {
    date: string;
    orders: number;
    revenue: number;
  }[];
  type: 'orders' | 'revenue';
}

export function OrderChart({ data, type }: OrderChartProps) {
  return (
    <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700 w-full">
      {/* Horizontal scroll container to avoid cramped chart on large data sets */}
      <div className="overflow-x-auto">
        {/* Minimum width ensures chart can expand horizontally if there's lots of data */}
        <div className="min-w-[600px] h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                tickCount={5}        
                interval="preserveStartEnd"  
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                stroke="#94A3B8"
              />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  color: '#F3F4F6',
                }}
                labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
                formatter={(value: number) =>
                  type === 'revenue' ? `$${value.toFixed(2)}` : value
                }
              />
              <Area
                type="monotone"
                dataKey={type}
                stroke="#14B8A6"
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
