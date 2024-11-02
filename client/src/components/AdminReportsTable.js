import React, { useState, useEffect } from 'react';
import { FileText, Eye, Printer, ArrowLeft, AlertCircle, Calendar, Clock, CheckSquare, AlertTriangle } from 'lucide-react';

const AdminReportsTable = () => {
  const [view, setView] = useState('table');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/volunteer');
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const { data } = await response.json();
      
      const transformedReports = data.map(report => ({
        id: report.report_id,
        name: report.report_name.trim(),
        status: report.report_status.trim(),
        description: report.report_description,
        comments: report.report_comments,
        date: new Date(report.date).toLocaleDateString(),
        tasksCompleted: report.task_completed,
        tasksPending: report.task_pending,
        totalHours: report.total_hours,
        volunteerId: report.volunteer_id,
        adminId: report.admin_id
      }));
      
      setReports(transformedReports);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (completed, pending) => {
    const total = completed + pending;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setView('view');
  };

  const handlePrintReport = (report) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print the report');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${report.name} - Report</title>
          <style>
            body { font-family: Arial; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; }
            .progress-bar { 
              width: 200px; 
              height: 20px; 
              background: #eee; 
              margin: 10px 0;
            }
            .progress-fill {
              height: 100%;
              background: #2563eb;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${report.name}</h1>
            <p>Report ID: ${report.id}</p>
          </div>
          <div class="section">
            <span class="label">Date:</span> ${report.date}
          </div>
          <div class="section">
            <span class="label">Status:</span> ${report.status}
          </div>
          <div class="section">
            <span class="label">Description:</span> ${report.description}
          </div>
          <div class="section">
            <span class="label">Tasks Progress:</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${getProgressPercentage(report.tasksCompleted, report.tasksPending)}%"></div>
            </div>
            <p>Completed: ${report.tasksCompleted} | Pending: ${report.tasksPending}</p>
          </div>
          <div class="section">
            <span class="label">Total Hours:</span> ${report.totalHours}
          </div>
          <div class="section">
            <span class="label">Comments:</span> ${report.comments}
          </div>
          <footer style="margin-top: 40px; font-size: 12px; color: #666;">
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </footer>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'view' && selectedReport) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setView('table');
                  setSelectedReport(null);
                }}
                className="p-2 hover:bg-blue-500 rounded-full transition-colors"
                aria-label="Back to reports"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold">{selectedReport.name}</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Date:</span> {selectedReport.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Total Hours:</span> {selectedReport.totalHours}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Status</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedReport.status)}`}>
                {selectedReport.status}
              </span>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{selectedReport.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Task Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-green-600" />
                  <span>Completed: {selectedReport.tasksCompleted}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Pending: {selectedReport.tasksPending}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(selectedReport.tasksCompleted, selectedReport.tasksPending)}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Comments</h3>
              <p className="text-gray-700">{selectedReport.comments}</p>
            </div>

            <button
              onClick={() => handlePrintReport(selectedReport)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer className="h-4 w-4" />
              Print Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" />
            REPORTS
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">ID</th>
                <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">NAME</th>
                <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">DATE</th>
                <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">STATUS</th>
                <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">PROGRESS</th>
                <th className="py-3 px-4 text-left font-semibold text-blue-800 border-b border-blue-100">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-blue-50 hover:bg-blue-50 transition-colors">
                  <td className="py-3 px-4 text-blue-900">{report.id}</td>
                  <td className="py-3 px-4 text-blue-900">{report.name}</td>
                  <td className="py-3 px-4 text-blue-900">{report.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(report.tasksCompleted, report.tasksPending)}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {getProgressPercentage(report.tasksCompleted, report.tasksPending)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="View Report"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handlePrintReport(report)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Print Report"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsTable;