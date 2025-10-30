
import apiClient from '../../lib/apiClient';

export default async function handler(req, res) {
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
    const users = await apiClient.getUsers(parseInt(size));
    
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