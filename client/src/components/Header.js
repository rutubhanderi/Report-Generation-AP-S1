import React from 'react';
import styles from './Header.module.css';
import aplogo from '../assets/aplogo.jpg';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-2 bg-white shadow-md">
      <div className="flex items-center">
        <img src={aplogo} alt="Logo" className={styles.logo} />
        <div className="ml-2">
          <h1 className="text-red-500 text-lg font-bold leading-tight">AKSHAR PAAUL</h1>
          <h3 className="text-blue-500 text-xs leading-tight">(अक्षर पाउल)</h3>
        </div>
      </div>
      <nav className="flex space-x-4">
        <a href="/" className="text-gray-800 hover:text-gray-600 text-sm">Home</a>
        <a href="/create-report" className="text-gray-800 hover:text-gray-600 text-sm">Create Report</a>
        <a href="/view-report" className="text-gray-800 hover:text-gray-600 text-sm">View Report</a>
      </nav>
      <button className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm">Login</button>
    </header>
  );
};

export default Header;