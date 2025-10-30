module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[project]/lib/apiClient.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
const http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
class ApiClient {
    constructor(){
        this.baseURL = 'random-data-api.com';
        this.timeout = 30000;
    }
    async makeRequest(path) {
        return new Promise((resolve, reject)=>{
            const options = {
                hostname: this.baseURL,
                port: 443,
                path: path,
                method: 'GET',
                headers: {
                    'User-Agent': 'User-Management-App/1.0',
                    'Accept': 'application/json'
                },
                timeout: this.timeout
            };
            const req = https.request(options, (res)=>{
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode}`));
                    return;
                }
                let data = '';
                res.on('data', (chunk)=>{
                    data += chunk;
                });
                res.on('end', ()=>{
                    try {
                        const parsed = JSON.parse(data);
                        resolve(parsed);
                    } catch (parseError) {
                        reject(new Error('Invalid JSON response'));
                    }
                });
            });
            req.on('error', (error)=>{
                reject(new Error(`Network error: ${error.message}`));
            });
            req.on('timeout', ()=>{
                req.destroy();
                reject(new Error('Request timeout'));
            });
            req.end();
        });
    }
    async getUsers(size = 10) {
        try {
            console.log(`Fetching ${size} users from Random Data API...`);
            const data = await this.makeRequest(`/api/v2/users?size=${size}&response_type=json`);
            console.log('Successfully fetched users from API');
            // Ensure we always return an array
            const users = Array.isArray(data) ? data : [
                data
            ];
            return users.map((user, index)=>({
                    id: user.id || index + 1,
                    uid: user.uid || `uid-${user.id || index}`,
                    first_name: user.first_name || '',
                    last_name: user.last_name || '',
                    username: user.username || '',
                    email: user.email || '',
                    phone_number: user.phone_number || '',
                    date_of_birth: user.date_of_birth || '',
                    avatar: user.avatar,
                    employment: user.employment,
                    address: user.address
                }));
        } catch (error) {
            console.error('API request failed:', error.message);
            throw error; // Re-throw to handle in API route
        }
    }
    async getSingleUser() {
        try {
            const user = await this.makeRequest('/api/v2/users');
            return {
                id: user.id,
                uid: user.uid,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                phone_number: user.phone_number,
                date_of_birth: user.date_of_birth,
                avatar: user.avatar,
                employment: user.employment,
                address: user.address
            };
        } catch (error) {
            console.error('API request failed:', error.message);
            throw error;
        }
    }
}
module.exports = new ApiClient();
}),
"[project]/pages/api/users.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiClient$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/apiClient.js [api] (ecmascript)");
;
async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }
    try {
        const { size = 10 } = req.query;
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiClient$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].getUsers(parseInt(size));
        res.status(200).json({
            success: true,
            data: users,
            count: users.length,
            source: 'api'
        });
    } catch (error) {
        console.error('Error in users API route:', error.message);
        // Provide specific error messages based on error type
        let userMessage = 'Failed to fetch users from API';
        if (error.message.includes('getaddrinfo') || error.message.includes('EAI_AGAIN')) {
            userMessage = 'Network error: Cannot resolve API hostname. Please check your internet connection and DNS settings.';
        } else if (error.message.includes('timeout')) {
            userMessage = 'API request timeout. The server is taking too long to respond.';
        } else if (error.message.includes('Network error')) {
            userMessage = 'Network connectivity issue. Please check your internet connection.';
        } else if (error.message.includes('HTTP')) {
            userMessage = `API server error: ${error.message}`;
        }
        res.status(500).json({
            success: false,
            message: userMessage,
            error: error.message,
            data: []
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5ee5bd7b._.js.map