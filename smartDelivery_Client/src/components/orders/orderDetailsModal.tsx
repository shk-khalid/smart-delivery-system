import { useEffect } from 'react';
import { X, Package, MapPin, Phone, Calendar, Clock } from 'lucide-react';
import { Order } from '../../types/order';
import { parseISO, format, isValid } from 'date-fns';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {

  function formatDateTime(isoString?: string): string {
    if (!isoString) {
      return 'No scheduled time';
    }
    const dateObj = parseISO(isoString);
    if (!isValid(dateObj)) {
      return isoString; // Fallback to raw string if invalid
    }
    return format(dateObj, 'PPp'); // e.g. "May 1, 2024, 12:30 PM"
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }




  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl shadow-lg border border-dark-700">
        {/* Header */}
        <div className="sticky top-0 bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Order Details</h2>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-dark-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Order Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-dark-400" />
              <div>
                <p className="text-sm text-dark-300">Order Number</p>
                <p className="font-medium text-white">{order.orderNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-dark-400" />
              <div>
                <p className="text-sm text-dark-300">Delivery Area</p>
                <p className="font-medium text-white">{order.deliveryArea}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-dark-400" />
              <div>
                <p className="text-sm text-dark-300">Customer Phone</p>
                <p className="font-medium text-white">{order.customerPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-dark-400" />
              <div>
                <p className="text-sm text-dark-300">Scheduled Time</p>
                <p className="font-medium text-white">
                  {formatDateTime(order.scheduledTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Order Items</h3>
            <div className="bg-dark-800 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-dark-700">
                <thead className="bg-dark-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase">
                      Item
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-dark-900 divide-y divide-dark-700">
                  {order.items.map((item, index) => (
                    <tr key={item.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-dark-800">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-sm font-medium text-white text-right">
                      Total Amount
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-right">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Order Timeline */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Order Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Order Created</p>
                  <p className="text-sm text-dark-300">
                    {format(new Date(order.createdAt), 'PPp')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-900 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-yellow-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Last Updated</p>
                  <p className="text-sm text-dark-300">
                    {format(new Date(order.lastUpdated), 'PPp')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-dark-800 px-6 py-4 border-t border-dark-700">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-dark-300 bg-dark-700 border border-dark-700 rounded-md shadow-sm hover:bg-dark-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
