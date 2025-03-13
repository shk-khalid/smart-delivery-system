import { DivideIcon as LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
}

function getIconColor(Icon: typeof LucideIcon) {
  // You can map specific icons to color classes:
  switch (Icon.displayName) {
    case 'Package':
      return 'bg-blue-900 text-blue-300';
    case 'DollarSign':
      return 'bg-purple-900 text-purple-300';
    case 'Clock':
      return 'bg-orange-900 text-orange-300';
    default:
      // fallback color
      return 'bg-primary-900 text-primary-300';
  }
}

export function SummaryCard({ title, value, icon: Icon }: SummaryCardProps) {
  const colorClasses = getIconColor(Icon);

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colorClasses}`}>
            <Icon size={20} />
          </div>
          <h3 className="text-dark-300 font-medium">{title}</h3>
        </div>
      </div>
      <p className="text-2xl font-semibold mt-4 text-white">{value}</p>
    </div>
  );
}
