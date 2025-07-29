export default function MemberCard({ member }) {
  const activeTasks = member.tasks.filter(t => t.progress < 100);
  const completedTasks = member.tasks.filter(t => t.progress === 100);

  const statusColor = {
    Working: 'bg-green-700',
    Break: 'bg-yellow-700',
    Meeting: 'bg-blue-700',
    Offline: 'bg-gray-700',
  }[member.status];

  const totalProgress = member.tasks.reduce((sum, task) => sum + task.progress, 0);
  const totalTasks = member.tasks.length;
  const completionRate = totalTasks > 0 ? Math.round(totalProgress / totalTasks) : 0;

  return (
    <div className="bg-gray-950 border border-pink-500/40 p-4 rounded-2xl shadow text-pink-100 flex flex-col gap-3 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <span className={`text-xs text-white px-2 py-1 rounded-full ${statusColor}`}>
          {member.status}
        </span>
      </div>

      {/* Radial Progress & Stats */}
      <div className="flex items-center gap-4">
        {/* Circular Progress using Tailwind only */}
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(203, 213, 225, 0.2)"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#22c55e"
              strokeWidth="10"
              fill="none"
              strokeDasharray="282.74"
              strokeDashoffset={282.74 - (completionRate / 100) * 282.74}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
            {completionRate}%
          </div>
        </div>

        {/* Task Stats Summary */}
        <div className="text-sm">
          <div className="text-pink-300 font-medium mb-1">Tasks</div>
          <div className="flex items-center gap-2">
            <span className="text-white">🟣 {activeTasks.length} Active</span>
            <span className="text-white">✅ {completedTasks.length} Done</span>
          </div>
          <div className="text-white text-xs mt-1">📌 {totalTasks} Total</div>
        </div>
      </div>
    </div>
  );
}
