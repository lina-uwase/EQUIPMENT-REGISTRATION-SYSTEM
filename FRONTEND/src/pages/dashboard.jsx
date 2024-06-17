import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "../services/axios.config";
import EditEmployeeModal from "../components/editEmployee";
import DeleteEmployeeButton from "../components/deleteEmployee";
import SearchField from "../components/search";
import RegisterEmployee from "./registerEmployee";

function Dashboard() {
  // const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees/getAllEmployees");
      setData(response.data.employeesData);
      console.log(response.data.employeesData);
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Handle error fetching data
    }
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = data.filter((employee) => employee.id !== id);
    setData(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const startEditing = (employee) => {
    setEditingEmployee(employee);
  };

  const saveEdit = (updatedEmployee) => {
    const updatedEmployees = data.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setData(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEditingEmployee(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPaginatedEmployees = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
    {showAdd && <RegisterEmployee onClose={() => setShowAdd(false)} />}
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="bg-[#054D6F] w-full lg:w-2/12 p-2 flex flex-col lg:block">
          <div className="text-[#DCDCDC] flex flex-col justify-center lg:flex-none p-12 gap-1 ">
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
          <div className="flex items-center justify-center gap-2 lg:mt-auto">
            <TbLogout2 className="mt-1 text-[#DCDCDC]" />
            <Link to="/Logout" className="text-[#DCDCDC]">
              Logout
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-10/12 p-2">
          <div className="flex justify-between items-center p-2 w-full">
            <button
              onClick={() => setShowAdd(true)}
              className="px-2 py-1 bg-[#078ECE] text-white rounded-md hover:bg-blue-600"
            >
              Add Employee
            </button>
            <div className="flex items-center">
              <div className="rounded-full h-6 w-6 bg-gray-300"></div>
              <p className="ml-1 text-gray-600">Username</p>
            </div>
          </div>
          <div className="max-w-4xl w-full mx-auto rounded-lg overflow-hidden mb-2 p-2 bg-white">
            <SearchField
              searchQuery={searchQuery}
              handleSearch={handleSearch}
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
              <tbody data={getPaginatedEmployees()}>
                {getPaginatedEmployees().map((employee, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1 border-b">{employee.id}</td>
                    <td className="px-2 py-1 border-b">{employee.firstName}</td>
                    <td className="px-2 py-1 border-b">{employee.lastName}</td>
                    <td className="px-2 py-1 border-b">{employee.email}</td>
                    <td className="px-2 py-1 border-b">
                      {employee.department}
                    </td>
                    <td className="px-2 py-1 border-b">{employee.position}</td>
                    <td className="px-2 py-1 border-b">
                      {employee.laptopManufacturer}
                    </td>
                    <td className="px-2 py-1 border-b">{employee.model}</td>
                    <td className="px-2 py-1 border-b">
                      {employee.serialNumber}
                    </td>
                    <td className="px-2 py-1 border-b">
                      <button
                        onClick={() => startEditing(employee)}
                        className="px-1 py-1 bg-[#078ECE] text-white rounded-md"
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
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 bg-gray-300 rounded-md mx-1"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-2 py-1 rounded-md mx-1 ${
                    currentPage === index + 1
                      ? "bg-[#078ECE] text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 bg-gray-300 rounded-md mx-1"
              >
                Next
              </button>
            </div>
          )}
          {editingEmployee && (
            <EditEmployeeModal
              employee={editingEmployee}
              saveEdit={saveEdit}
              closeModal={() => setEditingEmployee(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
