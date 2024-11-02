import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Briefcase, Award } from 'lucide-react';

const ProfileSection = () => {
  const [volunteerData, setVolunteerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const response = await fetch("http://localhost:3001/volunteer/volunteer/1"); // Default volunteer ID 1
        if (!response.ok) {
          throw new Error('Failed to fetch volunteer data');
        }
        const { data } = await response.json();
        const transformedData = {
          id: data.volunteer_id,
          name: data.volunteer_name.trim(),
          email: data.volunteer_email.trim(),
          address: data.volunteer_address,
          phone: data.volunteer_phone,
          join_date: data.date_of_joining,
       
        };
        setVolunteerData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, []);

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!volunteerData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative">
          No volunteer data found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-900 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-2xl font-bold">
              {volunteerData.name?.split(' ').map(n => n[0]).join('')}
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
                value={new Date(volunteerData.join_date).toLocaleDateString()}
              />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
