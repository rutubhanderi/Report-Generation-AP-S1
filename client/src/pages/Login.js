import React, { useState } from 'react';
import { LogIn, Shield, Users, ChevronDown } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import backgroundImage from '../assets/loginbgap.png';

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState('admin');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Replace this with your actual authentication logic
      const isValid = credentials.email && credentials.password;
      
      if (isValid) {
        // Call the login function from AuthContext
        login({ 
          email: credentials.email, 
          role: role 
        });
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (userRole) => {
    switch (userRole) {
      case 'admin':
        return <Shield className="w-5 h-5" />;
      case 'volunteer':
        return <Users className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
      <div className="w-full max-w-md p-8">
        <form 
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" 
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <span className="text-red-800">{error}</span>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Login as:
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={handleRoleChange}
                className="w-full border border-gray-300 p-2 pl-10 pr-8 rounded appearance-none 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="admin">Admin</option>
               
                <option value="volunteer">Volunteer</option>
              </select>
              <span className="absolute left-3 top-2.5 text-gray-500">
                {getRoleIcon(role)}
              </span>
              <span className="absolute right-3 top-2.5 text-gray-500 pointer-events-none">
                <ChevronDown className="w-5 h-5" />
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg 
                     flex items-center justify-center gap-2 
                     hover:bg-blue-600 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn size={18} />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;