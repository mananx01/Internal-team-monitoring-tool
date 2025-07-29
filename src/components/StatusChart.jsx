import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  Working: '#34D399', // green
  Break: '#FBBF24',   // yellow
  Meeting: '#60A5FA', // blue
  Offline: '#9CA3AF', // gray
};

const StatusChart = () => {
  const members = useSelector(state => state.members.list);

  const statusCounts = members.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div className="bg-gray-950 border border-pink-500/40 text-pink-300 rounded-2xl p-4 shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-pink-400">Team Status Distribution</h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={90}
            dataKey="value"
          >
            {data.map(entry => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#EC4899', color: 'white' }}
            labelStyle={{ color: '#EC4899' }}
          />
          <Legend
            wrapperStyle={{ color: '#F9A8D4' }}
            iconType="circle"
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
