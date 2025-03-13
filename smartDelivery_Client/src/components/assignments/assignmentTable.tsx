import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
  Eye,
  CheckCircle,
  XCircle,
  Search,
  ArrowUpDown,
} from 'lucide-react';
import { parseISO, isValid, format } from 'date-fns';
import { Assignment } from '../../types/assignment';
import { AssignmentModal } from './assignmentModal';

type SortField = 'timestamp' | 'status' | 'partnerId';
type SortDirection = 'asc' | 'desc';

interface AssignmentTableProps {
  assignments: Assignment[];
}

export function AssignmentTable({ assignments }: AssignmentTableProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const offset = currentPage * itemsPerPage;

  // Filtering and sorting
  const filtered = assignments.filter((assignment) => {
    const orderId = (assignment.orderId || '').toLowerCase();
    const partnerId = (assignment.partnerId || '').toLowerCase();
    const searchTerm = search.toLowerCase();
    return orderId.includes(searchTerm) || partnerId.includes(searchTerm);
  });

  const sorted = filtered.sort((a, b) => {
    if (sortField === 'timestamp') {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
    }
    // Extend logic for other fields if needed
    return 0;
  });

  // Slice data for the current page
  const currentItems = sorted.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sorted.length / itemsPerPage);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  function handleItemsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
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
  

  return (
    <div className="mt-8">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400"
          />
          <input
            type="text"
            placeholder="Search by Order ID or Partner ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-900/50 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Table */}
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
                  <button
                    className="flex items-center space-x-1 text-dark-300 hover:text-primary-300"
                    onClick={() => handleSort('partnerId')}
                  >
                    <span>Partner ID</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {currentItems.map((assignment) => (
                <tr
                  key={assignment.orderId}
                  className="hover:bg-dark-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                    {assignment.partnerId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-200">
                    {assignment.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        assignment.status === 'success'
                          ? 'bg-primary-900/50 text-primary-300'
                          : 'bg-red-900/50 text-red-300'
                      }`}
                    >
                      {assignment.status === 'success' ? (
                        <CheckCircle size={14} className="mr-1" />
                      ) : (
                        <XCircle size={14} className="mr-1" />
                      )}
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                    {assignment.reason || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                    {formatDateTime(assignment.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="text-dark-400 hover:text-dark-200"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      {/* Assignment Details Modal */}
      {selectedAssignment && (
        <AssignmentModal
          assignment={selectedAssignment}
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
}
