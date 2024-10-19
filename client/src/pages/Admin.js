import React, { useState } from 'react';
import { 
  Users, 
  CheckSquare, 
  FileText, 
  BarChart2, 
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('users');

  // Components for different sections
  const UserManagement = () => (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users size={24} className="text-blue-500" />
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Add Member Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Add Member</h3>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Add New
          </button>
        </div>

        {/* Remove Member Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Remove Member</h3>
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Remove
          </button>
        </div>

        {/* Update Member Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Update Member</h3>
          <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
            Update
          </button>
        </div>

        {/* Roles & Permissions Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Roles & Permissions</h3>
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
            Manage
          </button>
        </div>
      </div>
    </div>
  );

  const TaskManagement = () => (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckSquare size={24} className="text-blue-500" />
        <h1 className="text-2xl font-bold">Task Management</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Task Management Content</h3>
        <p>Task management interface coming soon...</p>
      </div>
    </div>
  );

  const Reports = () => (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText size={24} className="text-blue-500" />
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Reports Content</h3>
        <p>Reports interface coming soon...</p>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart2 size={24} className="text-blue-500" />
        <h1 className="text-2xl font-bold">Analytics & Insights</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Analytics Content</h3>
        <p>Analytics interface coming soon...</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(currentPage) {
      case 'users':
        return <UserManagement />;
      case 'tasks':
        return <TaskManagement />;
      case 'reports':
        return <Reports />;
      case 'analytics':
        return <Analytics />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-500 mb-8">Admin Panel</h2>
          
          <nav className="space-y-2">
            {/* User Management */}
            <button 
              onClick={() => setCurrentPage('users')}
              className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Users size={20} className="text-blue-500" />
              <span>User Management</span>
            </button>

            {/* Task Management */}
            <button 
              onClick={() => setCurrentPage('tasks')} 
              className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg"
            >
              <CheckSquare size={20} className="text-blue-500" />
              <span>Task Management</span>
            </button>

            {/* Reports */}
            <button 
              onClick={() => setCurrentPage('reports')} 
              className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg"
            >
              <FileText size={20} className="text-blue-500" />
              <span>Reports</span>
            </button>

            {/* Analytics */}
            <button 
              onClick={() => setCurrentPage('analytics')} 
              className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg"
            >
              <BarChart2 size={20} className="text-blue-500" />
              <span>Analytics & Insights</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;