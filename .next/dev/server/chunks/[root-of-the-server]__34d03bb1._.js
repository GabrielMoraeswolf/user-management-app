module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/records.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
(()=>{
    const e = new Error("Cannot find module '../../../lib/csvHandler'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
async function handler(req, res) {
    await initializeCSV();
    switch(req.method){
        case 'GET':
            try {
                const records = await readCSV();
                res.status(200).json(records);
            } catch (error) {
                res.status(500).json({
                    message: 'Error reading records',
                    error: error.message
                });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                const updatedUser = await updateUser(id, req.body);
                if (!updatedUser) {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }
                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(500).json({
                    message: 'Error updating user',
                    error: error.message
                });
            }
            break;
        case 'DELETE':
            try {
                const { id } = req.query;
                await deleteUser(id);
                res.status(200).json({
                    message: 'User deleted successfully'
                });
            } catch (error) {
                res.status(500).json({
                    message: 'Error deleting user',
                    error: error.message
                });
            }
            break;
        default:
            res.status(405).json({
                message: 'Method not allowed'
            });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__34d03bb1._.js.map