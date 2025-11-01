const fs = require('fs');
const path = require('path');

const CSV_FILE = path.join(process.cwd(), 'data', 'users.csv');
const CSV_HEADERS = ['ID', 'UID', 'First Name', 'Last Name', 'Username', 'Email', 'Phone Number', 'Date of Birth', 'Company', 'Created At'];

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

module.exports = {
  CSV_FILE,
  CSV_HEADERS,
  ensureDataDirectory
};