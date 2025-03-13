import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { OrderStatus, OrderFiltersState } from '../../types/order';

interface OrderFiltersProps {
  filters: OrderFiltersState;
  onFiltersChange: (filters: OrderFiltersState) => void;
}

export function OrderFilters({ filters, onFiltersChange }: OrderFiltersProps) {
  const handleStatusToggle = (status: OrderStatus) => {
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
              placeholder="Search orders or customers..."
              className="pl-10 pr-4 py-2 w-full rounded-md bg-dark-900 border border-dark-700 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={filters.area}
            onChange={(e) =>
              onFiltersChange({ ...filters, area: e.target.value })
            }
            placeholder="Filter by area"
            className="w-full px-4 py-2 rounded-md bg-dark-900 border border-dark-700 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                dateRange: { ...filters.dateRange, start: e.target.value },
              })
            }
            className="px-4 py-2 rounded-md bg-dark-900 border border-dark-700 text-white focus:border-primary-500 focus:ring-primary-500"
          />
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                dateRange: { ...filters.dateRange, end: e.target.value },
              })
            }
            className="px-4 py-2 rounded-md bg-dark-900 border border-dark-700 text-white focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-400" />
          <span className="text-sm font-medium text-primary-200">Status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['pending', 'assigned', 'picked', 'delivered'] as OrderStatus[]).map(
            (status) => (
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
            )
          )}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                sortBy: e.target.value as 'date' | 'amount' | 'status',
              })
            }
            className="px-3 py-1.5 rounded-md bg-dark-900 border border-dark-700 text-white focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="status">Sort by Status</option>
          </select>
          <button
            onClick={toggleSortOrder}
            className="p-1.5 rounded-md hover:bg-dark-800 text-primary-400"
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
