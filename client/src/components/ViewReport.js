import React, { useState } from 'react';
import { 
  ArrowLeft,
  Clock, 
  CheckSquare, 
  Square, 
  AlignLeft,
  ListTodo,
  CheckCircle,
  XCircle
} from 'lucide-react';


const ViewReport = ({ report, onBack, isLoading }) => {
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Reports
          </button>
        </div>
        <h1 className="text-2xl font-bold mt-4">{report.name}</h1>
        {report.description && (
          <p className="mt-2 text-blue-100 flex items-center gap-2">
            <AlignLeft size={16} />
            {report.description}
          </p>
        )}
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status and Assignment Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
                report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {report.status}
              </span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
              <p className="mt-1 text-lg font-medium text-blue-900">{report.member}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Report Date</h3>
              <p className="mt-1 text-lg font-medium text-blue-900">
                {new Date(report.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="text-blue-600" size={20} />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Hours Worked</h3>
                <p className="text-lg font-medium text-blue-900">{report.hoursWorked}h</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckSquare className="text-green-600" size={20} />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tasks Completed</h3>
                <p className="text-lg font-medium text-blue-900">{report.tasksCompleted}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Square className="text-yellow-600" size={20} />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tasks Pending</h3>
                <p className="text-lg font-medium text-blue-900">{report.tasksPending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <ListTodo className="text-blue-600" size={20} />
            <h3 className="text-sm font-medium text-gray-500">Tasks</h3>
          </div>
          
          {report.tasks && report.tasks.length > 0 ? (
            <div className="space-y-2 bg-gray-50 rounded-lg p-4">
              {report.tasks.map((task, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle className="text-green-500" size={18} />
                    ) : (
                      <XCircle className="text-gray-400" size={18} />
                    )}
                    <span className={`${task.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                      {task.name || task}
                    </span>
                  </div>
                  {task.dueDate && (
                    <span className="text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No tasks added to this report</p>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500">Comments</h3>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{report.comments}</p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ViewReport;