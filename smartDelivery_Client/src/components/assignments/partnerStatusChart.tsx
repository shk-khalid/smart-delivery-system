import { PartnerStatus } from '../../types/assignment';
import { User, UserCheck, UserMinus } from 'lucide-react';

type PartnerStatusChartProps = {
  status: PartnerStatus;
};

export function PartnerStatusChart({ status }: PartnerStatusChartProps) {
  const total = status.available + status.busy + status.offline;

  return (
    <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-dark-700">
      <h3 className="text-lg font-semibold mb-4 text-white">Partner Status</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary-900/50 text-primary-300">
              <UserCheck size={20} />
            </div>
            <span className="ml-3 text-dark-300">Available</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-white">{status.available}</span>
            <span className="ml-2 text-sm text-dark-400">
              ({Math.round((status.available / total) * 100)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-orange-900/50 text-orange-300">
              <User size={20} />
            </div>
            <span className="ml-3 text-dark-300">Busy</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-white">{status.busy}</span>
            <span className="ml-2 text-sm text-dark-400">
              ({Math.round((status.busy / total) * 100)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-dark-700/50 text-dark-400">
              <UserMinus size={20} />
            </div>
            <span className="ml-3 text-dark-300">Offline</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-white">{status.offline}</span>
            <span className="ml-2 text-sm text-dark-400">
              ({Math.round((status.offline / total) * 100)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
