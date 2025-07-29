import React from 'react';
import { useSelector } from 'react-redux';

const TeamSummary = () => {
  const members = useSelector(state => state.members.list);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Team Task Completion Summary</h2>

      {members.map(member => {
        const totalTasks = member.tasks?.length || 0;
        const totalProgress = member.tasks?.reduce((acc, task) => acc + (task.progress || 0), 0) || 0;
        const averageProgress = totalTasks > 0 ? Math.round(totalProgress / totalTasks) : 0;

        return (
          <div key={member.id} className="mb-4 p-3 border rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-sm text-gray-600">{totalTasks} task{totalTasks !== 1 ? 's' : ''} assigned</p>
              </div>

              <div className="w-1/2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all"
                    style={{ width: `${averageProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-right text-gray-700 mt-1">{averageProgress}% complete</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamSummary;
