import React from 'react';
import { Mail, Phone, MapPin, Calendar, Briefcase, Award } from 'lucide-react';

const ProfileSection = () => {
  // This would typically come from your data/API
  const volunteerData = {
    name: "Sarah Johnson",
    age: 28,
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    address: "123 Volunteer Street, Charity City, CC 12345",
    joinDate: "January 15, 2024",
    occupation: "Software Engineer",
    skills: ["Project Management", "Event Planning", "Teaching", "First Aid"],
    volunteeredHours: 156,
    assignedProjects: 12
  };

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3 mb-4">
      <div className="text-blue-900">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-900 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-2xl font-bold">
              {volunteerData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{volunteerData.name}</h1>
              <p className="text-blue-200">Volunteer</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow 
                icon={<Mail size={20} />}
                label="Email"
                value={volunteerData.email}
              />
              <InfoRow 
                icon={<Phone size={20} />}
                label="Phone"
                value={volunteerData.phone}
              />
              <InfoRow 
                icon={<MapPin size={20} />}
                label="Address"
                value={volunteerData.address}
              />
              <InfoRow 
                icon={<Calendar size={20} />}
                label="Joined Date"
                value={volunteerData.joinDate}
              />
              <InfoRow 
                icon={<Briefcase size={20} />}
                label="Occupation"
                value={volunteerData.occupation}
              />
              <InfoRow 
                icon={<Award size={20} />}
                label="Age"
                value={`${volunteerData.age} years`}
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {volunteerData.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Volunteer Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-900 text-sm">Total Hours Volunteered</p>
                <p className="text-2xl font-bold text-blue-900">{volunteerData.volunteeredHours} hours</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-900 text-sm">Projects Participated</p>
                <p className="text-2xl font-bold text-blue-900">{volunteerData.assignedProjects} projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;