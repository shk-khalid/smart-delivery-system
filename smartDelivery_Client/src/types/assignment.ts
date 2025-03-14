export type Assignment = {
    orderId: string;
    partnerId: string;
    timestamp: string;
    status: 'success' | 'failed';
    reason?: string;
    orderDetails?: {
      items: string[];
      total: number;
      destination: string;
    };
    partnerDetails?: {
      name: string;
      phone: string;
      rating: number;
    };
  };
  
  export type AssignmentMetrics = {
    totalAssigned: number;
    successRate: number;
    averageTime: number;
    failureReasons: {
      reason: string;
      count: number;
    }[];
    historicalData: {
      date: Date;
      successRate: number;
      averageTime: number;
      totalAssigned: number;
    }[];
  };

  
  export type PartnerStatus = {
    available: number;
    busy: number;
    offline: number;
  };
  
  export type TimeFilter = '24h' | '7d' | '30d' | 'custom';
  
  export type DateRange = {
    start: Date;
    end: Date;
  };