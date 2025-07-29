import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole, setUser } from '../redux/slices/roleSlice';
import { updateMemberStatus } from '../redux/slices/membersSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);
  const members = useSelector(state => state.members.list);

  const handleSwitchRole = () => {
    dispatch(switchRole());
  };

  const handleUserChange = (e) => {
    const selectedUser = e.target.value;
    if (!selectedUser) return;
    dispatch(setUser(selectedUser));
    dispatch(switchRole());
    const matchedMember = members.find(m => m.name === selectedUser);
    if (matchedMember) {
      dispatch(updateMemberStatus({ id: matchedMember.id, status: 'Working' }));
    }
  };

  return (
    <header className="w-full px-6 py-4 bg-pink-950/30 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row justify-between items-center relative">
      {/* Left Section */}
      <div className="absolute left-6 gap-2 top-4 sm:static flex flex-col items-start">
        <h1 className="text-2xl font-semibold text-gray-100 tracking-tight">
          AppVersal
        </h1>
        <p className="text-sm text-gray-400">
          <span className="font-medium text-gray-300">Selected Team Member:</span> {currentUser}
        </p>
      </div>

      {/* Center Highlighted Title */}
      <div className="text-center flex justify-center items-center">
        <div className="bg-pink-800 px-5 py-2 rounded-xl shadow-md border border-pink-600">
          <h2 className="text-white font-bold text-lg sm:text-xl tracking-wide uppercase">
            {currentRole === 'Team Lead' ? 'Lead Portal' : 'Member Portal'}
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="absolute right-6 top-4 sm:static flex gap-3 items-center mt-4 sm:mt-0">
        {currentRole === 'Team Lead' && (
          <select
            onChange={handleUserChange}
            className="bg-pink-900/60 text-sm text-gray-100 border border-pink-700 hover:border-pink-500 focus:border-pink-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/50 shadow-md transition duration-200 ease-in-out"
            defaultValue=""
          >
            <option value="" disabled className="text-gray-400">Login as Team Member</option>
            {members.map(member => (
              <option key={member.id} value={member.name} className="text-gray-900 bg-pink-200">
                {member.name}
              </option>
            ))}
          </select>

        )}
        <button
          onClick={handleSwitchRole}
          className="bg-pink-700 hover:bg-pink-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-all shadow"
        >
          Switch Role
        </button>
      </div>
    </header>
  );
};

export default Header;
