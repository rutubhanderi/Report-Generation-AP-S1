import React from 'react';
import {
  ArrowLeft,
  Clock,
  CheckSquare,
  Square,
  AlignLeft,
} from 'lucide-react';

const ViewReport = ({ report, onBack, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const MetricItem = ({ icon: Icon, label, value, iconColor }) => (
    <div className="flex items-center gap-2">
      <Icon className={iconColor} size={20} />
      <div>
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        <p className="text-lg font-medium text-blue-900">{value}</p>
      </div>
    </div>
  );

  const Header = () => (
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
  );

  const StatusSection = () => (
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
  );

  const MetricsSection = () => (
    <div className="space-y-4">
      <MetricItem
        icon={Clock}
        label="Hours Worked"
        value={`${report.hoursWorked}h`}
        iconColor="text-blue-600"
      />
      <MetricItem
        icon={CheckSquare}
        label="Tasks Completed"
        value={report.tasksCompleted}
        iconColor="text-green-600"
      />
      <MetricItem
        icon={Square}
        label="Tasks Pending"
        value={report.tasksPending}
        iconColor="text-yellow-600"
      />
    </div>
  );

  const CommentsSection = () => (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-500">Comments</h3>
      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 whitespace-pre-wrap">{report.comments}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <Header />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusSection />
          <MetricsSection />
        </div>
        <CommentsSection />
      </div>
    </div>
  );
};

export default ViewReport;