import React, { useState } from 'react';
import { ChevronLeft, ClipboardList, Users, MessageSquare } from 'lucide-react';
import TaskOverview from './TaskOverview';
import VolunteerProgress from './VolunteerProgress';

const MemberSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('tasks'); // Default to tasks
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleFeedbackClick = () => {
    setShowFeedback(true);
    setActiveSection('feedback');
  };

  const menuItems = [
    { 
      title: 'Task Overview', 
      icon: <ClipboardList size={20} />, 
      onClick: () => {
        setActiveSection('tasks');
        setShowFeedback(false);
      },
      id: 'tasks'
    },
    { 
      title: 'Volunteer Progress', 
      icon: <Users size={20} />, 
      onClick: () => {
        setActiveSection('volunteers');
        setShowFeedback(false);
      },
      id: 'volunteers'
    },
    { 
      title: 'Feedback', 
      icon: <MessageSquare size={20} />, 
      onClick: handleFeedbackClick,
      id: 'feedback'
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
              <div className="text-white">{item.icon}</div>
              {isOpen && (
                <span className="font-medium tracking-wide">{item.title}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeSection === 'tasks' && <TaskOverview />}
        {activeSection === 'volunteers' && <VolunteerProgress />}
        {showFeedback && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 m-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              We Value Your Feedback
            </h3>
            <textarea
              className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all outline-none"
              placeholder="Share your thoughts with us..."
            />
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSidebar;