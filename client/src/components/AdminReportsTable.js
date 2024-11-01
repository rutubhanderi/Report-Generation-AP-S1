import React, { useState } from 'react';
import { FileText, Eye, Printer } from 'lucide-react';
import ViewReport from './ViewReport';

const AdminReportsTable = () => {
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

  

  const handleViewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report);
    setView('view');
  };

  const handlePrintReport = (report) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print the report");
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

          <div class="section">
            <span class="label">Member Assigned:</span>
            ${report.member}
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

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-8">
      {/* Header with Create Button */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText size={24} />
            REPORTS
          </h2>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportsTable;