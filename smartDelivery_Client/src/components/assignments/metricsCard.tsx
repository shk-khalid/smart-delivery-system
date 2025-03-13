import { Clock, CheckCircle2, AlertCircle, Users } from 'lucide-react';

type MetricCardProps = {
  title: string;
  value: string | number;
  type: 'time' | 'success' | 'total' | 'partners';
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

const iconMap = {
  time: Clock,
  success: CheckCircle2,
  total: AlertCircle,
  partners: Users,
};

export function MetricCard({ title, value, type }: MetricCardProps) {
  const Icon = iconMap[type];

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${
              type === 'success'
                ? 'bg-primary-900 text-primary-300'
                : type === 'time'
                ? 'bg-blue-900 text-blue-300'
                : type === 'total'
                ? 'bg-purple-900 text-purple-300'
                : 'bg-orange-900 text-orange-300'
            }`}
          >
            <Icon size={20} />
          </div>
          <h3 className="text-dark-300 font-medium">{title}</h3>
        </div>
      </div>
      <p className="text-2xl font-semibold mt-4 text-white">{value}</p>
    </div>
  );
}
