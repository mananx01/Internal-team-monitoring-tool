import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { assignTask } from '../redux/slices/membersSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const members = useSelector(state => state.members.list);

  const [selectedMember, setSelectedMember] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMember || !title || !dueDate) return;

    dispatch(assignTask({
      memberId: selectedMember,
      task: {
        id: nanoid(),
        title,
        dueDate,
        progress: 0,
        completed: false,
      },
    }));

    setSelectedMember('');
    setTitle('');
    setDueDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black border-2 border-dashed border-pink-500/40 text-pink-500 shadow-sm p-6 rounded-2xl space-y-4"
    >
      <h2 className="text-xl font-semibold text-pink-400">📋 Assign New Task</h2>

      <div>
        <label className="block text-sm font-medium text-pink-300 mb-1">
          Select Team Member
        </label>
        <select
          value={selectedMember}
          onChange={e => setSelectedMember(e.target.value)}
          className="w-full p-2 rounded-lg border border-pink-500/20 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">-- Choose Member --</option>
          {members.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-pink-300 mb-1">
          Task Title
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full p-2 rounded-lg border border-pink-500/20 bg-black text-gray-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-pink-300 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="w-full p-2 rounded-lg border border-pink-500/20 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-gray-300 font-medium py-2 rounded-lg transition-all"
        >
          ➕ Assign Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
