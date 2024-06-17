import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    try {
      await axios.post('http://localhost:5000/api/v1/users/register', {
        "email": formData.email,
        "password": formData.password,
        "confirmPassword":formData.confirmPassword
      });
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex  mx-auto shadow-lg rounded-lg overflow-hidden justify-center">
        <div className=" w-[30rem] p-8">
          <h2 className="text-xl font-semibold mb-6">Signup</h2>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create password</label>
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
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-[#078ECE] text-white rounded-md ">Sign Up</button>
            </div>
          </form>
          <p className="mt-4 text-sm">
            Already a user? <Link to="/login" className="text-indigo-600">Login</Link>
          </p>
        </div>
        <div className="w-[30rem] flex items-center justify-center bg-gradient-to-br bg-[#054D6F] text-white p-8">
          <div className="text-center">
            <p className="text-2xl italic">"Rwanda TVET Board"</p>
            <p className="mt-4">- Ease of work</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
// hover:bg-indigo-700
