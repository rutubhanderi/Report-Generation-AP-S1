import React, { useState } from 'react';
import { X, Plus, ListTodo } from 'lucide-react';

const EditReportModal = ({ report, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: report?.name || '',
    description: report?.description || '',
    status: report?.status || 'Pending',
    member: report?.member || '',
    date: report?.date || '',
    hoursWorked: report?.hoursWorked || 0,
    tasksCompleted: report?.tasksCompleted || 0,
    tasksPending: report?.tasksPending || 0,
    comments: report?.comments || '',
    tasks: report?.tasks || []
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, {
        name: newTask.trim(),
        completed: false
      }],
      tasksPending: prev.tasksPending + 1
    }));
    
    setNewTask('');
    setShowTaskModal(false);
  };

  const handleRemoveTask = (indexToRemove) => {
    setFormData(prev => {
      const task = prev.tasks[indexToRemove];
      return {
        ...prev,
        tasks: prev.tasks.filter((_, index) => index !== indexToRemove),
        tasksPending: task.completed ? prev.tasksPending : prev.tasksPending - 1,
        tasksCompleted: task.completed ? prev.tasksCompleted - 1 : prev.tasksCompleted
      };
    });
  };

  const toggleTaskCompletion = (index) => {
    setFormData(prev => {
      const newTasks = [...prev.tasks];
      const task = newTasks[index];
      task.completed = !task.completed;
      
      return {
        ...prev,
        tasks: newTasks,
        tasksCompleted: task.completed ? prev.tasksCompleted + 1 : prev.tasksCompleted - 1,
        tasksPending: task.completed ? prev.tasksPending - 1 : prev.tasksPending + 1
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...report,
      ...formData
    });
    onClose();
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
              setNewTask('');
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
                setNewTask('');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Report</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Existing form fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Report Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Tasks Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
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
                    <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                      {formData.tasks.map((task, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTaskCompletion(index)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className={`${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                              {task.name}
                            </span>
                          </div>
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
                    <p className="text-gray-500 text-sm italic">No tasks added to this report</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <input
                      type="text"
                      value={formData.member}
                      onChange={(e) => handleChange('member', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={formData.date.split('T')[0]}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hours Worked</label>
                    <input
                      type="number"
                      value={formData.hoursWorked}
                      onChange={(e) => handleChange('hoursWorked', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Comments</label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => handleChange('comments', e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && <TaskModal />}
    </div>
  );
};

export default EditReportModal;