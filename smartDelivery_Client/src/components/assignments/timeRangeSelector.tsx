import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { TimeFilter, DateRange } from '../../types/assignment';

type TimeRangeSelectorProps = {
  selectedRange: TimeFilter;
  customRange?: DateRange;
  onRangeChange: (range: TimeFilter) => void;
  onCustomRangeChange: (range: DateRange) => void;
};

export function TimeRangeSelector({
  selectedRange,
  customRange,
  onRangeChange,
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center bg-dark-800/50 rounded-lg shadow-sm border border-dark-700">
        <button
          onClick={() => onRangeChange('24h')}
          className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
            selectedRange === '24h'
              ? 'bg-primary-900/50 text-primary-300'
              : 'text-dark-300 hover:bg-dark-700/50'
          }`}
        >
          24h
        </button>
        <button
          onClick={() => onRangeChange('7d')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            selectedRange === '7d'
              ? 'bg-primary-900/50 text-primary-300'
              : 'text-dark-300 hover:bg-dark-700/50'
          }`}
        >
          7d
        </button>
        <button
          onClick={() => onRangeChange('30d')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            selectedRange === '30d'
              ? 'bg-primary-900/50 text-primary-300'
              : 'text-dark-300 hover:bg-dark-700/50'
          }`}
        >
          30d
        </button>
        <button
          onClick={() => onRangeChange('custom')}
          className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center transition-colors ${
            selectedRange === 'custom'
              ? 'bg-primary-900/50 text-primary-300'
              : 'text-dark-300 hover:bg-dark-700/50'
          }`}
        >
          <Calendar size={16} className="mr-2" />
          Custom
        </button>
      </div>

      {selectedRange === 'custom' && customRange && (
        <div className="text-sm text-dark-300">
          {format(customRange.start, 'MMM d, yyyy')} - {format(customRange.end, 'MMM d, yyyy')}
        </div>
      )}
    </div>
  );
}
