import React from 'react';
import { User } from 'lucide-react';
import { DeliveryPartner } from '../../types/partner';

interface PartnerStatusProps {
  partners: DeliveryPartner[];
}

export const PartnerStatus: React.FC<PartnerStatusProps> = ({ partners }) => {
  // We'll apply a color map for statuses
  const statusColors: { [key: string]: string } = {
    active: 'bg-green-500',
    inactive: 'bg-gray-500',
  };

  return (
    // Container with max-height & vertical scrolling
    <div className={
      partners.length > 5
        ? 'max-h-64 overflow-y-auto divide-y divide-dark-700'
        : 'divide-y divide-dark-700'
    }>
      {partners.map((partner) => (
        <div
          key={partner._id}
          className="flex items-center justify-between p-3 last:border-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-white">{partner.name}</p>
              <p className="text-sm text-dark-300">
                {partner.currentLoad} active orders
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${statusColors[partner.status] || 'bg-gray-500'
                }`}
            />
            <span className="text-sm capitalize text-dark-300">
              {partner.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
