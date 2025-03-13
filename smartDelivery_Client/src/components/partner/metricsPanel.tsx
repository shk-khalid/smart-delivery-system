import { User, Star, MapPin } from 'lucide-react';

interface MetricsPanelProps {
  totalActive: number;
  avgRating: number;
  topAreas: string[];
}

function getIconColor(iconName: string) {
  // This time, let's map by iconName or cardTitle
  switch (iconName) {
    case 'User':
      return 'bg-orange-900 text-orange-300';
    case 'Star':
      return 'bg-purple-900 text-purple-300';
    case 'MapPin':
      return 'bg-green-900 text-green-300';
    default:
      return 'bg-primary-900 text-primary-300';
  }
}

export function MetricsPanel({ totalActive, avgRating, topAreas }: MetricsPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {/* Card 1 - Active Partners */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-700">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getIconColor('User')}`}>
            <User size={20} />
          </div>
          <h3 className="text-dark-300 font-medium">Active Partners</h3>
        </div>
        <p className="text-2xl font-semibold mt-4 text-white">{totalActive}</p>
      </div>

      {/* Card 2 - Average Rating */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-700">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getIconColor('Star')}`}>
            <Star size={20} />
          </div>
          <h3 className="text-dark-300 font-medium">Average Rating</h3>
        </div>
        <p className="text-2xl font-semibold mt-4 text-white">{avgRating.toFixed(1)} ⭐</p>
      </div>

      {/* Card 3 - Top Areas */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-700">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getIconColor('MapPin')}`}>
            <MapPin size={20} />
          </div>
          <h3 className="text-dark-300 font-medium">Top Areas</h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {topAreas.map((area) => (
            <span
              key={area}
              className="inline-flex items-center rounded-full bg-primary-500/20 px-2.5 py-0.5 text-xs font-medium text-primary-300"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
