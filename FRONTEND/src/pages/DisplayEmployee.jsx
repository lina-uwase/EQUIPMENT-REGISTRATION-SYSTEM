import React, { useState, useEffect } from "react";

function DisplayEmployee() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch employees from local storage
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees
    .filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const startEditing = (employee) => {
    setEditingEmployee(employee);
  };

  const saveEdit = (updatedEmployee) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEditingEmployee(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex justify-between w-full p-4 items-center">
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 bg-gray-300"></div>
          <p className="ml-2 text-gray-600">Username</p>
        </div>
        <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">Add Employee</button>
      </div>

      <div className="max-w-4xl w-full mx-auto rounded-lg overflow-hidden mb-4 p-4 bg-white">
        <input 
          type="text"
          placeholder="Search Employees"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-b border-gray-300 p-2 focus:outline-none"
        />
      </div>

      <div className="max-w-4xl w-full mx-auto rounded-lg overflow-hidden bg-white p-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>
                  <button onClick={() => startEditing(employee)}>Edit</button>
                  <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          employeesPerPage={employeesPerPage}
          totalEmployees={employees.length}
          paginate={paginate}
        />
      </div>

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          saveEdit={saveEdit}
          closeModal={() => setEditingEmployee(null)}
        />
      )}
    </div>
  );
}

// Pagination Component
const Pagination = ({ employeesPerPage, totalEmployees, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Edit Employee Modal Component
const EditEmployeeModal = ({ employee, saveEdit, closeModal }) => {
  const [formData, setFormData] = useState({ ...employee });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEdit(formData);
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={closeModal}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DisplayEmployee;
