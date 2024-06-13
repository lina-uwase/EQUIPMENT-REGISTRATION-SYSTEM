const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  nationalIdentity: String,
  telephone: String,
  email: String,
  department: String,
  position: String,
  laptopManufacturer: String,
  model: String,
  serialNumber: String
});

module.exports = mongoose.model('Employee', EmployeeSchema);
