const fs = require('fs');
const { CSV_FILE, ensureDataDirectory } = require('./constants');
const { generateCSVContent } = require('./csvParser');
const { readCSV } = require('./csvOperations');

const writeCSV = async (records) => {
  try {
    ensureDataDirectory();
    
    console.log(`Gravando ${records.length} registros no arquivo CSV...`);
    
    const fullContent = generateCSVContent(records);
    fs.writeFileSync(CSV_FILE, fullContent, 'utf8');
    
    console.log(` ${records.length} registros gravados com sucesso no arquivo CSV`);
    return records.length;
  } catch (error) {
    console.error('Erro ao gravar no arquivo CSV:', error);
    throw error;
  }
};

const appendToCSV = async (user) => {
  try {
    ensureDataDirectory();
  
    const existingRecords = await readCSV();
    console.log(`Foram encontrados ${existingRecords.length} registros existentes`);
    
    const maxId = existingRecords.length > 0 
      ? Math.max(...existingRecords.map(r => parseInt(r.id) || 0))
      : 0;
    
    const newId = maxId + 1;
    
    const newUser = {
      id: newId.toString(),
      uid: user.uid,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      username: user.username || '',
      email: user.email || '',
      phone_number: user.phone_number || '',
      date_of_birth: user.date_of_birth || '',
      company: user.company || '',
      created_at: new Date().toISOString()
    };
       
    const allRecords = [...existingRecords, newUser];
    
    await writeCSV(allRecords);
    
    return newUser;
  } catch (error) {
    console.error('Erro ao adicionar dados no arquivo CSV:', error);
    throw error;
  }
};

module.exports = {
  writeCSV,
  appendToCSV
};