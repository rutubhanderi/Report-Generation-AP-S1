import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Importing the Home page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set Home as the default route */}
        <Route path="/" element={<Home />} />
        {/* Optional: Add a catch-all route for 404 pages */}
        <Route path="*" element={<Home />} /> {/* Redirect unknown paths to Home */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
