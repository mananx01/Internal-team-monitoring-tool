import React from 'react';

const StatusBadge = ({ status }) => {
  const colors = {
    Working: 'bg-green-100 text-green-800',
    Break: 'bg-yellow-100 text-yellow-800',
    Meeting: 'bg-blue-100 text-blue-800',
    Offline: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;