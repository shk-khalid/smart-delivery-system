import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DeliveryPartner } from '../../types/partner';

interface AreasModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: DeliveryPartner;
  onSave: (partnerId: string, areas: string[]) => void;
}

export function AreasModal({ isOpen, onClose, partner, onSave }: AreasModalProps) {
  const [areas, setAreas] = useState<string[]>(partner.areas);
  const [newArea, setNewArea] = useState('');

  const handleAddArea = () => {
    if (newArea && !areas.includes(newArea)) {
      setAreas([...areas, newArea]);
      setNewArea('');
    }
  };

  const handleRemoveArea = (area: string) => {
    setAreas(areas.filter(a => a !== area));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(partner._id!, areas);
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
                    Edit Areas for {partner.name}
                  </Dialog.Title>
                  
                  <div>
                    <label htmlFor="newArea" className="block text-sm font-medium text-dark-200">
                      Add New Area
                    </label>
                    <div className="mt-2 flex">
                      <input
                        type="text"
                        id="newArea"
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        placeholder="Enter area name"
                        className="w-full rounded-l-md border border-dark-700 bg-dark-700/50 px-3 py-2 text-white placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddArea}
                        className="rounded-r-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-200">
                      Current Areas
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {areas.map((area) => (
                        <span
                          key={area}
                          className="inline-flex items-center rounded-full bg-primary-500/20 px-3 py-1 text-sm font-medium text-primary-300"
                        >
                          {area}
                          <button
                            type="button"
                            onClick={() => handleRemoveArea(area)}
                            className="ml-2 text-primary-300 hover:text-primary-200 focus:outline-none"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md bg-dark-700 px-4 py-2 text-sm font-medium text-dark-200 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-dark-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2 text-sm font-medium text-white shadow hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      Save
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
