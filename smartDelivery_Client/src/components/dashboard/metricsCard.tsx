import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  trend?: number;
}

function getIconColor(Icon: typeof LucideIcon) {
  switch (Icon.displayName) {
    case 'Package':
      return 'bg-blue-900 text-blue-300';
    case 'Users':
      return 'bg-yellow-900 text-yellow-300';
    case 'CheckCircle':
      return 'bg-primary-900 text-primary-300';
    case 'DollarSign':
      return 'bg-orange-900 text-orange-300';
    default:
      return 'bg-primary-900 text-primary-300';
  }
}

export function MetricCard({ title, value, icon: Icon }: MetricCardProps) {
  const colorClasses = getIconColor(Icon);

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-700">
      {/* Top Row: Icon + Title (left), optional Trend (right) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colorClasses}`}>
            <Icon size={20} />
          </div>
          <h3 className="text-dark-300 font-medium">{title}</h3>
        </div>
      </div>

      {/* Value */}
      <p className="text-2xl font-semibold mt-4 text-white">{value}</p>
    </div>
  );
}
