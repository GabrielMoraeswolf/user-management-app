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
"[externals]/csv-parser [external] (csv-parser, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("csv-parser", () => require("csv-parser"));

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
const csv = __turbopack_context__.r("[externals]/csv-parser [external] (csv-parser, cjs)");
const CSV_FILE = path.join(process.cwd(), 'users.csv');
// Initialize CSV file with headers if it doesn't exist
const initializeCSV = async ()=>{
    try {
        if (!fs.existsSync(CSV_FILE)) {
            const csvWriter = createObjectCsvWriter({
                path: CSV_FILE,
                header: [
                    {
                        id: 'id',
                        title: 'ID'
                    },
                    {
                        id: 'uid',
                        title: 'UID'
                    },
                    {
                        id: 'first_name',
                        title: 'First Name'
                    },
                    {
                        id: 'last_name',
                        title: 'Last Name'
                    },
                    {
                        id: 'username',
                        title: 'Username'
                    },
                    {
                        id: 'email',
                        title: 'Email'
                    },
                    {
                        id: 'phone_number',
                        title: 'Phone Number'
                    },
                    {
                        id: 'date_of_birth',
                        title: 'Date of Birth'
                    }
                ],
                append: false,
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
const readCSV = ()=>{
    return new Promise((resolve, reject)=>{
        const results = [];
        if (!fs.existsSync(CSV_FILE)) {
            return resolve([]);
        }
        fs.createReadStream(CSV_FILE).pipe(csv({
            separator: ';',
            mapHeaders: ({ header })=>header.trim()
        })).on('data', (data)=>results.push(data)).on('end', ()=>resolve(results)).on('error', (error)=>reject(error));
    });
};
// FIXED: This function now properly reads existing data and writes everything back
const writeCSV = async (records)=>{
    const csvWriter = createObjectCsvWriter({
        path: CSV_FILE,
        header: [
            {
                id: 'id',
                title: 'ID'
            },
            {
                id: 'uid',
                title: 'UID'
            },
            {
                id: 'first_name',
                title: 'First Name'
            },
            {
                id: 'last_name',
                title: 'Last Name'
            },
            {
                id: 'username',
                title: 'Username'
            },
            {
                id: 'email',
                title: 'Email'
            },
            {
                id: 'phone_number',
                title: 'Phone Number'
            },
            {
                id: 'date_of_birth',
                title: 'Date of Birth'
            }
        ],
        append: false,
        fieldDelimiter: ';'
    });
    await csvWriter.writeRecords(records);
};
// FIXED: This now properly handles ID generation and reads existing records
const addUser = async (user)=>{
    try {
        await initializeCSV();
        const records = await readCSV();
        // Generate unique ID - find the highest existing ID and increment
        const maxId = records.length > 0 ? Math.max(...records.map((r)=>parseInt(r.id) || 0)) : 0;
        const newUser = {
            id: (maxId + 1).toString(),
            uid: user.uid || `user-${Date.now()}`,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            date_of_birth: user.date_of_birth
        };
        // Add new user to existing records
        records.push(newUser);
        // Write ALL records back to CSV (existing + new)
        await writeCSV(records);
        return newUser;
    } catch (error) {
        console.error('Error adding user to CSV:', error);
        throw error;
    }
};
const updateUser = async (id, updatedUser)=>{
    try {
        const records = await readCSV();
        const index = records.findIndex((record)=>record.id === id.toString());
        if (index !== -1) {
            records[index] = {
                ...records[index],
                ...updatedUser,
                id: records[index].id // Preserve original ID
            };
            await writeCSV(records); // This writes ALL records back
            return records[index];
        }
        return null;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
const deleteUser = async (id)=>{
    try {
        const records = await readCSV();
        const filteredRecords = records.filter((record)=>record.id !== id.toString());
        await writeCSV(filteredRecords); // This writes remaining records back
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
const searchUsers = async (query, fields = [
    'first_name',
    'last_name'
])=>{
    try {
        const records = await readCSV();
        const lowerQuery = query.toLowerCase();
        return records.filter((record)=>fields.some((field)=>record[field] && record[field].toLowerCase().includes(lowerQuery)));
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

//# sourceMappingURL=%5Broot-of-the-server%5D__226f8af0._.js.map