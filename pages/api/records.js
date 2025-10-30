
import { readCSV, updateUser, deleteUser, initializeCSV } from '../../lib/csvHandler';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await initializeCSV();

  switch (req.method) {
    case 'GET':
      try {
        const records = await readCSV();
        console.log(`Returning ${records.length} records`);
        res.status(200).json(records);
      } catch (error) {
        console.error('Error reading records:', error);
        res.status(500).json({ 
          success: false,
          message: 'Error reading records: ' + error.message 
        });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        console.log('Update request for ID:', id, 'with data:', req.body);
        
        if (!id) {
          return res.status(400).json({ 
            success: false,
            message: 'User ID is required' 
          });
        }
        
        const updatedUser = await updateUser(id, req.body);
        
        res.status(200).json({
          success: true,
          message: 'User updated successfully',
          data: updatedUser
        });
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ 
          success: false,
          message: 'Error updating user: ' + error.message 
        });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        console.log('Delete request for ID:', id);
        
        if (!id) {
          return res.status(400).json({ 
            success: false,
            message: 'User ID is required' 
          });
        }
        
        await deleteUser(id);
        res.status(200).json({ 
          success: true,
          message: 'User deleted successfully' 
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ 
          success: false,
          message: 'Error deleting user: ' + error.message 
        });
      }
      break;

    default:
      res.status(405).json({ 
        success: false,
        message: 'Method not allowed' 
      });
  }
}