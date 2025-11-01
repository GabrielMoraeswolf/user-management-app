import { addUser, initializeCSV } from '../../lib/csvHandler';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    await initializeCSV();
    const user = req.body;
    const savedUser = await addUser(user);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar usuário', error: error.message });
  }
}