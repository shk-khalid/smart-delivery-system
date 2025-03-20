import { Assignment, AssignmentMetrics } from "../types/assignment";

export const assignments: Assignment[] = [
  {
    orderId: "ORD1011",
    partnerId: "PAR5011",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
    status: "success",
    orderDetails: {
      items: ["apple", "orange"],
      total: 20,
      destination: "111 First St",
    },
    partnerDetails: {
      name: "Alice Walker",
      phone: "555-1011",
      rating: 4.6,
    },
  },
  {
    orderId: "ORD1012",
    partnerId: "PAR5012",
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 minutes ago
    status: "failed",
    reason: "Out of stock",
  },
  {
    orderId: "ORD1013",
    partnerId: "PAR5013",
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 minutes ago
    status: "success",
    orderDetails: {
      items: ["banana", "grapes"],
      total: 22,
      destination: "222 Second St",
    },
    partnerDetails: {
      name: "Brian Johnson",
      phone: "555-1012",
      rating: 4.7,
    },
  },
  {
    orderId: "ORD1014",
    partnerId: "PAR5014",
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 minutes ago
    status: "failed",
    reason: "Address not found",
  },
  {
    orderId: "ORD1015",
    partnerId: "PAR5015",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
    status: "success",
    orderDetails: {
      items: ["bread", "butter"],
      total: 18,
      destination: "333 Third St",
    },
    partnerDetails: {
      name: "Cathy Lee",
      phone: "555-1013",
      rating: 4.9,
    },
  },
  {
    orderId: "ORD1016",
    partnerId: "PAR5016",
    timestamp: new Date(Date.now() - 1000 * 60 * 32).toISOString(), // 32 minutes ago
    status: "failed",
    reason: "Payment declined",
  },
  {
    orderId: "ORD1017",
    partnerId: "PAR5017",
    timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(), // 40 minutes ago
    status: "success",
    orderDetails: {
      items: ["milk", "cereal"],
      total: 15,
      destination: "444 Fourth St",
    },
    partnerDetails: {
      name: "Daniel Kim",
      phone: "555-1014",
      rating: 4.5,
    },
  },
  {
    orderId: "ORD1018",
    partnerId: "PAR5018",
    timestamp: new Date(Date.now() - 1000 * 60 * 47).toISOString(), // 47 minutes ago
    status: "failed",
    reason: "Partner unavailable",
  },
  {
    orderId: "ORD1019",
    partnerId: "PAR5019",
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(), // 55 minutes ago
    status: "success",
    orderDetails: {
      items: ["chicken", "rice"],
      total: 30,
      destination: "555 Fifth St",
    },
    partnerDetails: {
      name: "Eva Martinez",
      phone: "555-1015",
      rating: 4.8,
    },
  },
  {
    orderId: "ORD1020",
    partnerId: "PAR5020",
    timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(), // 1 hour 5 minutes ago
    status: "success",
    orderDetails: {
      items: ["pasta", "sauce"],
      total: 28,
      destination: "666 Sixth St",
    },
    partnerDetails: {
      name: "Frank Turner",
      phone: "555-1016",
      rating: 4.4,
    },
  },
  {
    orderId: "ORD1021",
    partnerId: "PAR5021",
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(), // 1 hour 15 minutes ago
    status: "failed",
    reason: "Out of stock",
  },
  {
    orderId: "ORD1022",
    partnerId: "PAR5022",
    timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(), // 1 hour 25 minutes ago
    status: "success",
    orderDetails: {
      items: ["soup", "salad"],
      total: 20,
      destination: "777 Seventh St",
    },
    partnerDetails: {
      name: "Grace Liu",
      phone: "555-1017",
      rating: 4.7,
    },
  },
];

export const assignmentMetrics: AssignmentMetrics = {
  totalAssigned: assignments.length,
  successRate: 58, // e.g., 7 out of 12 assignments succeeded (~58%)
  averageTime: 32, // Average delivery time in minutes (static value for mock)
  failureReasons: [
    { reason: "Out of stock", count: 4 },
    { reason: "Address not found", count: 3 },
    { reason: "Payment declined", count: 3 },
    { reason: "Partner unavailable", count: 1 },
    { reason: "Other", count: 5 },
  ],
  historicalData: [
    {
      date: new Date('2025-03-08'),
      successRate: 60,
      averageTime: 40,
      totalAssigned: 35,
    },
    {
      date: new Date('2025-03-09'),
      successRate: 62,
      averageTime: 38,
      totalAssigned: 40,
    },
    {
      date: new Date('2025-03-11'),
      successRate: 64,
      averageTime: 36,
      totalAssigned: 45,
    },
    {
      date: new Date('2025-03-12'),
      successRate: 66,
      averageTime: 35,
      totalAssigned: 50,
    },
    {
      date: new Date('2025-03-13'),
      successRate: 68,
      averageTime: 34,
      totalAssigned: 55,
    },
    {
      date: new Date('2025-03-15'),
      successRate: 65,
      averageTime: 35,
      totalAssigned: 40,
    },
    {
      date: new Date('2025-03-16'),
      successRate: 70,
      averageTime: 30,
      totalAssigned: 50,
    },
    {
      date: new Date('2025-03-17'),
      successRate: 75,
      averageTime: 28,
      totalAssigned: 60,
    },
    {
      date: new Date('2025-03-18'),
      successRate: 73,
      averageTime: 32,
      totalAssigned: 65,
    },
    {
      date: new Date('2025-03-19'),
      successRate: 78,
      averageTime: 30,
      totalAssigned: 70,
    },
  ],
};