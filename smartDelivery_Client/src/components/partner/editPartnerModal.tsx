import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DeliveryPartner } from '../../types/partner';

interface EditPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: DeliveryPartner;
  onSubmit: (updatedPartner: DeliveryPartner) => void;
}

export function EditPartnerModal({ isOpen, onClose, partner, onSubmit }: EditPartnerModalProps) {
  // Initialize form state with partner data.
  const [formData, setFormData] = useState<DeliveryPartner>(partner);

  // Update form state when the partner prop changes.
  useEffect(() => {
    setFormData(partner);
  }, [partner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" 
          enterFrom="opacity-0" 
          enterTo="opacity-100" 
          leave="ease-in duration-200" 
          leaveFrom="opacity-100" 
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-900/75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" 
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
              enterTo="opacity-100 translate-y-0 sm:scale-100" 
              leave="ease-in duration-200" 
              leaveFrom="opacity-100 translate-y-0 sm:scale-100" 
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 p-6 shadow-2xl ring-1 ring-dark-700 transition-all">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Dialog.Title className="text-2xl font-semibold text-white">
                    Edit Partner
                  </Dialog.Title>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-200">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-dark-700 bg-dark-700/50 px-3 py-2 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-200">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-dark-700 bg-dark-700/50 px-3 py-2 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-dark-200">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-dark-700 bg-dark-700/50 px-3 py-2 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="areas" className="block text-sm font-medium text-dark-200">
                        Areas (comma-separated)
                      </label>
                      <input
                        type="text"
                        id="areas"
                        value={formData.areas.join(', ')}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            areas: e.target.value.split(',').map((area) => area.trim()),
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-dark-700 bg-dark-700/50 px-3 py-2 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500 transition-colors"
                        required
                      />
                    </div>
                    {/* You can add more fields here (like shift, status, etc.) if needed */}
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md bg-dark-700 px-4 py-2 text-sm font-medium text-dark-200 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-dark-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2 text-sm font-medium text-white shadow hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
