import React, { useState } from 'react';
import { ChevronLeft, UserCircle, BarChart, Clock } from 'lucide-react';
import ProfileSection from './ProfileSection';
import ReportsTable from './ReportsTable';


const VolunteerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { title: 'Profile', icon: <UserCircle size={20} />, id: 'profile' },
    { title: 'Reports', icon: <BarChart size={20} />, id: 'reports' },
    
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-blue-900 shadow-lg ${
          isOpen ? 'w-64' : 'w-20'
        } relative`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-3 top-8 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors"
          onClick={toggleSidebar}
        >
          <ChevronLeft
            className={`transition-transform duration-300 text-blue-900 ${
              !isOpen ? 'rotate-180' : ''
            }`}
            size={20}
          />
        </button>

        {/* Sidebar Content */}
        <div className="pt-20 px-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-4 text-white p-4 my-2 rounded-lg cursor-pointer transition-all hover:bg-blue-800 w-full ${
                !isOpen && 'justify-center'
              } ${activeSection === item.id ? 'bg-blue-800' : ''}`}
            >
              <div className="text-white">{item.icon}</div>
              {isOpen && (
                <span className="font-medium tracking-wide">{item.title}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'reports' && <ReportsTable />}
        
      </div>
    </div>
  );
};

export default VolunteerSidebar;
