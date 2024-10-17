// TaskOverview.js
import React from 'react';

const StatsCard = ({ title, items }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full">
    <h2 className="text-xl font-semibold text-blue-900 mb-4">{title}</h2>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-gray-700">{index + 1}. {item.label}</span>
          <span className="text-blue-900 font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const TaskOverview = () => {
  const tasks = [
    { label: 'PENDING', value: '0' },
    { label: 'UNDER REVIEW', value: '0' },
    { label: 'COMPLETED', value: '0' },
  ];

  const volunteers = [
    { label: 'ASSIGNED', value: '0' },
    { label: 'UNASSIGNED', value: '0' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <StatsCard title="NO OF TASKS" items={tasks} />
      <StatsCard title="NO OF VOLUNTEERS" items={volunteers} />
    </div>
  );
};

export default TaskOverview;