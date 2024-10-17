import React from 'react';
import MemberSidebar from '../components/MemberSidebar';
import Header from '../components/Header';

const Member = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto">
        <MemberSidebar />
      </div>
    </div>
  );
};

export default Member;