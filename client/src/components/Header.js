import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import aplogo from '../assets/aplogo.jpg';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <header className="flex justify-between items-center p-2 bg-white shadow-md">
      <div className="flex items-center">
      <a href="https://www.aksharpaaul.org/">
      <img src={aplogo} alt="Logo" className="w-[60px] h-[60px]" />


      </a>
        <div className="ml-2">
        <a href="https://www.aksharpaaul.org/">
        <h1 className="text-red-500 text-lg font-bold leading-tight">AKSHAR PAAUL</h1>
          <h3 className="text-blue-500 text-xs leading-tight">(अक्षर पाउल)</h3>
        </a>
        </div>
      </div>

      <div className="text-center flex-1">
        <Link to="/home">
          <h2 className="text-gray-700 text-xl font-semibold cursor-pointer">Report GenX</h2>
        </Link>
      </div>

      <button 
        onClick={handleLoginClick} 
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">
        Login
      </button>
    </header>
  );
};

export default Header;
