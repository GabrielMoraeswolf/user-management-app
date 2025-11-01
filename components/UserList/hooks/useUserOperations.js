import { useState } from 'react';

export function useUserOperations() {
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const updateUser = async (id, data) => {
    setSavingId(id);
    try {
      
      const response = await fetch(`/api/records?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Usuário atualizado com sucesso!');
        return true;
      } else {
        alert(`Erro ao atualizar o usuário: ${result.message}`);
        return false;
      }
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      alert('Erro ao atualizar o usuário: ' + error.message);
      return false;
    } finally {
      setSavingId(null);
    }
  };

  const deleteUser = async (id) => {
    setDeletingId(id);
    try {
      
      const response = await fetch(`/api/records?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        alert('Usuário excluído com sucesso!');
        return true;
      } else {
        alert(`Erro ao excluir o usuário: ${result.message}`);
        return false;
      }
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
      alert('Erro ao excluir o usuário: ' + error.message);
      return false;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    updateUser,
    deleteUser,
    isSaving: savingId !== null,
    isDeleting: deletingId !== null,
  };
}