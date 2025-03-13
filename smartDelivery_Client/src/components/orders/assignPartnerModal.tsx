import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { partnerService } from '../../services/partnerService';
import { DeliveryPartner } from '../../types/partner';

interface AssignPartnerModalProps {
  onClose: () => void;
  onAssign: (partnerId: string) => void;
}

export function AssignPartnerModal({ onClose, onAssign }: AssignPartnerModalProps) {
  const [partners, setPartners] = useState<DeliveryPartner[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const { data, error: fetchError } = await partnerService.getPartners();
        if (fetchError) {
          setError(fetchError);
        } else {
          setPartners(data);
        }
      } catch (err) {
        setError('Failed to load partners');
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  const handleAssign = () => {
    if (selectedPartnerId) {
      onAssign(selectedPartnerId);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl shadow-lg border border-dark-700">
          <div className="px-6 py-4 border-b border-dark-700 flex items-center justify-between bg-dark-800 sticky top-0">
            <h2 className="text-xl font-semibold text-white">Assign Delivery Partner</h2>
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-dark-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 py-4">
            <p className="text-white">Loading partners...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl shadow-lg border border-dark-700">
          <div className="px-6 py-4 border-b border-dark-700 flex items-center justify-between bg-dark-800 sticky top-0">
            <h2 className="text-xl font-semibold text-white">Assign Delivery Partner</h2>
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-dark-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 py-4">
            <p className="text-red-400">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Outer container restricts max height and scroll */}
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl shadow-lg border border-dark-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-dark-700 flex items-center justify-between bg-dark-800 sticky top-0">
          <h2 className="text-xl font-semibold text-white">Assign Delivery Partner</h2>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-dark-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="space-y-4">
            {partners.map((partner) => (
              <label
                key={partner._id}
                className={`block p-4 rounded-lg border transition-colors cursor-pointer ${
                  selectedPartnerId === partner._id
                    ? 'border-primary-500 bg-primary-900/20'
                    : 'border-dark-700 hover:border-dark-600'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="partner"
                    value={partner._id}
                    checked={selectedPartnerId === partner._id}
                    onChange={(e) => setSelectedPartnerId(e.target.value)}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {partner.name}
                    </div>
                    <div className="text-sm text-dark-300">
                      Rating: {partner.metrics.rating} ⭐️ •{' '}
                      {partner.metrics.completedOrders} Active Orders
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-dark-800 border-t border-dark-700 sticky bottom-0 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-dark-300 bg-dark-700 border border-dark-700 rounded-md shadow-sm hover:bg-dark-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedPartnerId}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed transition-colors"
          >
            Assign Partner
          </button>
        </div>
      </div>
    </div>
  );
}
