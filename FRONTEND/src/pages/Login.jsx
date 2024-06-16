import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/DisplayEmployee');
    } catch (error) {
      setError('Invalid email or password');
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex w-2/4  shadow-lg rounded-lg overflow-hidden justify-center">
        <div className="w-3/4 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-[#078ECE] text-white rounded-md">Login</button>
            </div>
          </form>
          <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-indigo-600">Signup</Link> </p>
        </div>
        {/* <div className="w-1/2 flex items-center justify-center bg-gradient-to-br bg-[#054D6F] text-white p-8">
          <div className="text-center">
            <p className="text-2xl italic">"Rwanda TVET Board"</p>
            <p className="mt-4">- Ease of work</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default Login;
