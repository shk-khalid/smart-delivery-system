import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Order } from '../../types/order';

interface ActiveOrdersMapProps {
  orders: Order[];
}

// Component to update map center and bounds
function MapUpdater({ orders }: { orders: Order[] }) {
  const map = useMap();

  useEffect(() => {
    if (orders.length === 0) return;

    // Create bounds object from all order positions
    const bounds = L.latLngBounds(orders.map(order => order.position));

    // Fit map to bounds with padding
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 13,
    });
  }, [orders, map]);

  return null;
}

const createStatusIcon = (status: string) => {
  const getColor = () => {
    switch (status.toLowerCase()) {
      case 'picked': return '#22c55e';
      case 'assigned': return '#3b82f6';
      case 'pending': return '#eab308';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${getColor()};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export function ActiveOrdersMap({ orders }: ActiveOrdersMapProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  selectedOrder;

  // Calculate initial center based on orders or default to New York
  const defaultCenter: [number, number] = [19.0760, 72.8777];
  const initialCenter = useMemo(() => {
    if (orders.length === 0) return defaultCenter;

    // Calculate the average of all coordinates
    const sum = orders.reduce(
      (acc, order) => {
        acc[0] += order.position[0];
        acc[1] += order.position[1];
        return acc;
      },
      [0, 0]
    );

    return [
      sum[0] / orders.length,
      sum[1] / orders.length,
    ] as [number, number];
  }, [orders]);

  return (
    <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl shadow-lg p-4 h-[400px]">
      <h2 className="text-xl font-semibold mb-4 text-white">Active Orders Map</h2>
      <div className="h-[calc(100%-1rem)] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={initialCenter}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater orders={orders} />
          {orders.map(order => (
            <Marker
              key={order.id}
              position={order.position}
              icon={createStatusIcon(order.status)}
              eventHandlers={{
                click: () => setSelectedOrder(order),
              }}
            >
              <Popup className="dark-leaflet-popup">
                <div className="p-3 space-y-2">
                  <p className="text-sm text-dark-300">
                    <span className="font-medium text-dark-200">Customer:</span> {order.customerName}
                  </p>
                  <p className="text-sm text-dark-300">
                    <span className="font-medium text-dark-200">Area:</span> {order.deliveryArea}
                  </p>
                  <div className="text-sm text-dark-300">
                    <span className="font-medium text-dark-200">Status:</span>{' '}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-dark-300">
                    <span className="font-medium text-dark-200">Amount:</span>{' '}
                    <span className="text-green-400">${order.totalAmount.toFixed(2)}</span>
                  </p>
                  <p className="text-sm text-dark-300">
                    <span className="font-medium text-dark-200">Scheduled:</span>{' '}
                    {new Date(order.scheduledTime).toLocaleTimeString()}
                  </p>
                </div>
              </Popup>

            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
