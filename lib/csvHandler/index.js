const { initializeCSV } = require('./csvInitializer');
const { readCSV, addUser, updateUser, deleteUser, getStats } = require('./csvOperations');
const { appendToCSV, writeCSV } = require('./csvWriter');

module.exports = {
  initializeCSV,
  readCSV,
  addUser,
  appendToCSV,
  updateUser,
  deleteUser,
  getStats,
  writeCSV
};