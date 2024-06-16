import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "../services/axios.config";
import EditEmployeeModal from "../components/editEmployee";
import DeleteEmployeeButton from "../components/deleteEmployee";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees/getAllEmployees");
      setEmployees(response.data.employeesData);
      console.log(response.data.employeesData);
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Handle error fetching data
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const startEditing = (employee) => {
    setEditingEmployee(employee);
  };

  const saveEdit = (updatedEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEditingEmployee(null);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-sm">
      <div className="bg-[#054D6F] w-full lg:w-2/12 p-2 flex flex-col lg:block">
        <div className="text-[#DCDCDC] flex flex-col justify-center  lg:flex-none p-12 gap-1 ">
          <div className="flex items-center gap-1">
            <MdDashboard className="mt-1" />
            <Link to="/Dashboard">Dashboard</Link>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <IoIosPeople className="mt-1" />
            <Link to="/Dashboard">Employees</Link>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <FaUserCircle className="mt-1" />
            <Link to="/Dashboard">Users</Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2  lg:mt-auto">
          <TbLogout2 className="mt-1 text-[#DCDCDC]" />
          <Link to="/Dashboard" className=" text-[#DCDCDC]">Logout</Link>
        </div>
      </div>
      <div className="w-full lg:w-10/12 p-2">
        <div className="flex justify-between items-center p-2 w-full">
          <button className="px-2 py-1 bg-[#078ECE] text-white rounded-md hover:bg-blue-600">
            <Link to="/registerEmployee">Add Employee</Link>
          </button>
          <div className="flex items-center">
            <div className="rounded-full h-6 w-6 bg-gray-300"></div>
            <p className="ml-1 text-gray-600">Username</p>
          </div>
        </div>
        <div className="max-w-4xl w-full mx-auto rounded-lg overflow-hidden mb-2 p-2 bg-white">
          <input
            type="text"
            placeholder="Search Employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-b border-gray-300 p-1 focus:outline-none"
          />
        </div>
        <div className="max-w-4xl w-full mx-auto rounded-lg overflow-hidden bg-white">
          <table className="min-w-full text-xs">
            <thead>
              <tr>
                <th className="px-2 py-1 border-b">ID</th>
                <th className="px-2 py-1 border-b">First Name</th>
                <th className="px-2 py-1 border-b">Last Name</th>
                <th className="px-2 py-1 border-b">Email</th>
                <th className="px-2 py-1 border-b">Department</th>
                <th className="px-2 py-1 border-b">Position</th>
                <th className="px-2 py-1 border-b">Laptop Manufacturer</th>
                <th className="px-2 py-1 border-b">Model</th>
                <th className="px-2 py-1 border-b">Serial Number</th>
                <th className="px-2 py-1 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 border-b">{employee.id}</td>
                  <td className="px-2 py-1 border-b">{employee.firstName}</td>
                  <td className="px-2 py-1 border-b">{employee.lastName}</td>
                  <td className="px-2 py-1 border-b">{employee.email}</td>
                  <td className="px-2 py-1 border-b">{employee.department}</td>
                  <td className="px-2 py-1 border-b">{employee.position}</td>
                  <td className="px-2 py-1 border-b">{employee.laptopManufacturer}</td>
                  <td className="px-2 py-1 border-b">{employee.model}</td>
                  <td className="px-2 py-1 border-b">{employee.serialNumber}</td>
                  <td className="px-2 py-1 border-b">
                    <button
                      onClick={() => startEditing(employee)}
                      className="px-1 py-1 bg-blue-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <DeleteEmployeeButton
                      employeeId={employee.id}
                      deleteEmployee={deleteEmployee}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editingEmployee && (
          <EditEmployeeModal
            employee={editingEmployee}
            saveEdit={saveEdit}
            closeModal={() => setEditingEmployee(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
