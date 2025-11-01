import { useState } from 'react';
import { useUserOperations } from './hooks/useUserOperations';
import styles from './styles/UserList.module.css';

export default function EditForm({ user, onSave, onCancel }) {
  const [editForm, setEditForm] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    phone_number: user.phone_number || '',
    date_of_birth: user.date_of_birth || ''
  });
  
  const { updateUser, isSaving } = useUserOperations();

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    const success = await updateUser(user.id, editForm);
    if (success) {
      onSave?.();
      onCancel?.();
    }
  };

  return (
    <div className={styles.editForm}>
      <div className={styles.formRow}>
        <label>Primeiro nome:</label>
        <input
          type="text"
          value={editForm.first_name}
          onChange={(e) => handleInputChange('first_name', e.target.value)}
        />
      </div>
      <div className={styles.formRow}>
        <label>Sobrenome:</label>
        <input
          type="text"
          value={editForm.last_name}
          onChange={(e) => handleInputChange('last_name', e.target.value)}
        />
      </div>
      <div className={styles.formRow}>
        <label>Email:</label>
        <input
          type="email"
          value={editForm.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </div>
      <div className={styles.formRow}>
        <label>Telefone:</label>
        <input
          type="text"
          value={editForm.phone_number}
          onChange={(e) => handleInputChange('phone_number', e.target.value)}
        />
      </div>
      <div className={styles.formActions}>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? 'Salvando...' : 'Salvo'}
        </button>
        <button 
          onClick={onCancel} 
          className={styles.cancel}
          disabled={isSaving}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}