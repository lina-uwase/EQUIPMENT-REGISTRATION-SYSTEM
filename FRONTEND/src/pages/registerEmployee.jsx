import React, { useState } from "react";

function RegisterEmployee() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    nationalIdentity: "",
    telephone: "",
    email: "",
    department: "",
    position: "",
    laptopManufacturer: "",
    model: "",
    serialNumber: ""
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        nationalIdentity: "",
        telephone: "",
        email: "",
        department: "",
        position: "",
        laptopManufacturer: "",
        model: "",
        serialNumber: ""
      });
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.firstName) {
      errors.firstName = "First name is required";
    }
    if (!data.lastName) {
      errors.lastName = "Last name is required";
    }
    return errors;
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full mx-auto shadow-2xl rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 bg-white">
            <h1 className="text-2xl font-semibold mb-4">Register Employees</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="id" className="block text-xs font-medium text-gray-700">ID</label>
                <input
                  type="number"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700">First Name</label>
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
                <label htmlFor="lastName" className="block text-xs font-medium text-gray-700">Last Name</label>
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
                <label htmlFor="nationalIdentity" className="block text-xs font-medium text-gray-700">National Identity</label>
                <input
                  type="number"
                  id="nationalIdentity"
                  name="nationalIdentity"
                  value={formData.nationalIdentity}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label htmlFor="telephone" className="block text-xs font-medium text-gray-700">Telephone</label>
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
                <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
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
                <label htmlFor="department" className="block text-xs font-medium text-gray-700">Department</label>
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
                <label htmlFor="position" className="block text-xs font-medium text-gray-700">Position</label>
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
                <label htmlFor="laptopManufacturer" className="block text-xs font-medium text-gray-700">Laptop Manufacturer</label>
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
                <label htmlFor="model" className="block text-xs font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="serialNumber" className="block text-xs font-medium text-gray-700">Serial Number</label>
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
                <button type="submit" className="w-full px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
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
          </div>
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 text-white p-6">
            <div className="text-center">
              <p className="text-xl italic">"Rwanda TVET Board"</p>
              <p className="mt-2 text-sm">- Ease of work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEmployee;
