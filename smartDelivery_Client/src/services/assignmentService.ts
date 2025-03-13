import api from './api';
import { AssignmentMetrics, Assignment } from '../types/assignment';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

function convertMetrics(raw: any): AssignmentMetrics {
  return {
    totalAssigned: raw.total_assigned,
    successRate: raw.success_rate,
    averageTime: raw.average_time,
    failureReasons: raw.failure_reasons.map((item: any) => ({
      reason: item.reason,
      count: item.count,
    })),
    historicalData: raw.historical_data.map((item: any) => ({
      timestamp: item.timestamp,
      successRate: item.successRate,
      averageTime: item.averageTime,
      totalAssigned: item.totalAssigned,
    })),
  };
}

export const assignmentService = {
  // GET /api/assignments-metrics/
  async getAssignmentMetrics(): Promise<ApiResponse<AssignmentMetrics>> {
    try {
      const response = await api.get('/api/assignments-metrics/');
      const converted = convertMetrics(response.data);
      return { data: converted };
    } catch (error) {
      return {
        data: {} as AssignmentMetrics,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  },

  // POST /api/assignments-run/
  async runAssignmentAlgorithm(): Promise<ApiResponse<AssignmentMetrics>> {
    try {
      const response = await api.post('/api/assignments-run/');
      const converted = convertMetrics(response.data);
      return { data: converted };
    } catch (error) {
      return {
        data: {} as AssignmentMetrics,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  },

  // GET /api/assignments/
  async getAssignments(): Promise<ApiResponse<Assignment[]>> {
    try {
      const response = await api.get('/api/assignments/');
      // Optionally, if needed, convert each assignment using convertAssignment:
      // const assignments = response.data.map((raw: any) => convertAssignment(raw));
      return { data: response.data };
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  },
};

export default assignmentService;
