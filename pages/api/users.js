
import apiClient from '../../lib/apiClient';

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
      message: 'Método não permitido' 
    });
  }

  try {
    const { size = 10 } = req.query;
    const users = await apiClient.getUsers(parseInt(size));
    
    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
      source: users[0]?.source || ''
    });
    
  } catch (error) {
    console.error('Erro na busca da API:', error);
    
    res.status(500).json({
      success: false,
      message: error.message || 'Erro no Servidor',
      data: []
    });
  }
}