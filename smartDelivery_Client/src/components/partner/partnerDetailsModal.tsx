import { useEffect } from 'react';
import { X, User, MapPin, Phone, Mail, Clock, Star, Package } from 'lucide-react';
import { DeliveryPartner } from '../../types/partner';
import { format } from 'date-fns';

interface PartnerDetailsModalProps {
    partner: DeliveryPartner;
    onClose: () => void;
}


export function PartnerDetailsModal({ partner, onClose }: PartnerDetailsModalProps) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl shadow-lg border border-dark-700">
                {/* Header */}
                <div className="sticky top-0 bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Partner Details</h2>
                    <button
                        onClick={onClose}
                        className="text-dark-400 hover:text-dark-300 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Partner Summary */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-dark-400" />
                            <div>
                                <p className="text-sm text-dark-300">Name</p>
                                <p className="font-medium text-white">{partner.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-dark-400" />
                            <div>
                                <p className="text-sm text-dark-300">Email</p>
                                <p className="font-medium text-white">{partner.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-dark-400" />
                            <div>
                                <p className="text-sm text-dark-300">Phone</p>
                                <p className="font-medium text-white">{partner.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-dark-400" />
                            <div>
                                <p className="text-sm text-dark-300">Shift Hours</p>
                                <p className="font-medium text-white">
                                    {format(new Date(`2000-01-01T${partner.shift.start}`), 'hh:mm a')} -{' '}
                                    {format(new Date(`2000-01-01T${partner.shift.end}`), 'hh:mm a')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Areas */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-3">Delivery Areas</h3>
                        <div className="flex flex-wrap gap-2">
                            {partner.areas.map((area) => (
                                <span
                                    key={area}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300"
                                >
                                    <MapPin className="w-4 h-4" />
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-3">Performance Metrics</h3>
                        <div className="bg-dark-800 rounded-lg p-4 grid grid-cols-3 gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <p className="text-sm text-dark-300">Rating</p>
                                </div>
                                <p className="text-xl font-semibold text-white">
                                    {partner.metrics.rating.toFixed(1)}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Package className="w-4 h-4 text-primary-400" />
                                    <p className="text-sm text-dark-300">Completed Orders</p>
                                </div>
                                <p className="text-xl font-semibold text-white">
                                    {partner.metrics.completedOrders}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Package className="w-4 h-4 text-red-400" />
                                    <p className="text-sm text-dark-300">Cancelled Orders</p>
                                </div>
                                <p className="text-xl font-semibold text-white">
                                    {partner.metrics.cancelledOrders}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Current Load */}
                    <div>
                        <h3 className="text-lg font-medium text-white mb-3">Current Load</h3>
                        <div className="bg-dark-800 rounded-lg p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-grow">
                                    <div className="h-2 w-full rounded-full bg-dark-600">
                                        <div
                                            className="h-2 rounded-full bg-primary-500"
                                            style={{ width: `${(partner.currentLoad / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-white">
                                    {partner.currentLoad}/3 Orders
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-dark-800 px-6 py-4 border-t border-dark-700">
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-dark-300 bg-dark-700 border border-dark-700 rounded-md shadow-sm hover:bg-dark-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
