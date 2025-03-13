import { useState } from 'react';
import { usePopper } from 'react-popper';
import ReactPaginate from 'react-paginate';
import {
  Eye,
  MoreVertical,
  Clock,
  MapPin,
  Trash2,
  PenSquare as PencilSquare,
  Star,
} from 'lucide-react';
import { format } from 'date-fns';
import { DeliveryPartner } from '../../types/partner';
import { PartnerDetailsModal } from './partnerDetailsModal';

type PartnerListProps = {
  partners: DeliveryPartner[];
  onEdit: (partner: DeliveryPartner) => void;
  onEditShift: (partner: DeliveryPartner) => void;
  onEditAreas: (partner: DeliveryPartner) => void;
  onDelete: (partner: DeliveryPartner) => void;
};

export function PartnerList({
  partners,
  onEdit,
  onEditShift,
  onEditAreas,
  onDelete,
}: PartnerListProps) {
  const [viewingPartner, setViewingPartner] = useState<DeliveryPartner | null>(null);

  // Track which partner's dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // React Popper references
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Slice data for current page
  const offset = currentPage * itemsPerPage;
  const currentItems = partners.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(partners.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Initialize Popper with flip enabled
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'flip', enabled: true }],
  });

  const handleActionClick = (partnerId: string, buttonRef: HTMLButtonElement) => {
    if (activeDropdown === partnerId) {
      setActiveDropdown(null);
      setReferenceElement(null);
    } else {
      setActiveDropdown(partnerId);
      setReferenceElement(buttonRef);
    }
  };

  function handleItemsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  }

  return (
    <div className="mt-8">
      <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-xl shadow-lg border border-dark-700">
        {/* Table Header: Items Per Page Selector */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700">
          <div className="flex items-center space-x-2 text-dark-300 text-sm">
            <span>Show</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className=" appearance-none bg-dark-900/50 border border-dark-700 text-white rounded px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:bg-dark-700/50"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span>entries</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="bg-dark-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Load
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Areas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Shift
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {currentItems.map((partner) => (
                <tr
                  key={partner._id}
                  className="hover:bg-dark-800/50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-dark-200">{partner._id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-dark-200">
                      {partner.name}
                    </div>
                    <div className="text-sm text-dark-400">{partner.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        partner.status === 'active'
                          ? 'bg-primary-500/20 text-primary-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-16 rounded-full bg-dark-600">
                        <div
                          className="h-2 rounded-full bg-primary-500"
                          style={{
                            width: `${(partner.currentLoad / 3) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-dark-300">
                        {partner.currentLoad}/3
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {partner.areas.map((area) => (
                        <span
                          key={area}
                          className="inline-flex items-center rounded-full bg-primary-500/20 px-2 py-0.5 text-xs font-medium text-primary-300"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-primary-400" />
                      <span>
                        {format(
                          new Date(`2000-01-01T${partner.shift.start}`),
                          'hh:mm a'
                        )}{' '}
                        -{' '}
                        {format(
                          new Date(`2000-01-01T${partner.shift.end}`),
                          'hh:mm a'
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-white">
                        {partner.metrics.rating.toFixed(1)}
                      </span>
                      <Star className="ml-1 w-4 h-4 text-yellow-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingPartner(partner)}
                        className="text-dark-400 hover:text-dark-200"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) =>
                            handleActionClick(
                              partner._id!,
                              e.currentTarget as HTMLButtonElement
                            )
                          }
                          className="text-dark-400 hover:text-dark-200"
                          title="More Actions"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {activeDropdown === partner._id && (
                          <div
                            ref={setPopperElement}
                            style={styles.popper}
                            {...attributes.popper}
                            className=" absolute bg-dark-800 backdrop-blur-sm border border-dark-700 z-10 rounded-md shadow-lg w-48 mt-2"
                          >
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  onEdit(partner);
                                  setActiveDropdown(null);
                                  setReferenceElement(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-dark-200 hover:bg-dark-700/50 w-full text-left"
                              >
                                <PencilSquare className="w-4 h-4 mr-2" />
                                Edit Details
                              </button>
                              <button
                                onClick={() => {
                                  onEditShift(partner);
                                  setActiveDropdown(null);
                                  setReferenceElement(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-dark-200 hover:bg-dark-700/50 w-full text-left"
                              >
                                <Clock className="w-4 h-4 mr-2" />
                                Edit Shift
                              </button>
                              <button
                                onClick={() => {
                                  onEditAreas(partner);
                                  setActiveDropdown(null);
                                  setReferenceElement(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-dark-200 hover:bg-dark-700/50 w-full text-left"
                              >
                                <MapPin className="w-4 h-4 mr-2" />
                                Edit Areas
                              </button>
                              <button
                                onClick={() => {
                                  onDelete(partner);
                                  setActiveDropdown(null);
                                  setReferenceElement(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-dark-700/50 w-full text-left"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Partner
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Component */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2"
          pageLinkClassName="px-3 py-1 border border-dark-700 text-dark-300 rounded hover:bg-dark-700/50"
          previousLinkClassName="px-3 py-1 border border-dark-700 text-dark-300 rounded hover:bg-dark-700/50"
          nextLinkClassName="px-3 py-1 border border-dark-700 text-dark-300 rounded hover:bg-dark-700/50"
          disabledClassName="opacity-50 cursor-not-allowed"
          activeLinkClassName="bg-primary-500 text-white"
        />
      </div>

      {viewingPartner && (
        <PartnerDetailsModal
          partner={viewingPartner}
          onClose={() => setViewingPartner(null)}
        />
      )}
    </div>
  );
}
