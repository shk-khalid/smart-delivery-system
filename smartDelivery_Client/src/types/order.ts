export type OrderStatus = 'pending' | 'assigned' | 'picked' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryArea: string;
  status: OrderStatus;
  totalAmount: number;
  scheduledTime: string;
  assignedTo?: string;
  items: OrderItem[];
  createdAt: string;
  lastUpdated: string;
  position: [number, number];
}


export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderSummary {
  total: number;
  pending: number;
  assigned: number;
  picked: number;
  delivered: number;
  totalRevenue: number;
  weeklyTrend: {
    date: string;
    orders: number;
    revenue: number;
  }[];
}

export interface OrderFiltersState {
  search: string;
  statuses: OrderStatus[];
  area: string;
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: 'date' | 'amount' | 'status';
  sortOrder: 'asc' | 'desc';
}

export interface OrderAction {
  id: string;
  label: string;
  icon: React.ComponentType;
  action: (order: Order) => void;
}