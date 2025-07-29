import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementTaskProgress,
  decrementTaskProgress,
} from '../redux/slices/membersSlice';

const TaskList = ({ memberId }) => {
  const dispatch = useDispatch();
  const member = useSelector(state =>
    state.members.list.find(m => m.id === memberId)
  );

  if (!member || member.tasks.length === 0) {
    return (
      <p className="text-pink-400 text-sm italic px-4 py-2 bg-black rounded-xl">
        No tasks assigned yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {member.tasks.map(task => (
        <div
          key={task.id}
          className="bg-gray-950/20 border-2 border-dashed  border-gray-700 rounded-2xl shadow-lg p-4 mb-8"
        >
          {/* Title & Due Date */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-semibold text-pink-400">
              {task.title}
            </h3>
            <span className="text-xs text-gray-400">
              Due: {task.dueDate}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 ease-in-out"
              style={{ width: `${task.progress}%` }}
            />
          </div>

          <p className="text-xs text-gray-400 mb-2">
            Progress: <span className="font-semibold text-pink-300">{task.progress}%</span>
          </p>

          {/* Progress Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() =>
                dispatch(decrementTaskProgress({ memberId, taskId: task.id }))
              }
              className="px-3 py-1 text-sm rounded border border-gray-700 bg-gray-900 hover:bg-gray-800 text-pink-300"
            >
              –10%
            </button>
            <button
              onClick={() =>
                dispatch(incrementTaskProgress({ memberId, taskId: task.id }))
              }
              className="px-3 py-1 text-sm rounded bg-pink-600 hover:bg-pink-700 text-pink-300"
            >
              +10%
            </button>
          </div>

          {/* Completed Tag */}
          {task.completed && (
            <p className="text-green-400 mt-3 font-medium text-sm">
              ✅ Task Completed
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
