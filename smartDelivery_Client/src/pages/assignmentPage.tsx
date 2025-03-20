import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { MetricCard } from '../components/assignments/metricsCard';
import { AssignmentTable } from '../components/assignments/assignmentTable';
import { PartnerStatusChart } from '../components/assignments/partnerStatusChart';
import { TimeRangeSelector } from '../components/assignments/timeRangeSelector';
import { MetricsChart } from '../components/assignments/metricsChart';
import { FailureReasonsChart } from '../components/assignments/failureReasonChart';
import { DateRange, TimeFilter } from '../types/assignment';
import { AlertTriangle, Menu, RefreshCw } from 'lucide-react';
import { LoadingPulse } from '../components/layout/pulseLoading';
import { partners as mockPartners } from '../data/partnerData';
import { assignments as mockAssignments, assignmentMetrics as mockMetrics } from '../data/assignmentData';

// For future reference: API calls using react-query and API services
// import { useQuery, useMutation } from 'react-query';
// import { assignmentService } from '../services/assignmentService';
// import { partnerService, ApiResponse } from '../services/partnerService';

export function AssignmentPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('24h');
  const [customRange, setCustomRange] = useState<DateRange>({
    start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    end: new Date(),
  });
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States for mock data and loading simulation
  const [metrics, setMetrics] = useState<any>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [mutationLoading, setMutationLoading] = useState(false);

  // Simulate API loading with a random delay between 1-3 seconds
  useEffect(() => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    const timer = setTimeout(() => {
      setMetrics(mockMetrics);
      setAssignments(mockAssignments);
      setPartners(mockPartners);
      setDataLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  // Simulated run assignment mutation with random delay (0.5-1.5 seconds)
  const handleRunAssignment = () => {
    setMutationLoading(true);
    const delay = Math.floor(Math.random() * 1000) + 500;
    setTimeout(() => {
      setMutationLoading(false);
      toast.success('Simulated run assignment algorithm');
    }, delay);
  };

  // Compute partner status from mock partners data
  const partnerStatus = partners.reduce(
    (acc, partner) => {
      if (partner.status === 'active') {
        if (partner.currentLoad >= 3) acc.busy++;
        else acc.available++;
      } else if (partner.status === 'inactive') {
        acc.offline++;
      }
      return acc;
    },
    { available: 0, busy: 0, offline: 0 }
  );

  // Show alert if successRate < 80%
  const showAlert = metrics && metrics.successRate < 80;

  // Fetch metrics
  /*
  const {
    data: metrics,
    isLoading: metricsLoading,
  } = useQuery('metrics', assignmentService.getAssignmentMetrics, {
    refetchInterval: autoRefresh ? 30000 : false,
    onError: () => {
      toast.error('Failed to load assignment metrics');
    },
  });
  */

  // Fetch assignments
  /*
  const {
    data: assignmentsResponse,
    isLoading: assignmentsLoading,
  } = useQuery('assignments', assignmentService.getAssignments, {
    refetchInterval: autoRefresh ? 30000 : false,
    onError: () => {
      toast.error('Failed to load assignments');
    },
  });
  */

  // Fetch delivery partners
  /*
  const {
    data: partnersResponse,
    isLoading: partnersLoading,
  } = useQuery<ApiResponse<DeliveryPartner[]>>(
    'partners',
    partnerService.getPartners,
    {
      refetchInterval: autoRefresh ? 30000 : false,
      onError: () => {
        toast.error('Failed to load partners');
      },
    }
  );
  */

  // Run assignment algorithm
  /*
  const runAssignmentMutation = useMutation(assignmentService.runAssignmentAlgorithm, {
    onSuccess: () => {
      queryClient.invalidateQueries(['metrics']);
      toast.success('Assignment algorithm executed successfully!');
    },
    onError: () => {
      toast.error('Failed to run assignment algorithm');
    },
  });
  */

  if (dataLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-dark-800 to-dark-900">
        <LoadingPulse />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900">
      <header className="bg-gradient-to-r from-primary-700 to-primary-800 shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-white">Assignment Monitoring</h1>
              <p className="mt-1 text-sm text-primary-100">
                Track and optimize your order assignment workflow in real time
              </p>
            </div>
            <button
              className="md:hidden absolute top-6 right-4 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <div
              className={`${mobileMenuOpen ? 'block' : 'hidden'
                } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4`}
            >
              <TimeRangeSelector
                selectedRange={timeFilter}
                customRange={customRange}
                onRangeChange={setTimeFilter}
                onCustomRangeChange={setCustomRange}
              />
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-primary-300 text-primary-500 shadow-sm focus:ring-primary-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm">Auto-refresh</span>
              </label>
              <button
                onClick={handleRunAssignment}
                disabled={mutationLoading}
                className="px-4 py-2 inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutationLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  'Run Assignment'
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {showAlert && (
          <div className="mb-6 bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-200">
                  Assignment success rate has dropped below 80%. Please review partner availability and system performance.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Assigned" value={metrics.totalAssigned ?? 0} type="total" />
          <MetricCard title="Success Rate" value={`${Math.round(metrics.successRate ?? 0)}%`} type="success" />
          <MetricCard title="Avg. Assignment Time" value={`${(metrics.averageTime ?? 0).toFixed(1)} sec`} type="time" />
          <MetricCard title="Active Partners" value={partnerStatus.available} type="partners" />
        </div>
        <div className="mb-8">
          <MetricsChart data={metrics.historicalData ?? []} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700">
            <h3 className="text-lg font-semibold mb-4 text-white">Partner Status</h3>
            <PartnerStatusChart status={partnerStatus} />
          </div>
          <FailureReasonsChart reasons={metrics.failureReasons ?? []} />
        </div>
        <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Active Assignments</h2>
            <div className="text-sm text-dark-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          {assignments.length === 0 ? (
            <div className="flex justify-center items-center py-4">
              <LoadingPulse />
            </div>
          ) : (
            <AssignmentTable assignments={assignments} />
          )}
        </div>
      </main>
    </div>
  );
}
