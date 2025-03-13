import { Truck, CheckCircle2, Trash2, UserPlus } from 'lucide-react';
import { OrderStatus } from '../../types/order';

interface BulkActionsToolbarProps {
  selectedCount: number;
  onStatusChange: (status: OrderStatus) => void;
  onDelete: () => void;
  onAssign: () => void;
}

export function BulkActionsToolbar({
  selectedCount,
  onStatusChange,
  onDelete,
  onAssign,
}: BulkActionsToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 rounded-lg shadow-lg mb-4 border border-dark-700">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white">
          <span className="font-medium">{selectedCount}</span> orders selected
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onStatusChange('picked')}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <Truck className="w-4 h-4 mr-1.5" />
            Mark as Picked
          </button>
          <button
            onClick={() => onStatusChange('delivered')}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Mark as Delivered
          </button>
          <button
            onClick={onAssign}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            Assign Partner
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-red-400 bg-dark-800 hover:bg-dark-700 border border-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
