import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface MetricsDataPoint {
  timestamp: Date;
  successRate: number;
  averageTime: number;
  totalAssigned: number;
}

interface MetricsChartProps {
  data: MetricsDataPoint[];
}

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
  textAnchor?: string;
}

function safeNumber(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0;
  }
  return value;
}

function CustomXAxisTick({ x, y, payload, textAnchor }: CustomTickProps) {
  const dateObj = new Date(payload.value);
  const datePart = format(dateObj, 'MMM d');
  const timePart = format(dateObj, 'HH:mm');

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={-2}
        fill="#9CA3AF"
        textAnchor={textAnchor || 'middle'}
        fontSize={10}
      >
        {datePart}
      </text>
      <text
        x={0}
        y={0}
        dy={14}
        fill="#9CA3AF"
        textAnchor={textAnchor || 'middle'}
        fontSize={10}
      >
        {timePart}
      </text>
    </g>
  );
}

type ValueType = string | number | (string | number)[];

export function MetricsChart({ data }: MetricsChartProps) {
  const chartData = data.map((item) => ({
    timestamp: item.timestamp,
    successRate: safeNumber(item.successRate),
    averageTime: safeNumber(item.averageTime),
    totalAssigned: safeNumber(item.totalAssigned),
  }));

  return (
    <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700 w-full">
      <h3 className="text-lg font-semibold mb-6 text-white">Metrics Over Time</h3>

      {/* Horizontal scroll container */}
      <div className="overflow-x-auto">
        {/* Ensure chart has a minimum width */}
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="timestamp"
                tick={<CustomXAxisTick x={0} y={0} payload={{ value: '' }} />}
                interval="preserveEnd"
                tickMargin={15}
                tickCount={3}
              />
              <YAxis yAxisId="left" tick={{ fill: '#9CA3AF' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F9FAFB',
                }}
                formatter={(value: ValueType, name: string) => {
                  if (typeof value === 'number') {
                    if (name === 'Success Rate (%)') {
                      return [`${Math.round(value)}%`, name];
                    } else if (name === 'Avg Time (sec)') {
                      return [`${value.toFixed(4)} sec`, name];
                    }
                    return [value, name];
                  }
                  return [value, name];
                }}
                labelFormatter={(label: string | number) => {
                  return format(new Date(label), 'PPpp');
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="successRate"
                stroke="#2DD4BF"
                strokeWidth={2}
                dot={{ fill: '#2DD4BF' }}
                name="Success Rate (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="averageTime"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={{ fill: '#60A5FA' }}
                name="Avg Time (sec)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
