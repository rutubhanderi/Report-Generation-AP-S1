import React from 'react';
import { FileText } from 'lucide-react';

const TimeLogTable = () => {
  const timeLogs = [
    {
      id: 1,
      taskName: 'Client Meeting',
      timeTaken: '2 hours'
    },
    {
      id: 2,
      taskName: 'Documentation',
      timeTaken: '3.5 hours'
    },
    {
      id: 3,
      taskName: 'Project Review',
      timeTaken: '1.5 hours'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText size={24} />
          TIME LOGS
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">
                SR NO
              </th>
              <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">
                TASK NAME
              </th>
              <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">
                TIME TAKEN
              </th>
            </tr>
          </thead>
          <tbody>
            {timeLogs.map((log) => (
              <tr 
                key={log.id}
                className="border-b border-blue-50 hover:bg-blue-50 transition-colors"
              >
                <td className="py-3 px-4 text-blue-900">{log.id}</td>
                <td className="py-3 px-4 text-blue-900">{log.taskName}</td>
                <td className="py-3 px-4 text-blue-900">{log.timeTaken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeLogTable;