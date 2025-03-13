import { Order } from './types/order';
import { DeliveryPartner } from './types/partner';
import { Assignment } from './types/assignment';

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    customerName: 'Emma Thompson',
    customerPhone: '+1 (555) 123-4567',
    deliveryArea: 'Colaba',
    status: 'pending',
    totalAmount: 189.99,
    scheduledTime: '2025-03-02T10:30:00',
    createdAt: '2025-03-02T09:30:00',
    lastUpdated: '2025-03-02T09:30:00',
    items: [
      { id: '1', name: 'Premium Coffee Maker', quantity: 1, price: 159.99 },
      { id: '2', name: 'Coffee Beans (1lb)', quantity: 2, price: 15.0 },
    ],
    position: [18.9100, 72.8150],
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-002',
    customerName: 'Michael Chen',
    customerPhone: '+1 (555) 234-5678',
    deliveryArea: 'Bandra West',
    status: 'assigned',
    totalAmount: 299.5,
    scheduledTime: '2025-02-15T11:45:00',
    createdAt: '2025-02-15T08:15:00',
    lastUpdated: '2025-02-15T09:00:00',
    items: [
      { id: '3', name: 'Smart Home Hub', quantity: 1, price: 249.5 },
      { id: '4', name: 'Smart Bulb Pack', quantity: 2, price: 25.0 },
    ],
    position: [19.0550, 72.8235],
  },
  {
    id: '3',
    orderNumber: 'ORD-2025-003',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 (555) 345-6789',
    deliveryArea: 'Andheri East',
    status: 'picked',
    totalAmount: 456.75,
    scheduledTime: '2025-02-22T13:15:00',
    createdAt: '2025-02-22T07:45:00',
    lastUpdated: '2025-02-22T10:30:00',
    items: [
      { id: '5', name: 'Designer Handbag', quantity: 1, price: 399.99 },
      { id: '6', name: 'Fashion Accessories Set', quantity: 1, price: 56.76 },
    ],
    position: [19.1195, 72.8871],
  },
  {
    id: '4',
    orderNumber: 'ORD-2025-004',
    customerName: 'David Wilson',
    customerPhone: '+1 (555) 456-7890',
    deliveryArea: 'Nariman Point',
    status: 'delivered',
    totalAmount: 1299.99,
    scheduledTime: '2025-02-28T09:00:00',
    createdAt: '2025-02-28T06:30:00',
    lastUpdated: '2025-02-28T08:45:00',
    items: [
      { id: '7', name: '4K OLED TV', quantity: 1, price: 1199.99 },
      { id: '8', name: 'HDMI Cable Pack', quantity: 2, price: 50.0 },
    ],
    position: [18.9376, 72.8328],
  },
  {
    id: '5',
    orderNumber: 'ORD-2025-005',
    customerName: 'Lisa Rodriguez',
    customerPhone: '+1 (555) 567-8901',
    deliveryArea: 'Malabar Hill',
    status: 'pending',
    totalAmount: 89.97,
    scheduledTime: '2025-03-05T14:30:00',
    createdAt: '2025-03-05T11:00:00',
    lastUpdated: '2025-03-05T11:00:00',
    items: [
      { id: '9', name: 'Yoga Mat Premium', quantity: 1, price: 49.99 },
      { id: '10', name: 'Resistance Bands Set', quantity: 1, price: 39.98 },
    ],
    position: [18.9402, 72.8235],
  },
  {
    id: '6',
    orderNumber: 'ORD-2025-006',
    customerName: 'James Parker',
    customerPhone: '+1 (555) 678-9012',
    deliveryArea: 'Breach Candy',
    status: 'assigned',
    totalAmount: 799.97,
    scheduledTime: '2025-02-20T15:45:00',
    createdAt: '2025-02-20T12:30:00',
    lastUpdated: '2025-02-20T13:15:00',
    items: [
      { id: '11', name: 'Gaming Console Pro', quantity: 1, price: 499.99 },
      { id: '12', name: 'Wireless Controller', quantity: 2, price: 149.99 },
    ],
    position: [18.9800, 72.8236],
  },
  {
    id: '7',
    orderNumber: 'ORD-2025-007',
    customerName: 'Emily White',
    customerPhone: '+1 (555) 789-0123',
    deliveryArea: 'Juhu',
    status: 'picked',
    totalAmount: 567.98,
    scheduledTime: '2025-03-03T16:30:00',
    createdAt: '2025-03-03T13:45:00',
    lastUpdated: '2025-03-03T14:30:00',
    items: [
      { id: '13', name: 'Professional Camera', quantity: 1, price: 499.99 },
      { id: '14', name: 'Camera Lens', quantity: 1, price: 67.99 },
    ],
    position: [19.0986, 72.8267],
  },
  {
    id: '8',
    orderNumber: 'ORD-2025-008',
    customerName: 'Robert Kim',
    customerPhone: '+1 (555) 890-1234',
    deliveryArea: 'Worli',
    status: 'delivered',
    totalAmount: 1567.97,
    scheduledTime: '2025-02-18T11:00:00',
    createdAt: '2025-02-18T08:30:00',
    lastUpdated: '2025-02-18T10:45:00',
    items: [
      { id: '15', name: 'MacBook Pro', quantity: 1, price: 1499.99 },
      { id: '16', name: 'Wireless Mouse', quantity: 1, price: 67.98 },
    ],
    position: [19.0238, 72.8490],
  },
  {
    id: '9',
    orderNumber: 'ORD-2025-009',
    customerName: 'Sophie Martinez',
    customerPhone: '+1 (555) 901-2345',
    deliveryArea: 'Goregaon',
    status: 'pending',
    totalAmount: 234.97,
    scheduledTime: '2025-03-07T17:15:00',
    createdAt: '2025-03-07T14:45:00',
    lastUpdated: '2025-03-07T14:45:00',
    items: [
      { id: '17', name: 'Bluetooth Speaker', quantity: 1, price: 179.99 },
      { id: '18', name: 'Charging Cable Set', quantity: 2, price: 27.49 },
    ],
    position: [19.1666, 72.8360],
  },
  {
    id: '10',
    orderNumber: 'ORD-2025-010',
    customerName: 'Daniel Brown',
    customerPhone: '+1 (555) 012-3456',
    deliveryArea: 'Powai',
    status: 'assigned',
    totalAmount: 899.97,
    scheduledTime: '2025-03-08T18:00:00',
    createdAt: '2025-03-08T15:30:00',
    lastUpdated: '2025-03-08T16:15:00',
    items: [
      { id: '19', name: 'Electric Guitar', quantity: 1, price: 799.99 },
      { id: '20', name: 'Guitar Strings Pack', quantity: 2, price: 49.99 },
    ],
    position: [19.1195, 72.9141],
  },
];

export const mockTrendData = [
  { date: '2025-02-28', orders: 45, revenue: 6789.50 },
  { date: '2025-03-01', orders: 52, revenue: 7890.25 },
  { date: '2025-03-02', orders: 38, revenue: 5678.75 },
  { date: '2025-03-03', orders: 61, revenue: 9123.00 },
  { date: '2025-03-04', orders: 47, revenue: 7234.50 },
  { date: '2025-03-05', orders: 55, revenue: 8456.25 },
  { date: '2025-03-06', orders: 43, revenue: 6543.75 },
  { date: '2025-03-07', orders: 49, revenue: 7123.50 },
  { date: '2025-03-08', orders: 58, revenue: 8567.25 },
];

export const initialPartners: DeliveryPartner[] = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    status: 'active',
    currentLoad: 2,
    areas: ['Colaba', 'Bandra West', 'Andheri East', 'Nariman Point', 'Malabar Hill', 'Breach Candy', 'Juhu', 'Worli', 'Goregaon', 'Powai'],
    shift: {
      start: '09:00',
      end: '17:00',
    },
    metrics: {
      rating: 4.5,
      completedOrders: 150,
      cancelledOrders: 3,
    },
  },
  // Add more sample partners as needed
];

//////////////////////////////////////////

export const metrics = {
  activeOrders: 47,
  totalPartners: 156,
  successRate: 94.5,
  revenue: 25890
};

export const partners: DeliveryPartner[] = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    status: 'active',
    currentLoad: 3,
    areas: ['Manhattan', 'Brooklyn'],
    shift: {
      start: '09:00',
      end: '17:00'
    },
    metrics: {
      rating: 4.8,
      completedOrders: 156,
      cancelledOrders: 2
    }
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    status: 'active',
    currentLoad: 1,
    areas: ['Queens', 'Bronx'],
    shift: {
      start: '10:00',
      end: '18:00'
    },
    metrics: {
      rating: 4.9,
      completedOrders: 203,
      cancelledOrders: 1
    }
  },
  {
    _id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    status: 'inactive',
    currentLoad: 0,
    areas: ['Staten Island', 'Brooklyn'],
    shift: {
      start: '12:00',
      end: '20:00'
    },
    metrics: {
      rating: 4.7,
      completedOrders: 142,
      cancelledOrders: 3
    }
  }
];

export const activeOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'Alice Brown',
    customerPhone: '+1234567893',
    deliveryArea: 'Colaba',
    status: 'picked',
    totalAmount: 45.99,
    scheduledTime: '2024-03-15T15:30:00Z',
    assignedTo: '1',
    items: [
      { id: 'item-1-1', name: 'Pizza Margherita', quantity: 2, price: 15.99 },
      { id: 'item-1-2', name: 'Coca Cola', quantity: 2, price: 7.00 }
    ],
    createdAt: '2024-03-15T14:30:00Z',
    lastUpdated: '2024-03-15T15:00:00Z',
    // Approximate coordinates for Colaba, Mumbai
    position: [18.921984, 72.833151]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Bob Wilson',
    customerPhone: '+1234567894',
    deliveryArea: 'Bandra West',
    status: 'assigned',
    totalAmount: 32.50,
    scheduledTime: '2024-03-15T15:45:00Z',
    assignedTo: '2',
    items: [
      { id: 'item-2-1', name: 'Burger Combo', quantity: 1, price: 25.50 },
      { id: 'item-2-2', name: 'Fries', quantity: 1, price: 7.00 }
    ],
    createdAt: '2024-03-15T14:45:00Z',
    lastUpdated: '2024-03-15T15:15:00Z',
    // Approximate coordinates for Bandra West, Mumbai
    position: [19.0550, 72.8235]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerName: 'Carol Davis',
    customerPhone: '+1234567895',
    deliveryArea: 'Andheri East',
    status: 'pending',
    totalAmount: 28.99,
    scheduledTime: '2024-03-15T16:00:00Z',
    items: [
      { id: 'item-3-1', name: 'Sushi Set', quantity: 1, price: 28.99 }
    ],
    createdAt: '2024-03-15T15:00:00Z',
    lastUpdated: '2024-03-15T15:00:00Z',
    // Approximate coordinates for Andheri East, Mumbai
    position: [19.1195, 72.8871]
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customerName: 'Derek Johnson',
    customerPhone: '+1234567896',
    deliveryArea: 'Malabar Hill',
    status: 'assigned',
    totalAmount: 55.75,
    scheduledTime: '2024-03-15T16:15:00Z',
    assignedTo: '3',
    items: [
      { id: 'item-4-1', name: 'Pasta Arrabiata', quantity: 1, price: 35.75 },
      { id: 'item-4-2', name: 'Lemonade', quantity: 1, price: 20.00 }
    ],
    createdAt: '2024-03-15T15:05:00Z',
    lastUpdated: '2024-03-15T15:40:00Z',
    // Approximate coordinates for Malabar Hill, Mumbai
    position: [18.9350, 72.8325]
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customerName: 'Eva Green',
    customerPhone: '+1234567897',
    deliveryArea: 'Juhu',
    status: 'picked',
    totalAmount: 62.00,
    scheduledTime: '2024-03-15T16:30:00Z',
    assignedTo: '4',
    items: [
      { id: 'item-5-1', name: 'Vegan Wrap', quantity: 2, price: 30.00 },
      { id: 'item-5-2', name: 'Fresh Juice', quantity: 1, price: 2.00 }
    ],
    createdAt: '2024-03-15T15:20:00Z',
    lastUpdated: '2024-03-15T15:50:00Z',
    // Approximate coordinates for Juhu, Mumbai
    position: [19.0986, 72.8267]
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-006',
    customerName: 'Frank Lee',
    customerPhone: '+1234567898',
    deliveryArea: 'Worli',
    status: 'pending',
    totalAmount: 40.50,
    scheduledTime: '2024-03-15T16:45:00Z',
    items: [
      { id: 'item-6-1', name: 'Veg Sandwich', quantity: 1, price: 20.50 },
      { id: 'item-6-2', name: 'Iced Tea', quantity: 1, price: 20.00 }
    ],
    createdAt: '2024-03-15T15:30:00Z',
    lastUpdated: '2024-03-15T16:00:00Z',
    // Approximate coordinates for Worli, Mumbai
    position: [19.0238, 72.8490]
  },
  {
    id: '7',
    orderNumber: 'ORD-2024-007',
    customerName: 'Grace Kim',
    customerPhone: '+1234567899',
    deliveryArea: 'Powai',
    status: 'assigned',
    totalAmount: 78.25,
    scheduledTime: '2024-03-15T17:00:00Z',
    assignedTo: '5',
    items: [
      { id: 'item-7-1', name: 'Chicken Biryani', quantity: 1, price: 50.25 },
      { id: 'item-7-2', name: 'Mint Lassi', quantity: 1, price: 28.00 }
    ],
    createdAt: '2024-03-15T15:45:00Z',
    lastUpdated: '2024-03-15T16:20:00Z',
    // Approximate coordinates for Powai, Mumbai
    position: [19.1195, 72.9141]
  }
];

export const recentAssignments: Assignment[] = [
  {
    orderId: '1',
    partnerId: '1',
    timestamp: new Date('2024-03-15T15:00:00Z'),
    status: 'success',
    orderDetails: {
      items: ['Pizza Margherita (2)', 'Coca Cola (2)'],
      total: 45.99,
      destination: 'Manhattan'
    },
    partnerDetails: {
      name: 'John Doe',
      phone: '+1234567890',
      rating: 4.8
    }
  },
  {
    orderId: '2',
    partnerId: '2',
    timestamp: new Date('2024-03-15T14:35:00Z'),
    status: 'success',
    orderDetails: {
      items: ['Burger Combo (1)', 'Fries (1)'],
      total: 32.50,
      destination: 'Brooklyn'
    },
    partnerDetails: {
      name: 'Jane Smith',
      phone: '+1234567891',
      rating: 4.9
    }
  }
];