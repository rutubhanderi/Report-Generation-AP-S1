import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/Login';

import Volunteer from './pages/Volunteer';
import AdminDashboard from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set Home as the default route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Optional: Add a catch-all route for 404 pages */}
        <Route path="*" element={<Home />} /> {/* Redirect unknown paths to Home */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
