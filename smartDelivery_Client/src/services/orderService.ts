import api from './api';
import { OrderStatus, Order } from '../types/order';

function convertOrder(rawOrder: any): Order {
    return {
        id: String(rawOrder.id),
        orderNumber: rawOrder.order_number,
        customerName: rawOrder.customer_name,
        customerPhone: rawOrder.customer_phone,
        deliveryArea: rawOrder.delivery_area,
        status: rawOrder.status,
        totalAmount: Number(rawOrder.total_amount),
        scheduledTime: rawOrder.scheduled_time,
        assignedTo: rawOrder.assigned_to ? String(rawOrder.assigned_to) : undefined,
        items: rawOrder.items, // Convert further if needed
        createdAt: rawOrder.created_at,
        lastUpdated: rawOrder.last_updated,
        position: rawOrder.position,
    };
}

export const orderService = {
    // Get orders with optional filters
    getOrders: async (filters?: {
        status?: OrderStatus[];
        area?: string;
        date?: string;
    }): Promise<Order[]> => {
        const params = new URLSearchParams();

        if (filters?.status?.length === 1) {
            params.append('status', filters.status[0]);
        }
        if (filters?.area) {
            params.append('area', filters.area);
        }
        if (filters?.date) {
            params.append('date', filters.date);
        }

        const response = await api.get(`/api/orders/`);
        // Convert each order to the correct format
        return response.data.map((rawOrder: any) => convertOrder(rawOrder));
    },

    // Get trend data for orders and revenue
    getTrendData: async (startDate: string, endDate: string) => {
        const params = new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
        });
        const response = await api.get(`/api/orders/trends/?${params.toString()}`);
        return response.data;
    },

    // Assign an order to a delivery partner
    assignOrder: async (orderId: string) => {
        const response = await api.post('/api/orders/assign/', { order_id: orderId });
        return response.data;
    },

    // Update order status
    updateOrderStatus: async (orderId: string, status: OrderStatus) => {
        const response = await api.put(`/api/orders/${orderId}/status/`, { status });
        return response.data;
    },

    // Delete a single order
    deleteOrder: async (orderId: string) => {
        const response = await api.delete(`/api/orders/${orderId}/`);
        return response.data;
    },

    // Bulk delete orders
    bulkDeleteOrders: async (orderIds: string[]) => {
        const response = await api.delete('/api/orders/bulk_delete/', {
            data: { order_ids: orderIds },
        });
        return response.data;
    }

};
