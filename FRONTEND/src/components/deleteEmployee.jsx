import React from "react";

const DeleteEmployeeButton = ({ employeeId, deleteEmployee }) => {
  return (
    <button
      onClick={() => deleteEmployee(employeeId)}
      className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
    >
      Delete
    </button>
  );
};

export default DeleteEmployeeButton;
