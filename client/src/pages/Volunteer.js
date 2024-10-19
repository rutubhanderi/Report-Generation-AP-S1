import React from 'react';
import Header from '../components/Header';
import VolunteerSidebar from '../components/VolunteerSidebar';

const Volunteer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto">
        <VolunteerSidebar />
      </div>
    </div>
  );
};

export default Volunteer;