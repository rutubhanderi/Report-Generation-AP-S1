import React, { useState, useEffect } from 'react';
import { FileText, Plus, Eye, Printer, Edit } from 'lucide-react';
import CreateReport from './CreateReport';
import ViewReport from './ViewReport';
import EditReport from './EditReport';

const ReportsTable = () => {
  const [view, setView] = useState('table');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3001/volunteer';

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      
      const { data } = await response.json();
      const transformedData = data.map(report => ({
        id: report.report_id,
        name: report.report_name,
        status: report.report_status || 'Pending',
        date: report.date || new Date().toISOString().split('T')[0],
        tasksCompleted: report.task_completed || '0',
        tasksPending: report.task_pending || '0',
        hoursWorked: report.total_hours || '0',
        comments: report.report_comments || '',
        description: report.report_description || '',
        volunteerId: report.volunteer_id,
        adminId: report.admin_id
      }));
      
      setReports(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReport = async (formData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_id: reports.length + 1,
          report_name: formData.report_name,
          task_completed: formData.tasks_completed,
          task_pending: formData.tasks_pending,
          total_hours: formData.total_hours_worked,
          date: formData.report_date,
          volunteer_id: formData.volunteer_id || 1, // Default value if not provided
          report_description: formData.description || '',
          report_comments: formData.comments,
          report_status: 'Pending',
          admin_id: formData.admin_id || 1 // Default value if not provided
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create report');
      }

      const { data } = await response.json();
      setReports([...reports, {
        id: data[0].report_id,
        name: data[0].report_name,
        status: data[0].report_status,
        date: data[0].date,
        tasksCompleted: data[0].task_completed,
        tasksPending: data[0].task_pending,
        hoursWorked: data[0].total_hours,
        comments: data[0].report_comments,
        description: data[0].report_description,
        volunteerId: data[0].volunteer_id,
        adminId: data[0].admin_id
      }]);
      setView('table');
    } catch (err) {
      console.error('Failed to create report:', err);
      setError(err.message);
    }
  };

 

  const handleViewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
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
          <title>Report - ${report.name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              margin-right: 10px;
            }
            .divider {
              border-top: 1px solid #ccc;
              margin: 20px 0;
            }
            @media print {
              @page {
                margin: 2cm;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Report</h1>
            <p>Date: ${report.date}</p>
          </div>
          
          <div class="section">
            <span class="label">Report Name:</span>
            ${report.name}
          </div>

          <div class="section">
            <span class="label">Status:</span>
            ${report.status}
          </div>

          <div class="divider"></div>

          <div class="section">
            <span class="label">Tasks Completed:</span>
            ${report.tasksCompleted}
          </div>

          <div class="section">
            <span class="label">Tasks Pending:</span>
            ${report.tasksPending}
          </div>

          <div class="section">
            <span class="label">Hours Worked:</span>
            ${report.hoursWorked}
          </div>

          ${report.comments ? `
            <div class="divider"></div>
            <div class="section">
              <span class="label">Comments:</span>
              <div>${report.comments}</div>
            </div>
          ` : ''}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  const handleEditReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report);
    setView('edit');
  };

  const handleUpdateReport = async (updatedReport) => {
    try {
      const updatedReports = reports.map(report => 
        report.id === updatedReport.id ? updatedReport : report
      );
      setReports(updatedReports);
      setView('table');
    } catch (err) {
      console.error('Failed to update report:', err);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center">
        Loading reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

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
        onPrint={() => handlePrintReport(selectedReport)}
        isLoading={false}
      />
    );
  }

  if (view === 'edit' && selectedReport) {
    return (
      <EditReport
        report={selectedReport}
        onBack={() => {
          setView('table');
          setSelectedReport(null);
        }}
        onUpdate={handleUpdateReport}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
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
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleViewReport(report.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="View Report"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handlePrintReport(report)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Print Report"
                  >
                    <Printer size={18} />
                  </button>
                  <button
                    onClick={() => handleEditReport(report.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit Report"
                  >
                    <Edit size={18} />
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