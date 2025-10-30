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
"[project]/lib/apiClient.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*const https = require('https');

class ApiClient {
  constructor() {

    this.baseURL = 'jsonplaceholder.typicode.com';
    this.timeout = 30000;
  }

  async makeRequest(path) {
    return new Promise((resolve, reject) => {
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

      const req = https.request(options, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (parseError) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Network error: ${error.message}`));
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }

  async getUsers(size = 10) {
    try {
      console.log(`Fetching ${size} users from JSONPlaceholder API...`);
      
      const data = await this.makeRequest('/users');
      let users = data.slice(0, size);
      
      console.log('Successfully fetched users from API');
      
      return users.map((user, index) => ({
        id: user.id,
        uid: `jsonplaceholder-${user.id}`,
        first_name: user.name.split(' ')[0],
        last_name: user.name.split(' ').slice(1).join(' ') || 'Doe',
        username: user.username,
        email: user.email,
        phone_number: user.phone,
        date_of_birth: `19${80 + (index % 20)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
        website: user.website,
        company: user.company?.name,
        source: 'jsonplaceholder'
      }));
      
    } catch (error) {
      console.error('API request failed:', error.message);
      throw error;
    }
  }
}

module.exports = new ApiClient();*/ // /lib/apiClient.js
const https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
class ApiClient {
    constructor(){
        this.baseURL = 'randomuser.me';
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
            console.log(`Fetching ${size} users from Random User API...`);
            // Request specific fields we need for our application
            const data = await this.makeRequest(`/api/?results=${size}&inc=name,login,email,phone,dob,id&noinfo`);
            if (data.error) {
                throw new Error(data.error);
            }
            console.log('Successfully fetched users from Random User API');
            // Transform to match our application's expected format
            return data.results.map((user, index)=>({
                    id: user.login.uuid,
                    uid: user.id.value || `randomuser-${index}`,
                    first_name: user.name.first,
                    last_name: user.name.last,
                    username: user.login.username,
                    email: user.email,
                    phone_number: user.phone,
                    date_of_birth: new Date(user.dob.date).toISOString().split('T')[0],
                    gender: user.gender,
                    nationality: user.nat,
                    source: 'randomuser'
                }));
        } catch (error) {
            console.error('API request failed:', error.message);
        }
    }
}
module.exports = new ApiClient();
}),
"[project]/pages/api/users.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*import apiClient from '../../lib/apiClient';

export default async function handler(req, res) {
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
    const users = await apiClient.getUsers(parseInt(size));
    
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
}*/ // /pages/api/users.js
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
        const { size = 10, seed } = req.query;
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$apiClient$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].getUsers(parseInt(size));
        res.status(200).json({
            success: true,
            data: users,
            count: users.length,
            source: users[0]?.source || 'unknown'
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

//# sourceMappingURL=%5Broot-of-the-server%5D__902c61b8._.js.map