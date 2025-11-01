const fs = require('fs');
const { CSV_FILE } = require('./constants');
const { parseCSV } = require('./csvParser');
const { writeCSV } = require('./csvWriter');
const { initializeCSV } = require('./csvInitializer');

const readCSV = async () => {
  try {
    if (!fs.existsSync(CSV_FILE)) {
      return [];
    }

    const content = fs.readFileSync(CSV_FILE, 'utf8');
    const records = parseCSV(content);
    
    return records;
  } catch (error) {
    console.error('Erro ao ler o arquivo CSV:', error);
    return [];
  }
};

const addUser = async (user) => {
  try {
    await initializeCSV();
    const records = await readCSV();
    
    const maxId = records.length > 0 
      ? Math.max(...records.map(r => parseInt(r.id) || 0)) 
      : 0;
    
    const newUser = {
      id: (maxId + 1).toString(),
      uid: user.uid || user.id || `user-${Date.now()}`, 
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth
    };
    
    records.push(newUser);
    
    await writeCSV(records);
    return newUser;
  } catch (error) {
    console.error('Erro ao adicionar usuário ao arquivo CSV:', error);
    throw error;
  }
};

const updateUser = async (id, updatedUser) => {
  try {
    const records = await readCSV();
    
    const index = records.findIndex(record => record.id === id.toString());
    
    if (index === -1) {
      throw new Error(`Usuário com ID não encontrado!`);
    }
    
    records[index] = { 
      ...records[index], 
      ...updatedUser,
      id: records[index].id, 
      created_at: records[index].created_at 
    };
    
    await writeCSV(records);
    
    return records[index];
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const records = await readCSV();
    
    const initialLength = records.length;
    const filteredRecords = records.filter(record => record.id !== id.toString());
    
    if (filteredRecords.length === initialLength) {
      throw new Error(`Usuário com ID não encontrado.`);
    }
    
    const reindexedRecords = filteredRecords.map((record, index) => ({
      ...record,
      id: (index + 1).toString() 
    }));
    
    await writeCSV(reindexedRecords);

    return true;
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error);
    throw error;
  }
};

const getStats = async () => {
  try {
    const records = await readCSV();
    return {
      total: records.length,
      lastUpdated: records.length > 0 ? 
        new Date(Math.max(...records.map(r => new Date(r.created_at || 0)))) : 
        null
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  readCSV,
  addUser,
  updateUser,
  deleteUser,
  getStats
};