const { CSV_HEADERS } = require('./constants');

const parseCSV = (content) => {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length <= 1) return []; 
  
  const headers = lines[0].split(';').map(h => h.trim());
  const results = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';');
    const row = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] ? values[index].trim() : '';
    });
    
    if (row.ID && row.UID && row.ID !== 'ID') {
      results.push({
        id: row.ID,
        uid: row.UID,
        first_name: row['First Name'],
        last_name: row['Last Name'],
        username: row.Username,
        email: row.Email,
        phone_number: row['Phone Number'],
        date_of_birth: row['Date of Birth'],
        company: row.Company || '',
        created_at: row['Created At'] || new Date().toISOString()
      });
    }
  }
  
  return results;
};

const generateCSVContent = (records) => {
  const headerRow = CSV_HEADERS.join(';') + '\n';
  
  const dataRows = records.map(record => {
    return [
      record.id || '',
      record.uid || '',
      record.first_name || '',
      record.last_name || '',
      record.username || '',
      record.email || '',
      record.phone_number || '',
      record.date_of_birth || '',
      record.company || '',
      record.created_at || new Date().toISOString()
    ].join(';');
  }).join('\n');
  
  return headerRow + dataRows;
};

module.exports = {
  parseCSV,
  generateCSVContent
};