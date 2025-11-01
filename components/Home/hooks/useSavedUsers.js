import { useState, useEffect } from 'react';

export function useSavedUsers() {
  const [savedUsers, setSavedUsers] = useState([]);

  const fetchSavedUsers = async () => {
    try {
      const response = await fetch('/api/records');
      const data = await response.json();
      setSavedUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários salvos:', error);
    }
  };

  const saveUser = async (user) => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        console.log('usuário salvo:', result);
        return result; 
      } else {
        throw new Error(result.message || 'Não foi possível salvar o usuário!');
      }
    } catch (error) {
      console.error('Erro ao salvar usuário!:', error);
      throw error; 
    }
  };

  const saveAllUsers = async (users) => {
    setLoading(true);
    try {
      let successCount = 0;
      let errorCount = 0;
      
      for (const user of users) {
        try {
          await saveUser(user);
          successCount++;
        } catch (error) {
          console.error(`Falha ao salvar o usuário ${user.first_name}:`, error);
          errorCount++;
        }
      }
      
      alert(`Salvo ${successCount} usuários com sucesso. ${errorCount > 0 ? `${errorCount} falha.` : ''}`);
      fetchSavedUsers(); 
    } catch (error) {
      alert('Erro ao salvar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedUsers();
  }, []);

  return {
    savedUsers,
    fetchSavedUsers,
    saveUser,
    saveAllUsers
  };
}