import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

interface PartnerFiltersState {
  search: string;
  area: string;
  statuses: ('active' | 'inactive')[];
  sortBy: 'name' | 'rating' | 'completedOrders';
  sortOrder: 'asc' | 'desc';
}

interface PartnerFiltersProps {
  filters: PartnerFiltersState;
  onFiltersChange: (filters: PartnerFiltersState) => void;
  areas: string[];
}

export function PartnerFilters({ filters, onFiltersChange, areas }: PartnerFiltersProps) {
  const handleStatusToggle = (status: 'active' | 'inactive') => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const toggleSortOrder = () => {
    onFiltersChange({
      ...filters,
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 rounded-lg shadow-lg mb-6 space-y-4 border border-dark-700">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              placeholder="Search partners by name, email, or phone..."
              className="pl-10 pr-4 py-2 w-full rounded-md bg-dark-900 border border-dark-700 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <select
            value={filters.area}
            onChange={(e) =>
              onFiltersChange({ ...filters, area: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md bg-dark-900 border border-dark-700 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-400" />
          <span className="text-sm font-medium text-primary-200">Status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['active', 'inactive'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusToggle(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.statuses.includes(status)
                  ? 'bg-primary-900/50 text-primary-200 border border-primary-500/50'
                  : 'bg-dark-800 text-dark-400 border border-dark-700 hover:border-dark-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                sortBy: e.target.value as 'name' | 'rating' | 'completedOrders',
              })
            }
            className="px-3 py-1.5 rounded-md bg-dark-900 border border-dark-700 text-white focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
            <option value="completedOrders">Sort by Orders</option>
          </select>
          <button
            onClick={toggleSortOrder}
            className="p-1.5 rounded-md hover:bg-dark-800 text-primary-400"
            title={filters.sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          >
            {filters.sortOrder === 'asc' ? (
              <SortAsc className="w-5 h-5" />
            ) : (
              <SortDesc className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}