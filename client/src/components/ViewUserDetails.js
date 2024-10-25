import React from 'react';
import { Mail, Phone, MapPin, Calendar, Lock } from 'lucide-react';

const ViewUserDetails = ({ user, onClose }) => {
  // Default avatar text from user's initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with blue background */}
      <div className="bg-blue-900 p-6 relative">
        {/* Avatar circle with initials */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {getInitials(user.name)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-blue-200">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Contact Information</h3>
        
        <div className="space-y-4">
          {/* Password */}
          <div className="flex items-center gap-3">
            <Lock className="text-blue-900 w-5 h-5" />
            <div>
              <p className="text-gray-600 text-sm">Password</p>
              <p className="text-gray-900">{user.password || 'No password set'}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-blue-900 w-5 h-5" />
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="text-blue-900 w-5 h-5" />
            <div>
              <p className="text-gray-600 text-sm">Phone</p>
              <p className="text-gray-900">{user.phone}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-900 w-5 h-5" />
            <div>
              <p className="text-gray-600 text-sm">Address</p>
              <p className="text-gray-900">{user.address}</p>
            </div>
          </div>

          {/* Joined Date */}
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-900 w-5 h-5" />
            <div>
              <p className="text-gray-600 text-sm">Joined Date</p>
              <p className="text-gray-900">{user.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Close button */}
      <div className="px-6 pb-6">
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewUserDetails;