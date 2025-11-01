import { useUserOperations } from './hooks/useUserOperations';
import styles from './styles/UserList.module.css';

export default function UserActions({ user, isSaved, onSave, onEdit, onUpdate }) {
  const { deleteUser, isDeleting } = useUserOperations();

  const handleDelete = async () => {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
      const success = await deleteUser(user.id);
      if (success) {
        onUpdate?.();
      }
    }
  };

  return (
    <div className={styles.userActions}>
      {!isSaved && onSave && (
        <button 
          onClick={() => onSave(user)}
          className={styles.saveBtn}
        >
          Salvar no CSV
        </button>
      )}
      {isSaved && (
        <>
          <button 
            onClick={onEdit}
            className={styles.editBtn}
          >
            Editar
          </button>
          <button 
            onClick={handleDelete}
            className={styles.deleteBtn}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluído'}
          </button>
        </>
      )}
    </div>
  );
}