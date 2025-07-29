import { useDispatch, useSelector } from 'react-redux';
import { updateMemberStatus } from '../redux/slices/membersSlice';

const statuses = ['Working', 'Break', 'Meeting', 'Offline'];

const StatusSelector = ({ memberId }) => {
  const dispatch = useDispatch();
  const currentStatus = useSelector(state =>
    state.members.list.find(m => m.id === memberId)?.status
  );

  const handleStatusChange = (status) => {
    dispatch(updateMemberStatus({ id: memberId, status }));
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {statuses.map(status => (
        <button
          key={status}
          onClick={() => handleStatusChange(status)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${
              currentStatus === status
                ? 'bg-pink-600 text-white ring-2 ring-pink-500'
                : 'bg-gray-900 text-pink-400 border border-gray-700 hover:bg-gray-800 hover:border-pink-500'
            }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusSelector;
