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
  Plus,
  X,
  ListTodo,
  Printer,
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
    tasks: [],
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState("");
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

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setFormData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask.trim()],
      tasks_pending: prev.tasks_pending
        ? String(parseInt(prev.tasks_pending) + 1)
        : "1",
    }));

    setNewTask("");
    setShowTaskModal(false);
    setIsSaved(false);
  };

  const handleRemoveTask = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, index) => index !== indexToRemove),
      tasks_pending: String(
        Math.max(0, parseInt(prev.tasks_pending || "0") - 1)
      ),
    }));
    setIsSaved(false);
  };

  const handlePrint = () => {
    // Remove the isSaved check to allow printing even if not saved
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
            .tasks-list {
              margin-left: 20px;
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
            ${
              formData.report_date ? `<p>Date: ${formData.report_date}</p>` : ""
            }
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
            <span class="label">Tasks:</span>
            <div class="tasks-list">
              ${
                formData.tasks.length > 0
                  ? formData.tasks
                      .map((task) => `<div>• ${task}</div>`)
                      .join("")
                  : "No tasks added"
              }
            </div>
          </div>

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

    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  const TaskModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add New Task</h3>
          <button
            type="button"
            onClick={() => {
              setShowTaskModal(false);
              setNewTask("");
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleAddTask} className="space-y-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task name"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            autoFocus
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowTaskModal(false);
                setNewTask("");
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newTask.trim()}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );

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
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Report
            </h1>
            <button
              type="button"
              onClick={handlePrint}
              className={`flex items-center px-4 py-2 rounded transition-colors ${
                formData.report_name
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!formData.report_name}
            >
              <Printer size={18} className="mr-2" />
              Print Report
            </button>
          </div>
        </div>

        {/* Rest of the form remains unchanged */}
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

          {/* Tasks Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="flex items-center text-gray-700 font-medium">
                <ListTodo size={18} className="mr-2 text-blue-600" />
                Tasks
              </label>
              <button
                type="button"
                onClick={() => setShowTaskModal(true)}
                className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
              >
                <Plus size={16} className="mr-1" />
                Add Task
              </button>
            </div>

            {formData.tasks.length > 0 ? (
              <div className="space-y-2 mb-4">
                {formData.tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-gray-700">{task}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTask(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">No tasks added yet</p>
            )}
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

      {showTaskModal && <TaskModal />}
    </div>
  );
};

export default CreateReport;
