import React from 'react';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-100 border-b border-gray-300">
        <div className="container mx-auto flex justify-between items-center p-4">
          <a className="text-xl font-bold" href="#">Admin Dashboard</a>
          <button className="md:hidden block text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:flex space-x-4">
            <a className="text-gray-700 hover:text-gray-900" href="#">Home</a>
            <a className="text-gray-700 hover:text-gray-900" href="#">Link</a>
            <div className="relative">
              <button className="text-gray-700 hover:text-gray-900">
                Dropdown
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <ul className="absolute hidden mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md">
                <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Action</a></li>
                <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Another action</a></li>
                <li><hr className="my-1 border-gray-200" /></li>
                <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Something else here</a></li>
              </ul>
            </div>
            <a className="text-gray-500 cursor-not-allowed" aria-disabled="true">Disabled</a>
          </div>
          <form className="hidden md:flex items-center space-x-2">
            <input className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="search" placeholder="Search" />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" type="submit">Search</button>
          </form>
        </div>
      </nav>

      {/* User Management Section */}
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <div className="space-y-4">
          {/* Buttons for Adding, Removing, and Updating Members/Volunteers */}
          <div className="space-x-2">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" 
              onClick={() => alert('Add Member/Volunteer')}>
              Add Member/Volunteer
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition" 
              onClick={() => alert('Remove Member/Volunteer')}>
              Remove Member/Volunteer
            </button>
            <button 
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition" 
              onClick={() => alert('Update Member/Volunteer')}>
              Update Member/Volunteer
            </button>
          </div>

          {/* Buttons for Assigning Roles and Permissions */}
          <div className="space-x-2">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition" 
              onClick={() => alert('Assign Roles')}>
              Assign Roles
            </button>
            <button 
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition" 
              onClick={() => alert('Assign Permissions')}>
              Assign Permissions
            </button>
          </div>
        </div>
      </div>

      {/* Other Admin Dashboard Components */}
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4">Reports and Analytics</h2>
        {/* Add further components like charts, graphs, and report generation here */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
