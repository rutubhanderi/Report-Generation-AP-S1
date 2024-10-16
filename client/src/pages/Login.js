import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import backgroundImage from '../assets/loginbgap.png'; 

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [role, setRole] = useState('admin'); // Default role
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pass the role along with the login
    await loginWithRedirect({
      login_hint: credentials.email,  // Pre-populate email
      appState: { role },  // Store the role in appState for later redirection
    });
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <form className="bg-white p-8 rounded-3xl shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="role">Login as:</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
