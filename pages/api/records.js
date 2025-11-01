
import { readCSV, updateUser, deleteUser, initializeCSV } from '../../lib/csvHandler';

export default async function handler(req, res) {
 
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
        res.status(200).json(records);
      } catch (error) {
        console.error('Erro ao ler os registros no arquivo CSV:', error);
        res.status(500).json({ 
          success: false,
          message: 'Erro ao ler os registros no arquivo CSV: ' + error.message 
        });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        
        if (!id) {
          return res.status(400).json({ 
            success: false,
            message: 'O ID do usuário é obrigatório' 
          });
        }
        
        const updatedUser = await updateUser(id, req.body);
        
        res.status(200).json({
          success: true,
          message: 'Usuário atualizado com sucesso',
          data: updatedUser
        });
      } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        res.status(500).json({ 
          success: false,
          message: 'Erro ao atualizar o usuário:' + error.message 
        });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        
        if (!id) {
          return res.status(400).json({ 
            success: false,
            message: 'O ID do usuário é obrigatório' 
          });
        }
        
        await deleteUser(id);
        res.status(200).json({ 
          success: true,
          message: 'Usuário excluído com sucesso' 
        });
      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
        res.status(500).json({ 
          success: false,
          message: 'Erro ao excluir o usuário:' + error.message 
        });
      }
      break;

    default:
      res.status(405).json({ 
        success: false,
        message: 'Método não permitido' 
      });
  }
}