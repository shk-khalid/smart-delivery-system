import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { parseISO, format, isValid } from 'date-fns';
import { Assignment } from '../../types/assignment';

interface RecentAssignmentsProps {
  assignments: Assignment[];
}

export function RecentAssignments({ assignments }: RecentAssignmentsProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); // or whatever number you prefer

  // Calculate pagination values
  const offset = currentPage * itemsPerPage;
  const currentItems = assignments.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(assignments.length / itemsPerPage);

  function handlePageChange(selectedItem: { selected: number }) {
    setCurrentPage(selectedItem.selected);
  }

  function formatDateTime(isoString?: string): string {
    if (!isoString) {
      return 'No scheduled time';
    }
    const dateObj = parseISO(isoString);
    if (!isValid(dateObj)) {
      return isoString; // Fallback to raw string if invalid
    }
    return format(dateObj, 'PPp'); // e.g. "May 1, 2024, 12:30 PM"
  }

  function handleItemsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  }

  return (
    <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 
                    backdrop-blur-sm rounded-xl shadow-lg border border-dark-700 p-4">
      <h2 className="text-xl font-semibold text-dark-200 mb-2">
        Recent Assignments
      </h2>

      {/* Table Header: Items Per Page Selector */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700">
          <div className="flex items-center space-x-2 text-dark-300 text-sm">
            <span>Show</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className=" appearance-none bg-dark-900/50 border border-dark-700 text-white rounded px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:bg-dark-700/50">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span>entries</span>
          </div>
        </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-dark-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Partner Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Scheduled Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
          <tbody className="divide-y divide-dark-700">
            {currentItems.map((assignment) => (
              <tr
                key={assignment.orderId}
                className="hover:bg-dark-800/50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-dark-200">
                      #{assignment.orderId}
                    </p>
                    <p className="text-sm text-dark-300">
                      {assignment.orderDetails?.items.join(', ')}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-dark-200">
                      {assignment.partnerDetails?.name}
                    </p>
                    <p className="text-sm text-dark-300">
                      Rating: {assignment.partnerDetails?.rating}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-dark-300">
                  {formatDateTime(assignment.timestamp)}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                      assignment.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {assignment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
    </div>
  );
}
