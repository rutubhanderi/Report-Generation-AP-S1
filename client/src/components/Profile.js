import React from 'react';
import { Mail, Phone, MapPin, Calendar, Lock } from 'lucide-react';

const Profile = () => {
  // Using the existing admin data structure with added password
  const adminData = {
    name: 'Sarah Johnson',
    role: 'Volunteer',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: '123 Volunteer Street, Charity City, CC 12345',
    joinDate: 'January 15, 2024',
    password: 'Volunteer2024!' // Added password field
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Header Section with blue background */}
      <div className="bg-blue-600 text-white rounded-t-lg p-6 text-center">
        {/* Initial Circle */}
        <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
          {adminData.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        <h2 className="text-2xl font-bold mb-2">{adminData.name}</h2>
        <p className="text-lg">{adminData.role}</p>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white rounded-b-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8">
              <Mail className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{adminData.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8">
              <Phone className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{adminData.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8">
              <MapPin className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900">{adminData.address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8">
              <Calendar className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Joined Date</p>
              <p className="text-gray-900">{adminData.joinDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8">
              <Lock className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Password</p>
              <p className="text-gray-900">{adminData.password}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;