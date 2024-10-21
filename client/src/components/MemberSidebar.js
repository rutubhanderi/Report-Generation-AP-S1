import React, { useState } from 'react';
import { ChevronLeft, ClipboardList, Users, MessageSquare } from 'lucide-react';
import TaskOverview from './TaskOverview';


const MemberSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('tasks'); // Default to tasks
 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 
  const menuItems = [
    { 
      title: 'Task Overview', 
      icon: <ClipboardList size={20} />, 
      onClick: () => {
        setActiveSection('tasks');
        
      },
      id: 'tasks'
    },
    
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
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              className={`flex items-center space-x-4 text-white p-4 my-2 rounded-lg cursor-pointer transition-all hover:bg-blue-800 ${
                !isOpen && 'justify-center'
              } ${activeSection === item.id ? 'bg-blue-800' : ''}`}
            >
              
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeSection === 'tasks' && <TaskOverview />}
        
      </div>
    </div>
  );
};

export default MemberSidebar;