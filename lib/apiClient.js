const https = require('https');

class ApiClient {
  constructor() {
    this.baseURL = 'randomuser.me';
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
      
      const data = await this.makeRequest(`/api/?results=${size}&inc=name,login,email,phone,dob,id&noinfo`);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data.results.map((user, index) => ({
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
      console.error('Falha na solicitação da API:', error.message);
      
    }
  }

}

module.exports = new ApiClient();