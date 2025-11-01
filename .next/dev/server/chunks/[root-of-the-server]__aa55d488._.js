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
"[project]/lib/csvHandler/constants.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const CSV_FILE = path.join(process.cwd(), 'data', 'users.csv');
const CSV_HEADERS = [
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
const ensureDataDirectory = ()=>{
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, {
            recursive: true
        });
    }
};
module.exports = {
    CSV_FILE,
    CSV_HEADERS,
    ensureDataDirectory
};
}),
"[project]/lib/csvHandler/csvInitializer.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const { CSV_FILE, CSV_HEADERS, ensureDataDirectory } = __turbopack_context__.r("[project]/lib/csvHandler/constants.js [api] (ecmascript)");
const initializeCSV = async ()=>{
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
}),
"[project]/lib/csvHandler/csvParser.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { CSV_HEADERS } = __turbopack_context__.r("[project]/lib/csvHandler/constants.js [api] (ecmascript)");
const parseCSV = (content)=>{
    const lines = content.split('\n').filter((line)=>line.trim());
    if (lines.length <= 1) return [];
    const headers = lines[0].split(';').map((h)=>h.trim());
    const results = [];
    for(let i = 1; i < lines.length; i++){
        const values = lines[i].split(';');
        const row = {};
        headers.forEach((header, index)=>{
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
const generateCSVContent = (records)=>{
    const headerRow = CSV_HEADERS.join(';') + '\n';
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
    return headerRow + dataRows;
};
module.exports = {
    parseCSV,
    generateCSVContent
};
}),
"[project]/lib/csvHandler/csvWriter.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const { CSV_FILE, ensureDataDirectory } = __turbopack_context__.r("[project]/lib/csvHandler/constants.js [api] (ecmascript)");
const { generateCSVContent } = __turbopack_context__.r("[project]/lib/csvHandler/csvParser.js [api] (ecmascript)");
const { readCSV } = __turbopack_context__.r("[project]/lib/csvHandler/csvOperations.js [api] (ecmascript)");
const writeCSV = async (records)=>{
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
const appendToCSV = async (user)=>{
    try {
        ensureDataDirectory();
        const existingRecords = await readCSV();
        console.log(`Foram encontrados ${existingRecords.length} registros existentes`);
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
        const allRecords = [
            ...existingRecords,
            newUser
        ];
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
}),
"[project]/lib/csvHandler/csvOperations.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const { CSV_FILE } = __turbopack_context__.r("[project]/lib/csvHandler/constants.js [api] (ecmascript)");
const { parseCSV } = __turbopack_context__.r("[project]/lib/csvHandler/csvParser.js [api] (ecmascript)");
const { writeCSV } = __turbopack_context__.r("[project]/lib/csvHandler/csvWriter.js [api] (ecmascript)");
const { initializeCSV } = __turbopack_context__.r("[project]/lib/csvHandler/csvInitializer.js [api] (ecmascript)");
const readCSV = async ()=>{
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
const addUser = async (user)=>{
    try {
        await initializeCSV();
        const records = await readCSV();
        const maxId = records.length > 0 ? Math.max(...records.map((r)=>parseInt(r.id) || 0)) : 0;
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
const updateUser = async (id, updatedUser)=>{
    try {
        const records = await readCSV();
        const index = records.findIndex((record)=>record.id === id.toString());
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
const deleteUser = async (id)=>{
    try {
        const records = await readCSV();
        const initialLength = records.length;
        const filteredRecords = records.filter((record)=>record.id !== id.toString());
        if (filteredRecords.length === initialLength) {
            throw new Error(`Usuário com ID não encontrado.`);
        }
        const reindexedRecords = filteredRecords.map((record, index)=>({
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
const getStats = async ()=>{
    try {
        const records = await readCSV();
        return {
            total: records.length,
            lastUpdated: records.length > 0 ? new Date(Math.max(...records.map((r)=>new Date(r.created_at || 0)))) : null
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
}),
"[project]/lib/csvHandler/index.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { initializeCSV } = __turbopack_context__.r("[project]/lib/csvHandler/csvInitializer.js [api] (ecmascript)");
const { readCSV, addUser, updateUser, deleteUser, getStats } = __turbopack_context__.r("[project]/lib/csvHandler/csvOperations.js [api] (ecmascript)");
const { appendToCSV, writeCSV } = __turbopack_context__.r("[project]/lib/csvHandler/csvWriter.js [api] (ecmascript)");
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
}),
"[project]/pages/api/records.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvHandler$2f$index$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/csvHandler/index.js [api] (ecmascript)");
;
async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvHandler$2f$index$2e$js__$5b$api$5d$__$28$ecmascript$29$__["initializeCSV"])();
    switch(req.method){
        case 'GET':
            try {
                const records = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvHandler$2f$index$2e$js__$5b$api$5d$__$28$ecmascript$29$__["readCSV"])();
                res.status(200).json(records);
            } catch (error) {
                console.error('Erro ao ler os registros no arquivo CSV:', error);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao ler os registros no arquivo CSV: ' + error.message
                });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({
                        success: false,
                        message: 'O ID do usuário é obrigatório'
                    });
                }
                const updatedUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvHandler$2f$index$2e$js__$5b$api$5d$__$28$ecmascript$29$__["updateUser"])(id, req.body);
                res.status(200).json({
                    success: true,
                    message: 'Usuário atualizado com sucesso',
                    data: updatedUser
                });
            } catch (error) {
                console.error('Erro ao atualizar o usuário:', error);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar o usuário:' + error.message
                });
            }
            break;
        case 'DELETE':
            try {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({
                        success: false,
                        message: 'O ID do usuário é obrigatório'
                    });
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csvHandler$2f$index$2e$js__$5b$api$5d$__$28$ecmascript$29$__["deleteUser"])(id);
                res.status(200).json({
                    success: true,
                    message: 'Usuário excluído com sucesso'
                });
            } catch (error) {
                console.error('Erro ao excluir o usuário:', error);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao excluir o usuário:' + error.message
                });
            }
            break;
        default:
            res.status(405).json({
                success: false,
                message: 'Método não permitido'
            });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aa55d488._.js.map