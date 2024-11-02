import React, { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  ArrowLeft,
  Save,
  FileText,
  AlignLeft,
} from "lucide-react";

const CreateReport = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    report_name: "",
    description: "",
    report_date: "",
    tasks_completed: "",
    tasks_pending: "",
    total_hours_worked: "",
    comments: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving report:", error);
      setIsSaved(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsSaved(false);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print the report");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Report - ${formData.report_name}</title>
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
            ${formData.report_date ? `<p>Date: ${formData.report_date}</p>` : ""}
          </div>
          
          <div class="section">
            <span class="label">Report Name:</span>
            ${formData.report_name || "Not specified"}
          </div>

          <div class="section">
            <span class="label">Description:</span>
            <div>${formData.description || "No description provided"}</div>
          </div>

          <div class="divider"></div>

          <div class="section">
            <span class="label">Tasks Completed:</span>
            ${formData.tasks_completed || "0"}
          </div>

          <div class="section">
            <span class="label">Tasks Pending:</span>
            ${formData.tasks_pending || "0"}
          </div>

          <div class="divider"></div>

          <div class="section">
            <span class="label">Total Hours Worked:</span>
            ${formData.total_hours_worked || "0"}
          </div>

          ${
            formData.comments
              ? `
            <div class="divider"></div>
            <div class="section">
              <span class="label">Additional Comments:</span>
              <div>${formData.comments}</div>
            </div>
          `
              : ""
          }
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
            onClick={onBack}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Reports
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Create New Report</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Report Name */}
          <div className="mb-6">
            <label className="block mb-2 flex items-center text-gray-700 font-medium">
              <FileText size={18} className="mr-2 text-blue-600" />
              Report Name
            </label>
            <input
              type="text"
              name="report_name"
              value={formData.report_name}
              onChange={handleChange}
              placeholder="Enter report name..."
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          {/* Report Description */}
          <div className="mb-6">
            <label className="block mb-2 flex items-center text-gray-700 font-medium">
              <AlignLeft size={18} className="mr-2 text-blue-600" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter report description..."
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[80px]"
              required
            />
          </div>

          {/* Report Date */}
          <div className="mb-6">
            <label className="block mb-2 flex items-center text-gray-700 font-medium">
              <Calendar size={18} className="mr-2 text-blue-600" />
              Report Date
            </label>
            <input
              type="date"
              name="report_date"
              value={formData.report_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          {/* Tasks Completed */}
          <div className="mb-6">
            <label className="block mb-2 flex items-center text-gray-700 font-medium">
              <CheckCircle size={18} className="mr-2 text-blue-600" />
              Tasks Completed
            </label>
            <input
              type="number"
              name="tasks_completed"
              value={formData.tasks_completed}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
              min="0"
            />
          </div>

          {/* Tasks Pending */}
          <div className="mb-6">
            <label className="block mb-2 flex items-center text-gray-700 font-medium">
              <AlertCircle size={18} className="mr-2 text-blue-600" />
              Tasks Pending
            </label>
            <input
              type="number"
              name="tasks_pending"
              value={formData.tasks_pending}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
              min="0"
            />
          </div>

          {/* Total Hours Worked */}
          <div className="mb-6">
            <label className="block mb-2 flex items-center text-gray-700 font-medium">
              <Clock size={18} className="mr-2 text-blue-600" />
              Total Hours Worked
            </label>
            <input
              type="number"
              name="total_hours_worked"
              value={formData.total_hours_worked}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
              min="0"
              step="0.5"
            />
          </div>

          {/* Comments */}
          <div className="mb-6">
            <label className="block mb-2 flex items-center text-gray-700 font-medium">
              <MessageSquare size={18} className="mr-2 text-blue-600" />
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px]"
              placeholder="Add any additional comments or notes..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Save size={18} className="mr-2" />
              Save Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReport;