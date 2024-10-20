import React, { useState } from 'react';
import { 
  Calendar,
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Star, 
  MessageSquare, 
  ArrowLeft, 
  Save,
  FileText 
} from 'lucide-react';

const CreateReport = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    report_name: '',
    report_date: '',
    tasks_completed: '',
    tasks_pending: '',
    total_hours_worked: '',
    performance_rating: '',
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
            onClick={onBack}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Reports
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Create New Report</h1>
        </div>

        {/* Form */}
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

          {/* Rest of the form fields remain the same */}
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

          {/* Performance Rating */}
          <div className="mb-6">
            <label className="block mb-2 flex items-center text-gray-700 font-medium">
              <Star size={18} className="mr-2 text-blue-600" />
              Performance Rating
            </label>
            <select
              name="performance_rating"
              value={formData.performance_rating}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select rating</option>
              <option value="5">Excellent (5)</option>
              <option value="4">Good (4)</option>
              <option value="3">Average (3)</option>
              <option value="2">Below Average (2)</option>
              <option value="1">Poor (1)</option>
            </select>
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