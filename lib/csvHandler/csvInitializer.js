const fs = require('fs');
const { CSV_FILE, CSV_HEADERS, ensureDataDirectory } = require('./constants');

const initializeCSV = async () => {
  try {
    ensureDataDirectory();
    
    if (!fs.existsSync(CSV_FILE)) {
      const headerRow = CSV_HEADERS.join(';') + '\n';
      fs.writeFileSync(CSV_FILE, headerRow, 'utf8');
      console.log('Arquivo CSV inicializado:', CSV_FILE);
    }
  } catch (error) {
    console.error('Erro ao inicializar o arquivo CSV inicializado:', error);
    throw error;
  }
};

module.exports = {
  initializeCSV
};