import { useState, useMemo, useEffect } from 'react';
import { Package, Clock, DollarSign } from 'lucide-react';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';
import { SummaryCard } from '../components/orders/summaryCard';
import { OrderFilters } from '../components/orders/orderFilters';
import { OrdersTable } from '../components/orders/ordersTable';
import { OrderChart } from '../components/orders/orderChart';
import { BulkActionsToolbar } from '../components/orders/bulkActionsToolbar';
import { AssignPartnerModal } from '../components/orders/assignPartnerModal';
import { DeleteConfirmationModal } from '../components/orders/deleteConfirmationModal';
import { LoadingPulse } from '../components/layout/pulseLoading';
import { Order, OrderStatus, OrderFiltersState } from '../types/order';
import { order as mockOrders, trendData as mockTrendData } from '../data/orderData';

// For future reference: API calls using orderService
// import { orderService } from '../services/orderService';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [trendData, setTrendData] = useState<
    { date: string; orders: number; revenue: number }[]
  >([]);
  const [filters, setFilters] = useState<OrderFiltersState>({
    search: '',
    statuses: [],
    area: '',
    dateRange: {
      start: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
      end: format(new Date(), 'yyyy-MM-dd'),
    },
    sortBy: 'date',
    sortOrder: 'desc',
  });
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [orderToAssign, setOrderToAssign] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // Simulated fetch for orders with a random delay (1-3 seconds)
  const fetchOrders = async () => {
    setLoading(true);
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      // API call commented out for future reference:
      // const data = await orderService.getOrders({ ... });
      setOrders(mockOrders);
      setLoading(false);
    }, delay);
  };

  // Simulated fetch for trend data
  const fetchTrendData = async () => {
    // API call commented out for future reference:
    // const data = await orderService.getTrendData(filters.dateRange.start, filters.dateRange.end);
    setTrendData(mockTrendData);
  };

  // Re-fetch data whenever filters change
  useEffect(() => {
    fetchOrders();
    fetchTrendData();
  }, [
    filters.statuses,
    filters.area,
    filters.dateRange.start,
    filters.dateRange.end,
  ]);

  // Filter and sort orders based on search and filters
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const matchesSearch =
          filters.search === '' ||
          order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
          order.customerName.toLowerCase().includes(filters.search.toLowerCase());
        return matchesSearch;
      })
      .sort((a, b) => {
        const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
        switch (filters.sortBy) {
          case 'date':
            return (
              multiplier *
              (new Date(a.scheduledTime).getTime() -
                new Date(b.scheduledTime).getTime())
            );
          case 'amount':
            return multiplier * (a.totalAmount - b.totalAmount);
          case 'status':
            return multiplier * a.status.localeCompare(b.status);
          default:
            return 0;
        }
      });
  }, [filters.search, filters.sortBy, filters.sortOrder, orders]);

  // Update single order status with a simulated update
  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      // Future API call:
      // const updatedOrderData = await orderService.updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  // Single order deletion
  const handleDelete = (orderId: string) => {
    const foundOrder = orders.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrderToDelete(foundOrder);
      setIsBulkDelete(false);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (isBulkDelete) {
        // Future API call:
        // const response = await orderService.bulkDeleteOrders(selectedOrders);
        toast.success('Simulated bulk delete: Orders deleted successfully');
        setSelectedOrders([]);
      } else if (orderToDelete) {
        // Future API call:
        // const response = await orderService.deleteOrder(orderToDelete.id);
        toast.success('Simulated delete: Order deleted successfully');
      }
      await fetchOrders();
      await fetchTrendData();
    } catch (error: any) {
      console.error('Error deleting orders:', error);
      const errorMsg = error.response?.data?.detail;
      if (errorMsg) {
        toast.error(errorMsg);
      } else {
        toast.error(isBulkDelete ? 'Failed to delete orders' : 'Failed to delete order');
      }
    } finally {
      setDeleteModalOpen(false);
      setOrderToDelete(null);
      setIsBulkDelete(false);
    }
  };

  // Open assign partner modal
  const handleAssign = (orderId: string) => {
    setOrderToAssign(orderId);
    setAssignModalOpen(true);
  };

  const handleAssignPartner = async () => {
    if (orderToAssign) {
      try {
        // Future API call:
        // await orderService.assignOrder(orderToAssign);
        toast.success('Simulated assign: Order assigned successfully');
        await fetchOrders();
        await fetchTrendData();
      } catch (error) {
        console.error('Error assigning order:', error);
        toast.error('Failed to assign order');
      }
      setAssignModalOpen(false);
      setOrderToAssign(null);
    }
  };

  // Bulk actions for status change and deletion
  const handleBulkStatusChange = async (status: OrderStatus) => {
    try {
      await Promise.all(selectedOrders.map((id) => handleStatusChange(id, status)));
      setSelectedOrders([]);
      await fetchTrendData();
    } catch (error) {
      console.error('Error updating bulk status:', error);
      toast.error('Failed to update some orders');
    }
  };

  const handleBulkDelete = () => {
    setIsBulkDelete(true);
    setDeleteModalOpen(true);
  };

  const handleBulkAssign = () => {
    if (selectedOrders.length > 0) {
      setOrderToAssign(selectedOrders[0]);
      setAssignModalOpen(true);
    }
  };

  // Table selections
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedOrders(selected ? filteredOrders.map((o) => o.id) : []);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
        <LoadingPulse />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900 overflow-x-hidden">
      <header className="bg-gradient-to-r from-primary-700 to-primary-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Orders Management</h1>
            <p className="mt-2 text-sm text-dark-300">
              Track and manage all orders in one place
            </p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Orders"
            value={orders.length.toString()}
            icon={Package}
          />
          <SummaryCard
            title="Pending Orders"
            value={orders.filter((o) => o.status === 'pending').length.toString()}
            icon={Clock}
          />
          <SummaryCard
            title="Total Revenue"
            value={`₹${orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}`}
            icon={DollarSign}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700">
            <h3 className="text-lg font-semibold mb-4 text-white">Orders Trend</h3>
            <OrderChart data={trendData} type="orders" />
          </div>
          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700">
            <h3 className="text-lg font-semibold mb-4 text-white">Revenue Trend</h3>
            <OrderChart data={trendData} type="revenue" />
          </div>
        </div>
        <OrderFilters filters={filters} onFiltersChange={setFilters} />
        {selectedOrders.length > 1 && (
          <BulkActionsToolbar
            selectedCount={selectedOrders.length}
            onStatusChange={handleBulkStatusChange}
            onDelete={handleBulkDelete}
            onAssign={handleBulkAssign}
          />
        )}
        <div>
          <OrdersTable
            orders={filteredOrders}
            selectedOrders={selectedOrders}
            onSelectOrder={handleSelectOrder}
            onSelectAll={handleSelectAll}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onAssign={handleAssign}
          />
        </div>
      </main>
      {assignModalOpen && (
        <AssignPartnerModal
          onClose={() => {
            setAssignModalOpen(false);
            setOrderToAssign(null);
          }}
          onAssign={handleAssignPartner}
        />
      )}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setOrderToDelete(null);
          setIsBulkDelete(false);
        }}
        order={orderToDelete}
        isBulkDelete={isBulkDelete}
        selectedCount={selectedOrders.length}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
