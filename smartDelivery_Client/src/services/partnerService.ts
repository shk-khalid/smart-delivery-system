import api from './api'; // Import the base API configuration
import { DeliveryPartner } from '../types/partner';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

function convertPartner(raw: any): DeliveryPartner {
  return {
    _id: String(raw.id),
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    status: raw.status,
    currentLoad: raw.current_load,
    areas: raw.areas,
    shift: {
      start: raw.shift_start,
      end: raw.shift_end,
    },
    metrics: {
      rating: raw.rating,
      completedOrders: raw.completed_orders,
      cancelledOrders: raw.cancelled_orders,
    },
  };
}

export const partnerService = {
  // GET /api/partners/ to list partners.
  async getPartners(): Promise<ApiResponse<DeliveryPartner[]>> {
    try {
      const response = await api.get('/api/partners/');
      const converted = response.data.map((raw: any) => convertPartner(raw));
      return { data: converted };
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  },

  // POST /api/partners/ to register a new partner.
  async createPartner(
    partner: Omit<DeliveryPartner, '_id'>
  ): Promise<ApiResponse<DeliveryPartner>> {
    try {
      // Transform shift field to shift_start and shift_end keys.
      const payload = {
        ...partner,
        shift_start: partner.shift.start,
        shift_end: partner.shift.end,
      };
      // Alternatively, use the serializer:
      // const payload = serializePartner(partner);

      const response = await api.post('/api/partners/', payload);
      const converted = convertPartner(response.data);
      return { data: converted };
    } catch (error) {
      return {
        data: {} as DeliveryPartner,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  },

  // PATCH /api/partners/<id>/ to update a partner.
  async updatePartner(
    id: string,
    partner: Partial<DeliveryPartner>
  ): Promise<ApiResponse<DeliveryPartner>> {
    try {
      const payload = partner.shift
        ? { ...partner, shift_start: partner.shift.start, shift_end: partner.shift.end }
        : partner;
      const response = await api.patch(`/api/partners/${id}/`, payload);
      const converted = convertPartner(response.data);
      return { data: converted };
    } catch (error) {
      return {
        data: {} as DeliveryPartner,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  },

  // DELETE /api/partners/<id>/ to delete a partner.
  async deletePartner(id: string): Promise<ApiResponse<void>> {
    try {
      await api.delete(`/api/partners/${id}/`);
      return { data: undefined };
    } catch (error) {
      return {
        data: undefined,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  },
};
