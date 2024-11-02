import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Lock, Loader } from 'lucide-react';

const Profile = ({ adminId }) => {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/admin/${adminId}`);
        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.error);
        }
        
        setAdminData(result.data[0]); // Assuming the API returns an array with one admin
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (adminId) {
      fetchAdminData();
    }
  }, [adminId]);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-600">
        Error loading profile: {error}
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="w-full p-4 text-center">
        No admin data found
      </div>
    );
  }

  const initials = adminData.admin_name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Header Section with blue background */}
      <div className="bg-blue-600 text-white rounded-t-lg p-6 text-center">
        {/* Initial Circle */}
        <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
          {initials}
        </div>
        
        <h2 className="text-2xl font-bold mb-2">{adminData.admin_name}</h2>
        <p className="text-lg">Administrator</p>
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
              <p className="text-gray-900">{adminData.admin_email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8">
              <Phone className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{adminData.admin_phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8">
              <MapPin className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900">{adminData.admin_address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8">
              <Calendar className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Joined Date</p>
              <p className="text-gray-900">{new Date(adminData.date_of_joining).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8">
              <Lock className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Password</p>
              <p className="text-gray-900">••••••••</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;