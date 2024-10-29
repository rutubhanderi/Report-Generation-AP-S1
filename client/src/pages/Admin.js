import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Settings,
  UserPlus,
  Trash2,
  Eye,
  Download,
  UserCircle
} from 'lucide-react';
import Header from '../components/Header'
import UserManagement from '../components/UserManagement';
import AdminReportsTable from '../components/AdminReportsTable';
import Profile from '../components/Profile';

const Admins = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: '********' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: '********' },
];

// Main Dashboard Component
const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('profile'); // Changed default to 'profile'

  const renderContent = () => {
    switch(currentPage) {
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <AdminReportsTable />;
      case 'profile':
        return <Profile />;
      default:
        return <Profile />; // Changed default to Profile
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-500 mb-8">Admin Panel</h2>
          
          <nav className="space-y-2">
            {/* Profile button moved to top */}
            <button 
              onClick={() => setCurrentPage('profile')} 
              className={`w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg ${
                currentPage === 'profile' ? 'bg-gray-800' : ''
              }`}
            >
              <UserCircle size={20} className="text-blue-500" />
              <span>Profile</span>
            </button>

            <button 
              onClick={() => setCurrentPage('users')}
              className={`w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors ${
                currentPage === 'users' ? 'bg-gray-800' : ''
              }`}
            >
              <Users size={20} className="text-blue-500" />
              <span>User Management</span>
            </button>

            <button 
              onClick={() => setCurrentPage('reports')} 
              className={`w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg ${
                currentPage === 'reports' ? 'bg-gray-800' : ''
              }`}
            >
              <FileText size={20} className="text-blue-500" />
              <span>Reports</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Header/>
        <main className="p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
