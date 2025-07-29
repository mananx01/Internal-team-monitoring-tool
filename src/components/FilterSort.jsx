import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter, setSortBy } from '../redux/slices/membersSlice';

const FilterSort = () => {
  const dispatch = useDispatch();
  const { statusFilter, sortBy } = useSelector(state => state.members);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center space-x-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="Working">Working</option>
            <option value="Break">Break</option>
            <option value="Meeting">Meeting</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Name</option>
            <option value="activeTasks">Active Tasks</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
