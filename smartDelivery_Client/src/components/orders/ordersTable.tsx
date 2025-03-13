import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { usePopper } from 'react-popper';
import {
  Eye,
  MoreVertical,
  CheckCircle2,
  Truck,
  Trash2,
  UserPlus,
} from 'lucide-react';
import { parseISO, format, isValid } from 'date-fns';
import { Order, OrderStatus } from '../../types/order';
import { StatusBadge } from './statusBadge';
import { OrderDetailsModal } from './orderDetailsModal';

interface OrdersTableProps {
  orders: Order[];
  selectedOrders: string[];
  onSelectOrder: (orderId: string) => void;
  onSelectAll: (selected: boolean) => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onDelete: (orderId: string) => void;
  onAssign: (orderId: string) => void;
}

export function OrdersTable({
  orders,
  selectedOrders,
  onSelectOrder,
  onSelectAll,
  onStatusChange,
  onDelete,
  onAssign,
}: OrdersTableProps) {
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Popper references
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'flip', enabled: true }],
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // <-- items per page
  const offset = currentPage * itemsPerPage;

  // Slice data for the current page
  const currentItems = orders.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  function handlePageChange(selectedItem: { selected: number }) {
    setCurrentPage(selectedItem.selected);
  }

  // Update itemsPerPage and reset currentPage
  function handleItemsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0); // reset to first page when items per page changes
  }

  function formatScheduledTime(isoString?: string): string {
    if (!isoString) return 'No scheduled time';
    const dateObj = parseISO(isoString);
    if (!isValid(dateObj)) return isoString;
    return format(dateObj, 'PPp'); // e.g. "May 1, 2024, 12:30 PM"
  }

  function handleActionClick(orderId: string, buttonRef: HTMLButtonElement) {
    if (activeDropdown === orderId) {
      setActiveDropdown(null);
      setReferenceElement(null);
    } else {
      setActiveDropdown(orderId);
      setReferenceElement(buttonRef);
    }
  }

  return (
    <>
      <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl shadow-lg border border-dark-700">
        {/* Table Header: Items Per Page Selector */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700">
          <div className="flex items-center space-x-2 text-dark-300 text-sm">
            <span>Show</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className=" appearance-none bg-dark-900/50 border border-dark-700 text-white rounded px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:bg-dark-700/50">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span>entries</span>
          </div>
        </div>


        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="bg-dark-800/50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="rounded border-dark-700 text-primary-500 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Order Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Scheduled Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {currentItems.map((order) => (
                <tr
                  key={order.id}
                  className={`hover:bg-dark-800/50 cursor-pointer transition-colors ${selectedOrders.includes(order.id) ? 'bg-primary-900/20' : ''
                    }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => onSelectOrder(order.id)}
                      className="rounded border-dark-700 text-primary-500 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-200">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-dark-200">
                      {order.customerName}
                    </div>
                    <div className="text-sm text-dark-400">{order.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-400">
                    {order.deliveryArea}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-400">
                    ${(order.totalAmount ?? 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-400">
                    {formatScheduledTime(order.scheduledTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingOrder(order)}
                        className="text-dark-400 hover:text-dark-200"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => handleActionClick(order.id, e.currentTarget)}
                          className="text-dark-400 hover:text-dark-200"
                          title="More Actions"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {activeDropdown === order.id && (
                          <div
                            ref={setPopperElement}
                            style={styles.popper}
                            {...attributes.popper}
                            className="bg-dark-800 backdrop-blur-sm border border-dark-700 z-10 rounded-md shadow-lg w-48"
                          >
                            <div className="py-1">
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => {
                                    onStatusChange(order.id, 'picked');
                                    setActiveDropdown(null);
                                    setReferenceElement(null);
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-dark-200 hover:bg-dark-700/50 w-full text-left"
                                >
                                  <Truck className="w-4 h-4 mr-2" />
                                  Mark as Picked
                                </button>
                              )}

                              {order.status === 'picked' && (
                                <button
                                  onClick={() => {
                                    onStatusChange(order.id, 'delivered');
                                    setActiveDropdown(null);
                                    setReferenceElement(null);
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-dark-200 hover:bg-dark-700/50 w-full text-left"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Mark as Delivered
                                </button>
                              )}

                              {order.status !== 'delivered' && (
                                <button
                                  onClick={() => {
                                    onAssign(order.id);
                                    setActiveDropdown(null);
                                    setReferenceElement(null);
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-dark-200 hover:bg-dark-700/50 w-full text-left"
                                >
                                  <UserPlus className="w-4 h-4 mr-2" />
                                  Assign Partner
                                </button>
                              )}

                              {order.status === 'pending' && (
                                <button
                                  onClick={() => {
                                    onDelete(order.id);
                                    setActiveDropdown(null);
                                    setReferenceElement(null);
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-dark-700/50 w-full text-left"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Order
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2"
          pageLinkClassName="px-3 py-1 border border-dark-700 text-dark-300 rounded hover:bg-dark-700/50"
          previousLinkClassName="px-3 py-1 border border-dark-700 text-dark-300 rounded hover:bg-dark-700/50"
          nextLinkClassName="px-3 py-1 border border-dark-700 text-dark-300 rounded hover:bg-dark-700/50"
          disabledClassName="opacity-50 cursor-not-allowed"
          activeLinkClassName="bg-primary-500 text-white"
        />
      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <OrderDetailsModal order={viewingOrder} onClose={() => setViewingOrder(null)} />
      )}
    </>
  );
}
