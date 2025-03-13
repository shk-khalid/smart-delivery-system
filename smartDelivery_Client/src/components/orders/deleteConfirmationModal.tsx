import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Order } from '../../types/order';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
    isBulkDelete?: boolean;
    selectedCount?: number;
    onConfirm: () => void;
};

export function DeleteConfirmationModal({
    isOpen,
    onClose,
    order,
    isBulkDelete = false,
    selectedCount = 0,
    onConfirm,
}: DeleteConfirmationModalProps) {
    
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
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

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-dark-700">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                                            {isBulkDelete ? 'Delete Orders' : 'Delete Order'}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-dark-300">
                                                {isBulkDelete
                                                    ? `Are you sure you want to delete ${selectedCount} orders? This action cannot be undone.`
                                                    : `Are you sure you want to delete order ${order?.orderNumber}? This action cannot be undone.`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-red-600 to-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-red-800 sm:ml-3 sm:w-auto"
                                        onClick={handleConfirm}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-dark-700 px-3 py-2 text-sm font-semibold text-dark-200 shadow-sm ring-1 ring-inset ring-dark-600 hover:bg-dark-600 sm:mt-0 sm:w-auto"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};