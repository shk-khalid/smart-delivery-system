import { useState, useMemo, useEffect } from 'react';
import { Package, Clock, DollarSign } from 'lucide-react';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';

import { orderService } from '../services/orderService';
import { SummaryCard } from '../components/orders/summaryCard';
import { OrderFilters } from '../components/orders/orderFilters';
import { OrdersTable } from '../components/orders/ordersTable';
import { OrderChart } from '../components/orders/orderChart';
import { BulkActionsToolbar } from '../components/orders/bulkActionsToolbar';
import { Order, OrderStatus, OrderFiltersState } from '../types/order';
import { AssignPartnerModal } from '../components/orders/assignPartnerModal';
import { DeleteConfirmationModal } from '../components/orders/deleteConfirmationModal';
import { LoadingPulse } from '../components/layout/pulseLoading';

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

  // ===== Fetch Orders =====
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders({
        status: filters.statuses,
        area: filters.area,
        date: filters.dateRange.start,
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  // ===== Fetch Trend Data =====
  const fetchTrendData = async () => {
    try {
      const data = await orderService.getTrendData(
        filters.dateRange.start,
        filters.dateRange.end
      );
      setTrendData(data);
    } catch (error) {
      console.error('Error fetching trend data:', error);
      toast.error('Failed to fetch trend data');
    }
  };

  // Re-fetch whenever relevant filters change
  useEffect(() => {
    fetchOrders();
    fetchTrendData();
  }, [
    filters.statuses,
    filters.area,
    filters.dateRange.start,
    filters.dateRange.end,
  ]);

  // ===== Filtered & Sorted Orders =====
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

  // ===== Update Single Order Status =====
  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      const updatedOrderData = await orderService.updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === orderId ? { ...o, ...updatedOrderData } : o))
      );
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  // ===== Single Delete =====
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
        const response = await orderService.bulkDeleteOrders(selectedOrders);
        toast.success(response.detail || 'Orders deleted successfully');
        setSelectedOrders([]);
      } else if (orderToDelete) {
        const response = await orderService.deleteOrder(orderToDelete.id);
        toast.success(response.detail || 'Order deleted successfully');
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

  // ===== Assign Partner =====
  const handleAssign = (orderId: string) => {
    setOrderToAssign(orderId);
    setAssignModalOpen(true);
  };

  const handleAssignPartner = async () => {
    if (orderToAssign) {
      try {
        await orderService.assignOrder(orderToAssign);
        await fetchOrders();
        await fetchTrendData();
        toast.success('Order assigned successfully');
      } catch (error) {
        console.error('Error assigning order:', error);
        toast.error('Failed to assign order');
      }
      setAssignModalOpen(false);
      setOrderToAssign(null);
    }
  };

  // ===== Bulk Actions =====
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

  // ===== Table Selections =====
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
      {/* HEADER */}
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

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* SUMMARY CARDS */}
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
            value={`$${orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}`}
            icon={DollarSign}
          />
        </div>

        {/* TRENDS */}
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

        {/* FILTERS */}
        <OrderFilters filters={filters} onFiltersChange={setFilters} />

        {/* BULK ACTIONS */}
        {selectedOrders.length > 1 && (
          <BulkActionsToolbar
            selectedCount={selectedOrders.length}
            onStatusChange={handleBulkStatusChange}
            onDelete={handleBulkDelete}
            onAssign={handleBulkAssign}
          />
        )}

        {/* ORDERS TABLE */}
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

      {/* MODALS */}
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
