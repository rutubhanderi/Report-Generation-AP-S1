import React from 'react';
import { ArrowLeft, Edit2, Clock, CheckSquare, Square, Star, AlignLeft } from 'lucide-react';

const ViewReport = ({ report, onBack, onEdit, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

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
          <button
            onClick={() => onEdit(report.id)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit2 size={16} />
            Edit Report
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

        {/* Performance Rating */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500">Performance Rating</h3>
          <div className="flex items-center gap-1 mt-2">
            {renderStarRating(parseInt(report.rating))}
          </div>
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