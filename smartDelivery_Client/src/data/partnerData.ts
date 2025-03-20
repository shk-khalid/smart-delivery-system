import { DeliveryPartner } from "../types/partner";

export const partners: DeliveryPartner[] = [
  {
    _id: '1',
    name: 'Jon Snow',
    email: 'jonsnow@example.com',
    phone: '+919900000001',
    status: 'active',
    currentLoad: 3,
    areas: ['Andheri', 'Bandra'],
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
    name: 'Daenerys Targaryen',
    email: 'daenerys@example.com',
    phone: '+919900000002',
    status: 'active',
    currentLoad: 1,
    areas: ['Juhu', 'Bandra West'],
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
    name: 'Tyrion Lannister',
    email: 'tyrion@example.com',
    phone: '+919900000003',
    status: 'inactive',
    currentLoad: 0,
    areas: ['Powai', 'Goregaon'],
    shift: {
      start: '12:00',
      end: '20:00'
    },
    metrics: {
      rating: 4.7,
      completedOrders: 142,
      cancelledOrders: 3
    }
  },
  {
    _id: '4',
    name: 'Cersei Lannister',
    email: 'cersei@example.com',
    phone: '+919900000004',
    status: 'active',
    currentLoad: 2,
    areas: ['Andheri', 'Bandra'],
    shift: {
      start: '08:00',
      end: '16:00'
    },
    metrics: {
      rating: 4.6,
      completedOrders: 180,
      cancelledOrders: 4
    }
  },
  {
    _id: '5',
    name: 'Arya Stark',
    email: 'arya@example.com',
    phone: '+919900000005',
    status: 'active',
    currentLoad: 2,
    areas: ['Juhu', 'Bandra West'],
    shift: {
      start: '09:30',
      end: '17:30'
    },
    metrics: {
      rating: 4.9,
      completedOrders: 220,
      cancelledOrders: 2
    }
  },
  {
    _id: '6',
    name: 'Sansa Stark',
    email: 'sansa@example.com',
    phone: '+919900000006',
    status: 'inactive',
    currentLoad: 0,
    areas: ['Powai', 'Kanjur Marg'],
    shift: {
      start: '10:00',
      end: '18:00'
    },
    metrics: {
      rating: 4.7,
      completedOrders: 200,
      cancelledOrders: 3
    }
  },
  {
    _id: '7',
    name: 'Bran Stark',
    email: 'bran@example.com',
    phone: '+919900000007',
    status: 'inactive',
    currentLoad: 0,
    areas: ['Colaba', 'Cuffe Parade'],
    shift: {
      start: '11:00',
      end: '19:00'
    },
    metrics: {
      rating: 4.8,
      completedOrders: 160,
      cancelledOrders: 5
    }
  },
  {
    _id: '8',
    name: 'Jaime Lannister',
    email: 'jaime@example.com',
    phone: '+919900000008',
    status: 'active',
    currentLoad: 1,
    areas: ['Dadar', 'Parel'],
    shift: {
      start: '07:30',
      end: '15:30'
    },
    metrics: {
      rating: 4.5,
      completedOrders: 140,
      cancelledOrders: 1
    }
  },
  {
    _id: '9',
    name: 'Theon Greyjoy',
    email: 'theon@example.com',
    phone: '+919900000009',
    status: 'active',
    currentLoad: 2,
    areas: ['Bandra', 'Andheri East'],
    shift: {
      start: '08:30',
      end: '16:30'
    },
    metrics: {
      rating: 4.4,
      completedOrders: 130,
      cancelledOrders: 2
    }
  },
  {
    _id: '10',
    name: 'Davos Seaworth',
    email: 'davos@example.com',
    phone: '+919900000010',
    status: 'active',
    currentLoad: 2,
    areas: ['Malad', 'Borivali'],
    shift: {
      start: '09:15',
      end: '17:15'
    },
    metrics: {
      rating: 4.7,
      completedOrders: 190,
      cancelledOrders: 3
    }
  }
];
