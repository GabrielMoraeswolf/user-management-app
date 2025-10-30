module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/axios [external] (axios, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("axios", () => require("axios"));

module.exports = mod;
}),
"[project]/lib/apiClient.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const axios = __turbopack_context__.r("[externals]/axios [external] (axios, cjs)");
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
class ApiClient {
    constructor(){
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 10000
        });
    }
    async getUsers(size = 10) {
        try {
            const response = await this.client.get('/users', {
                params: {
                    size
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
    async getSingleUser() {
        try {
            const response = await this.client.get('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
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
            count: users.length
        });
    } catch (error) {
        console.error('Error in users API route:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error',
            data: []
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d80a2d74._.js.map