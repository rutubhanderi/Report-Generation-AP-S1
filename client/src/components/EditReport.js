import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  ArrowLeft,
  Save,
  FileText,
  AlignLeft,
} from "lucide-react";

const EditReport = ({ report, onBack, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: report.id,
    report_name: report.report_name || "",
    description: report.description || "",
    report_date: report.report_date || "",
    tasks_completed: report.tasks_completed || "",
    tasks_pending: report.tasks_pending || "",
    total_hours_worked: report.total_hours_worked || "",
    comments: report.comments || "",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate({
        id: formData.id,
        report_name: formData.report_name,
        description: formData.description,
        report_date: formData.report_date,
        tasks_completed: formData.tasks_completed,
        tasks_pending: formData.tasks_pending,
        total_hours_worked: formData.total_hours_worked,
        comments: formData.comments,
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving report:", error);
      setIsSaved(false);
      alert('Failed to save report: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsSaved(false);
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Report</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
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
              <input
                type="date"
                name="report_date"
                value={formData.report_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </label>
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
          <div className="flex justify-between items-center">
            <span className={`text-${isSaved ? 'green' : 'gray'}-500`}>
              {isSaved ? 'Report saved' : 'Changes not saved'}
            </span>
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

export default EditReport;