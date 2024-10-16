import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import EmployeeDashboard from './pages/EmployeeDashboard';
// import VolunteerDashboard from './pages/VolunteerDashboard';

function App() {
  const { user, isAuthenticated, loginWithRedirect, getIdTokenClaims, isLoading } = useAuth0();

  // Handle role-based redirection after login
  useEffect(() => {
    const redirectBasedOnRole = async () => {
      if (isAuthenticated) {
        const tokenClaims = await getIdTokenClaims();
        const userRole = tokenClaims['https://your-app-url/roles']; // Custom claim with role

        if (userRole === 'admin') {
          window.location.href = '/admin-dashboard'; // Redirect to Admin Dashboard
        } else if (userRole === 'member') {
          window.location.href = '/employee-dashboard'; // Redirect to Employee Dashboard
        } else if (userRole === 'volunteer') {
          window.location.href = '/volunteer-dashboard'; // Redirect to Volunteer Dashboard
        }
      }
    };

    redirectBasedOnRole();
  }, [isAuthenticated, getIdTokenClaims]);

  // Loading state while Auth0 is initializing
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if the user is not authenticated and trying to access secured routes
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        {/* <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        /> */}
        {/* <Route 
          path="/employee-dashboard" 
          element={
            <PrivateRoute>
              <EmployeeDashboard />
            </PrivateRoute>
          } 
        /> */}
        {/* <Route 
          path="/volunteer-dashboard" 
          element={
            <PrivateRoute>
              <VolunteerDashboard />
            </PrivateRoute>
          } 
        /> */}

        {/* Catch-all route for unknown paths, redirect to home or a 404 page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
