// VolunteerProgress.js
import React from 'react';

const VolunteerProgress = () => {
  // Sample data - replace with your actual data
  const tasks = [
    {
      id: 1,
      task: "Website Development",
      volunteerName: "John Doe",
      status: "In Progress"
    },
    {
      id: 2,
      task: "Content Writing",
      volunteerName: "Jane Smith",
      status: "Pending"
    }
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">TASK LIST</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-900">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                    SR NO
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                    TASK
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                    VOLUNTEER NAME
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.task}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.volunteerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                        ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No tasks available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProgress;