import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios.config';


function RegisterEmployee() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    nationalId: "",
    telephone: "",
    email: "",
    department:"",
    position: "",
    laptopManufacturer:"",
    model:"",
    serialNumber:""
  });

  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(""); // Add error state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('/employees/create', formData,config);
      if (response.status === 201) {
        console.log("user created");
      }
      navigate('/dashboard');
    } catch (error) {
      setError('An error occurred while registering the employee');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className=" w-5/5 mx-auto shadow-2xl rounded-lg overflow-hidden flex justify-center">
        <div className=" grid-cols-1 md:grid-cols-2 flex justify-center">
          <div className="p-6 bg-white">
            <h1 className="text-l font-semibold mb-4">Register Employees</h1>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 md:grid-cols-2 gap-3"
            >
              <div>
                <label
                  htmlFor="id"
                  className="block text-xs font-medium text-gray-700"
                >
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="nationalIdentity"
                  className="block text-xs font-medium text-gray-700"
                >
                  National Identity
                </label>
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="telephone"
                  className="block text-xs font-medium text-gray-700"
                >
                  Telephone
                </label>
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="emaill"
                  className="block text-xs font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-xs font-medium text-gray-700"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              
              <div>
                <label
                  htmlFor="position"
                  className="block text-xs font-medium text-gray-700"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="laptopManufacturer"
                  className="block text-xs font-medium text-gray-700"
                >
                 Laptop Manufacturer
                </label>
                <input
                  type="text"
                  id="laptopManufacturer"
                  name="laptopManufacturer"
                  value={formData.laptopManufacturer}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block text-xs font-medium text-gray-700"
                >
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="serialNumber"
                  className="block text-xs font-medium text-gray-700"
                >
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div className="col-span-2">
                <button onClick={handleSubmit}
                  type="submit"
                  className="w-full px-3 py-1 bg-[#078ECE] text-white rounded-md text-sm"
                >
                  Register
                </button>
              </div>
            </form>
            {Object.keys(formErrors).length > 0 && (
              <div className="text-red-500 mt-4 text-xs">
                {Object.values(formErrors).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>

            )}
            <div className=' text-sm text-red-200'>
              {error}
            </div>
          </div>
          {/* <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 text-white p-6">
            <div className="text-center">
              <p className="text-xl italic">"Rwanda TVET Board"</p>
              <p className="mt-2 text-sm">- Ease of work</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default RegisterEmployee;
