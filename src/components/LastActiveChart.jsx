import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import dayjs from 'dayjs';

const LastActiveChart = () => {
  const members = useSelector(state => state.members.list);
  const now = Date.now();

  const data = members.map(member => {
    const minutesAgo = Math.floor((now - member.lastActive) / 60000);
    return {
      name: member.name.split(' ')[0], // First name only
      minutesAgo,
      status: minutesAgo > 10 ? 'Offline' : 'Online',
    };
  });

  const sortedData = [...data].sort((a, b) => a.minutesAgo - b.minutesAgo);

  return (
    <div className="w-full border border-pink-500/40 rounded-2xl bg-black transition-colors duration-300">
      <div className="bg-black dark:bg-gray-950 rounded-2xl shadow-md p-4 h-full">
        <h2 className="text-lg font-semibold text-pink-500 dark:text-pink-400 mb-4">
          Last Active (Minutes Ago)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis
              dataKey="minutesAgo"
              domain={[0, 'auto']}
              interval={0}
              tickFormatter={(min) => `${min} min`}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value, name, props) => {
                const isOffline = value > 10;
                return [`${value} min ago`, isOffline ? 'Status: Offline' : 'Status: Online'];
              }}
              labelFormatter={(label) => `Member: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="minutesAgo"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LastActiveChart;
