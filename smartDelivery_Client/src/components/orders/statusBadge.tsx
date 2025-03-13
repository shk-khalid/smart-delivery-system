import React from 'react';
import { Circle, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { OrderStatus } from '../../types/order';

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  colors: string;
}> = {
  pending: {
    icon: Clock,
    colors: 'bg-yellow-100 text-yellow-800',
  },
  assigned: {
    icon: Circle,
    colors: 'bg-blue-100 text-blue-800',
  },
  picked: {
    icon: Truck,
    colors: 'bg-purple-100 text-purple-800',
  },
  delivered: {
    icon: CheckCircle2,
    colors: 'bg-green-100 text-green-800',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.colors} flex items-center gap-1.5`}>
      <Icon className="w-4 h-4" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
