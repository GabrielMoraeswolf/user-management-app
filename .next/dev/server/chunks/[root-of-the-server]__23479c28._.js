module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/csv-writer [external] (csv-writer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("csv-writer", () => require("csv-writer"));

module.exports = mod;
}),
"[project]/lib/csvHandler.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const csv = require('csv-parser');

const CSV_FILE = path.join(process.cwd(), 'users.csv');

// Initialize CSV file with headers if it doesn't exist
const initializeCSV = async () => {
  try {
    if (!fs.existsSync(CSV_FILE)) {
      const csvWriter = createObjectCsvWriter({
        path: CSV_FILE,
        header: [
          { id: 'id', title: 'ID' },
          { id: 'uid', title: 'UID' },
          { id: 'first_name', title: 'First Name' },
          { id: 'last_name', title: 'Last Name' },
          { id: 'username', title: 'Username' },
          { id: 'email', title: 'Email' },
          { id: 'phone_number', title: 'Phone Number' },
          { id: 'date_of_birth', title: 'Date of Birth' }
        ],
        fieldDelimiter: ';'
      });
      await csvWriter.writeRecords([]);
      console.log('CSV file initialized');
    }
  } catch (error) {
    console.error('Error initializing CSV:', error);
    throw error;
  }
};

const readCSV = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    if (!fs.existsSync(CSV_FILE)) {
      return resolve([]);
    }

    fs.createReadStream(CSV_FILE)
      .pipe(csv({ 
        separator: ';',
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const writeCSV = async (records) => {
  const csvWriter = createObjectCsvWriter({
    path: CSV_FILE,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'uid', title: 'UID' },
      { id: 'first_name', title: 'First Name' },
      { id: 'last_name', title: 'Last Name' },
      { id: 'username', title: 'Username' },
      { id: 'email', title: 'Email' },
      { id: 'phone_number', title: 'Phone Number' },
      { id: 'date_of_birth', title: 'Date of Birth' }
    ],
    fieldDelimiter: ';'
  });

  await csvWriter.writeRecords(records);
};

const addUser = async (user) => {
  try {
    await initializeCSV();
    const records = await readCSV();
    
    const newUser = {
      id: (records.length + 1).toString(),
      uid: user.uid,
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
    console.error('Error adding user to CSV:', error);
    throw error;
  }
};

const updateUser = async (id, updatedUser) => {
  try {
    const records = await readCSV();
    const index = records.findIndex(record => record.id === id.toString());
    
    if (index !== -1) {
      records[index] = { 
        ...records[index], 
        ...updatedUser,
        id: records[index].id // Preserve original ID
      };
      await writeCSV(records);
      return records[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const records = await readCSV();
    const filteredRecords = records.filter(record => record.id !== id.toString());
    await writeCSV(filteredRecords);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const searchUsers = async (query, fields = ['first_name', 'last_name']) => {
  try {
    const records = await readCSV();
    const lowerQuery = query.toLowerCase();
    
    return records.filter(record => 
      fields.some(field => 
        record[field] && record[field].toLowerCase().includes(lowerQuery)
      )
    );
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

module.exports = {
  initializeCSV,
  readCSV,
  addUser,
  updateUser,
  deleteUser,
  searchUsers
};*/ // /lib/csvHandler.js
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const { createObjectCsvWriter } = __turbopack_context__.r("[externals]/csv-writer [external] (csv-writer, cjs)");
const CSV_FILE = path.join(process.cwd(), 'data', 'users.csv');
// Ensure data directory exists
const ensureDataDirectory = ()=>{
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, {
            recursive: true
        });
    }
};
// Simple CSV parsing without csv-parser dependency issues
const parseCSV = (content)=>{
    const lines = content.split('\n').filter((line)=>line.trim());
    if (lines.length <= 1) return []; // Only headers or empty
    const headers = lines[0].split(';').map((h)=>h.trim());
    const results = [];
    for(let i = 1; i < lines.length; i++){
        const values = lines[i].split(';');
        const row = {};
        headers.forEach((header, index)=>{
            row[header] = values[index] ? values[index].trim() : '';
        });
        // Only add rows that have actual data
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
// Initialize CSV file with headers if it doesn't exist
const initializeCSV = async ()=>{
    try {
        ensureDataDirectory();
        if (!fs.existsSync(CSV_FILE)) {
            const headerRow = 'ID;UID;First Name;Last Name;Username;Email;Phone Number;Date of Birth;Company;Created At\n';
            fs.writeFileSync(CSV_FILE, headerRow, 'utf8');
            console.log('CSV file initialized at:', CSV_FILE);
        }
    } catch (error) {
        console.error('Error initializing CSV:', error);
        throw error;
    }
};
const readCSV = async ()=>{
    try {
        if (!fs.existsSync(CSV_FILE)) {
            return [];
        }
        const content = fs.readFileSync(CSV_FILE, 'utf8');
        const records = parseCSV(content);
        console.log(`Read ${records.length} records from CSV`);
        return records;
    } catch (error) {
        console.error('Error reading CSV:', error);
        return [];
    }
};
const writeCSV = async (records)=>{
    try {
        ensureDataDirectory();
        console.log(`Writing ${records.length} records to CSV...`);
        // Create header row
        const headers = [
            'ID',
            'UID',
            'First Name',
            'Last Name',
            'Username',
            'Email',
            'Phone Number',
            'Date of Birth',
            'Company',
            'Created At'
        ];
        const headerRow = headers.join(';') + '\n';
        // Create data rows
        const dataRows = records.map((record)=>{
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
        const fullContent = headerRow + dataRows;
        fs.writeFileSync(CSV_FILE, fullContent, 'utf8');
        console.log(`Successfully written ${records.length} records to CSV`);
        return records.length;
    } catch (error) {
        console.error('Error writing CSV:', error);
        throw error;
    }
};
const appendToCSV = async (user)=>{
    try {
        ensureDataDirectory();
        // Read existing records first
        const existingRecords = await readCSV();
        console.log(`Found ${existingRecords.length} existing records`);
        // Generate new ID - find the highest existing ID and add 1
        const maxId = existingRecords.length > 0 ? Math.max(...existingRecords.map((r)=>parseInt(r.id) || 0)) : 0;
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
        console.log('Appending new user with ID:', newId);
        // Add new user to existing records
        const allRecords = [
            ...existingRecords,
            newUser
        ];
        // Write all records back to file
        await writeCSV(allRecords);
        return newUser;
    } catch (error) {
        console.error('Error appending to CSV:', error);
        throw error;
    }
};
const addUser = async (user)=>{
    try {
        await initializeCSV();
        const existingRecords = await readCSV();
        console.log(`Found ${existingRecords.length} existing records before adding`);
        // Check for duplicate UID
        const duplicateUser = existingRecords.find((record)=>record.uid === user.uid);
        if (duplicateUser) {
            throw new Error(`User with UID ${user.uid} already exists`);
        }
        // Use append function which properly handles the CSV
        const newUser = await appendToCSV(user);
        // Verify the addition worked
        const updatedRecords = await readCSV();
        console.log(`Records after adding: ${updatedRecords.length}`);
        return newUser;
    } catch (error) {
        console.error('Error adding user to CSV:', error);
        throw error;
    }
};
const updateUser = async (id, updatedUser)=>{
    try {
        const records = await readCSV();
        console.log(`Looking for user with ID: ${id} in ${records.length} records`);
        const index = records.findIndex((record)=>record.id === id.toString());
        if (index === -1) {
            console.log('Available IDs:', records.map((r)=>r.id));
            throw new Error(`User with ID ${id} not found. Available IDs: ${records.map((r)=>r.id).join(', ')}`);
        }
        console.log(`Found user at index ${index}:`, records[index]);
        // Update the user while preserving the ID and created_at
        records[index] = {
            ...records[index],
            ...updatedUser,
            id: records[index].id,
            created_at: records[index].created_at // Preserve creation date
        };
        console.log('Updated user:', records[index]);
        await writeCSV(records);
        console.log(`Successfully updated user with ID: ${id}`);
        return records[index];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
const deleteUser = async (id)=>{
    try {
        const records = await readCSV();
        console.log(`Looking for user with ID: ${id} in ${records.length} records`);
        const initialLength = records.length;
        const filteredRecords = records.filter((record)=>record.id !== id.toString());
        if (filteredRecords.length === initialLength) {
            console.log('Available IDs:', records.map((r)=>r.id));
            throw new Error(`User with ID ${id} not found. Available IDs: ${records.map((r)=>r.id).join(', ')}`);
        }
        console.log(`Found user to delete. Records before: ${initialLength}, after: ${filteredRecords.length}`);
        // Reassign IDs to maintain sequence
        const reindexedRecords = filteredRecords.map((record, index)=>({
                ...record,
                id: (index + 1).toString() // Reset IDs to sequential order
            }));
        await writeCSV(reindexedRecords);
        console.log(`Successfully deleted user with ID: ${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
const searchUsers = async (query, fields = [
    'first_name',
    'last_name',
    'email'
])=>{
    try {
        const records = await readCSV();
        const lowerQuery = query.toLowerCase().trim();
        const results = records.filter((record)=>fields.some((field)=>record[field] && record[field].toLowerCase().includes(lowerQuery)));
        console.log(`Search for "${query}" returned ${results.length} results`);
        return results;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};
const getStats = async ()=>{
    try {
        const records = await readCSV();
        return {
            total: records.length,
            lastUpdated: records.length > 0 ? new Date(Math.max(...records.map((r)=>new Date(r.created_at || 0)))) : null
        };
    } catch (error) {
        console.error('Error getting stats:', error);
        throw error;
    }
};
module.exports = {
    initializeCSV,
    readCSV,
    addUser,
    appendToCSV,
    updateUser,
    deleteUser,
    searchUsers,
    getStats,
    writeCSV
};
}),
"[project]/pages/api/save.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvHandler$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/csvHandler.js [api] (ecmascript)");
;
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        });
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvHandler$2e$js__$5b$api$5d$__$28$ecmascript$29$__["initializeCSV"])();
        const user = req.body;
        const savedUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvHandler$2e$js__$5b$api$5d$__$28$ecmascript$29$__["addUser"])(user);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({
            message: 'Error saving user',
            error: error.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__23479c28._.js.map