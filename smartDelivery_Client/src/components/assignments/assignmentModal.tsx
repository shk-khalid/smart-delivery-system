import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { X, Package, User, MapPin, Star, Clock } from 'lucide-react';
import { Assignment } from '../../types/assignment';
import { format } from 'date-fns';

interface AssignmentModalProps {
  assignment: Assignment;
  isOpen: boolean;
  onClose: () => void;
}

export function AssignmentModal({ assignment, isOpen, onClose }: AssignmentModalProps) {
  // If not open, don’t render anything
  if (!isOpen) return null;

  // Close on 'Escape' key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close on outside/backdrop click
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  // The actual modal JSX
  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm rounded-xl shadow-lg border border-dark-700">
        {/* Header */}
        <div className="sticky top-0 bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Assignment Details</h2>
          <button
            onClick={onClose}
            aria-label="Close assignment details"
            className="text-dark-400 hover:text-dark-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Order Information */}
          <div>
            <h4 className="font-medium text-white flex items-center mb-2">
              <Package size={18} className="mr-2 text-primary-400" />
              Order Information
            </h4>
            <div className="text-sm text-dark-300 space-y-1">
              <p>Order ID: {assignment.orderId}</p>
              {assignment.orderDetails && (
                <>
                  <p>Items: {assignment.orderDetails.items.join(', ')}</p>
                  <p>Total: ${assignment.orderDetails.total}</p>
                  <p className="flex items-center">
                    <MapPin size={14} className="mr-1 text-primary-400" />
                    {assignment.orderDetails.destination}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Partner Information */}
          <div>
            <h4 className="font-medium text-white flex items-center mb-2">
              <User size={18} className="mr-2 text-primary-400" />
              Partner Information
            </h4>
            <div className="text-sm text-dark-300 space-y-1">
              <p>Partner ID: {assignment.partnerId}</p>
              {assignment.partnerDetails && (
                <>
                  <p>Name: {assignment.partnerDetails.name}</p>
                  <p>Phone: {assignment.partnerDetails.phone}</p>
                  <p className="flex items-center">
                    <Star size={14} className="mr-1 text-yellow-400" />
                    Rating: {assignment.partnerDetails.rating}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-medium text-white mb-2">Status</h4>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                assignment.status === 'success'
                  ? 'bg-primary-900/50 text-primary-300'
                  : 'bg-red-900/50 text-red-300'
              }`}
            >
              {assignment.status}
            </span>
            {assignment.reason && (
              <p className="mt-1 text-sm text-dark-400">{assignment.reason}</p>
            )}
          </div>

          {/* Timestamp */}
          <div>
            <h4 className="font-medium text-white flex items-center mb-2">
              <Clock size={18} className="mr-2 text-primary-400" />
              Timestamp
            </h4>
            <div className="text-sm text-dark-300">
              {format(new Date(assignment.timestamp), 'PPp')}
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

  return ReactDOM.createPortal(modalContent, document.body);
}
