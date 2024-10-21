import React, { useState } from 'react';
import { FileText, Plus, Eye } from 'lucide-react';
import CreateReport from './CreateReport';
import ViewReport from './ViewReport';

const ReportsTable = () => {
  const [view, setView] = useState('table');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Q1 Financial Report',
      status: 'Completed',
      member: 'John Smith',
      date: '2024-01-15',
      tasksCompleted: '8',
      tasksPending: '2',
      hoursWorked: '40',
      rating: '4',
      comments: 'All major objectives were achieved ahead of schedule.'
    },
    {
      id: 2,
      name: 'Marketing Analysis',
      status: 'In Progress',
      member: 'Sarah Johnson',
      date: '2024-02-01',
      tasksCompleted: '5',
      tasksPending: '3',
      hoursWorked: '25',
      rating: '3',
      comments: 'Making steady progress on key deliverables.'
    },
    {
      id: 3,
      name: 'User Research Results',
      status: 'Pending',
      member: 'Mike Wilson',
      date: '2024-02-15',
      tasksCompleted: '2',
      tasksPending: '6',
      hoursWorked: '15',
      rating: '3',
      comments: 'Initial research phase completed, pending review.'
    }
  ]);

  const handleAddReport = (formData) => {
    const newReport = {
      id: reports.length + 1,
      name: formData.report_name,
      status: 'Pending',
      member: 'Current User',
      date: formData.report_date,
      tasksCompleted: formData.tasks_completed,
      tasksPending: formData.tasks_pending,
      hoursWorked: formData.total_hours_worked,
      rating: formData.performance_rating,
      comments: formData.comments
    };

    setReports([...reports, newReport]);
    setView('table');
  };

  const handleViewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report);
    setView('view');
  };

  const handleEditReport = (reportId) => {
    // Implement edit functionality here
    console.log('Editing report:', reportId);
  };

  // Render different views based on state
  if (view === 'create') {
    return <CreateReport onBack={() => setView('table')} onSubmit={handleAddReport} />;
  }

  if (view === 'view' && selectedReport) {
    return (
      <ViewReport
        report={selectedReport}
        onBack={() => {
          setView('table');
          setSelectedReport(null);
        }}
        onEdit={handleEditReport}
        isLoading={false}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header with Create Button */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText size={24} />
            REPORTS
          </h2>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            onClick={() => setView('create')}
          >
            <Plus size={16} />
            Create Report
          </button>
        </div>
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
                REPORT NAME
              </th>
              <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">
                STATUS
              </th>
              <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">
                MEMBER ASSIGNED
              </th>
              <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-blue-50 hover:bg-blue-50 transition-colors"
              >
                <td className="py-3 px-4 text-blue-900">{report.id}</td>
                <td className="py-3 px-4 text-blue-900">{report.name}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-blue-900">{report.member}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleViewReport(report.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="View Report"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;