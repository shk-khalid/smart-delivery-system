import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Package, Users, CheckCircle, DollarSign } from 'lucide-react';
import { MetricCard } from '../components/dashboard/metricsCard';
import { ActiveOrdersMap } from '../components/dashboard/activeOrdersMap';
import { PartnerStatus } from '../components/dashboard/partnerStatus';
import { RecentAssignments } from '../components/dashboard/recentAssignment';
import { Order } from '../types/order';
import { DeliveryPartner } from '../types/partner';
import { Assignment } from '../types/assignment';
import L from 'leaflet';
import { LoadingPulse } from '../components/layout/pulseLoading';
import { assignments as mockAssignments } from '../data/assignmentData';
import { order as mockOrders } from '../data/orderData';
import { partners as mockPartners } from '../data/partnerData';

// For future reference: API calls using services
// import { orderService } from '../services/orderService';
// import { partnerService } from '../services/partnerService';
// import assignmentService from '../services/assignmentService';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const DashboardPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [partners, setPartners] = useState<DeliveryPartner[] | null>(null);
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);
  const [metrics, setMetrics] = useState({
    activeOrders: 0,
    totalPartners: 0,
    successRate: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch data on mount and poll every 30s with a simulated delay
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate random delay between 1 to 3 seconds
        const delay = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(() => {
          // Orders
          /* const ordersData = await orderService.getOrders();
          setOrders(ordersData); */
          const ordersData: Order[] = mockOrders;
          setOrders(ordersData);

          // Partners
          /* const partnersRes = await partnerService.getPartners();
          setPartners(partnersRes.data); */
          const partnersRes = { data: mockPartners };
          setPartners(partnersRes.data);

          // Assignments
          /* const assignmentsRes = await assignmentService.getAssignments();
          setAssignments(assignmentsRes.data); */
          const assignmentsRes = { data: mockAssignments };
          setAssignments(assignmentsRes.data);

          // Calculate metrics
          const activeOrdersCount = ordersData.filter((o) =>
            ['pending', 'assigned', 'picked'].includes(o.status)
          ).length;

          const totalRevenue = ordersData.reduce(
            (sum, order) => sum + (order.totalAmount || 0),
            0
          );

          const successCount = assignmentsRes.data.filter(
            (a: Assignment) => a.status === 'success'
          ).length;
          const totalCount = assignmentsRes.data.length || 1;

          setMetrics({
            activeOrders: activeOrdersCount,
            totalPartners: partnersRes.data.length,
            successRate: (successCount / totalCount) * 100,
            revenue: totalRevenue,
          });

          setLoading(false);
        }, delay);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-dark-800 to-dark-900">
        <LoadingPulse />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900 overflow-x-hidden">
      <header className="bg-gradient-to-r from-primary-700 to-primary-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">Delivery Dashboard</h1>
          <p className="mt-2 text-sm text-dark-300">
            Real-time overview of your delivery operations
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Orders"
            value={metrics.activeOrders}
            icon={Package}
          />
          <MetricCard
            title="Total Partners"
            value={metrics.totalPartners}
            icon={Users}
          />
          <MetricCard
            title="Success Rate"
            value={`${metrics.successRate.toFixed(1)}%`}
            icon={CheckCircle}
          />
          <MetricCard
            title="Revenue"
            value={`₹${metrics.revenue.toLocaleString()}`}
            icon={DollarSign}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700">
            <ActiveOrdersMap orders={orders || []} />
          </div>

          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Partner Status</h2>
            <PartnerStatus partners={partners || []} />
          </div>
        </div>

        <RecentAssignments assignments={assignments || []} />
      </main>
    </div>
  );
};

export default DashboardPage;
