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
      console.log(`Fetching ${size} users from Random User API...`);
      
      // Request specific fields we need for our application
      const data = await this.makeRequest(`/api/?results=${size}&inc=name,login,email,phone,dob,id&noinfo`);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      console.log('Successfully fetched users from Random User API');
      
      // Transform to match our application's expected format
      return data.results.map((user, index) => ({
        id: user.login.uuid, // Use UUID as primary ID
        uid: user.id.value || `randomuser-${index}`, // Fallback if no ID value
        first_name: user.name.first,
        last_name: user.name.last,
        username: user.login.username,
        email: user.email,
        phone_number: user.phone,
        date_of_birth: new Date(user.dob.date).toISOString().split('T')[0], // Format as YYYY-MM-DD
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