module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/apiClient.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/lib/apiClient.js'\n\nExpected '=>', got '('");
e.code = 'MODULE_UNPARSABLE';
throw e;
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
    if (req.method !== 'GET') {
        return res.status(405).json({
            message: 'Method not allowed'
        });
    }
    try {
        const { size = 10 } = req.query;
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiClient$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].getUsers(parseInt(size));
        // Add a flag to indicate if data is from API or mock
        const responseData = users.map((user)=>({
                ...user,
                data_source: user.is_mock ? 'mock' : 'api'
            }));
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error in users API route:', error);
        // Final fallback - generate mock data directly
        const generateMockUsers = (size = 10)=>{
            const mockUsers = [];
            for(let i = 0; i < size; i++){
                mockUsers.push({
                    id: i + 1,
                    uid: `fallback-uid-${i}-${Date.now()}`,
                    first_name: `FirstName${i}`,
                    last_name: `LastName${i}`,
                    username: `user${i}`,
                    email: `user${i}@example.com`,
                    phone_number: `+1-555-${String(i).padStart(3, '0')}-${String(i).padStart(4, '0')}`,
                    date_of_birth: `${1980 + i % 30}-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
                    data_source: 'fallback'
                });
            }
            return mockUsers;
        };
        const fallbackUsers = generateMockUsers(parseInt(req.query.size || 10));
        res.status(200).json(fallbackUsers);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a464bf9._.js.map