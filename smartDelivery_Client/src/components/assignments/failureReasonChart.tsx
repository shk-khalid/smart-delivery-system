import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AlertOctagon } from 'lucide-react';

type FailureReason = {
  reason: string;
  count: number;
};

type FailureReasonsChartProps = {
  reasons: FailureReason[];
};

const COLORS = [
  '#2DD4BF', // teal
  '#60A5FA', // blue
  '#F472B6', // pink
  '#34D399', // green
  '#A78BFA', // purple
  '#FBBF24', // yellow
  '#FB923C', // orange
  '#F87171', // red
];

export function FailureReasonsChart({ reasons }: FailureReasonsChartProps) {
  const total = reasons.reduce((sum, reason) => sum + reason.count, 0);

  return (
    <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700 w-full">
      <div className="flex items-center mb-4">
        <AlertOctagon className="text-red-400 mr-2" size={20} />
        <h3 className="text-lg font-semibold text-white">Failure Reasons</h3>
      </div>

      {reasons.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-dark-400">
          No failure data available
        </div>
      ) : (
        <>
          {/* Responsive chart container */}
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reasons}
                  dataKey="count"
                  nameKey="reason"
                  cx="50%"
                  cy="45%"
                  outerRadius={70}
                  innerRadius={35}
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

                    // Only show label if slice is > 5%
                    return percent > 0.05 ? (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    ) : null;
                  }}
                >
                  {reasons.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB',
                  }}
                  formatter={(value: number) => [
                    `${value} orders (${((value / total) * 100).toFixed(1)}%)`,
                    'Count',
                  ]}
                />

                {/* Legend */}
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ marginTop: 10 }}
                  formatter={(value: string) => (
                    <span className="text-sm text-dark-300">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-sm text-dark-400 text-center">
            Total Failed Orders: {total}
          </div>
        </>
      )}
    </div>
  );
}
