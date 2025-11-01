import UserList from '../UserList';
import styles from './styles/Home.module.css';

export default function ApiUsersTab({ 
  users, 
  loading, 
  onFetchUsers, 
  onSaveUser, 
  onUpdateSavedUsers 
}) {
  return (
    <div>
      <div className={styles.controls}>
        <button 
          className={styles.button}
          onClick={onFetchUsers} 
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Buscar novos usuários'}
        </button>
        {users.length > 0 }
      </div>
      
      {users.length > 0 && (
        <p className={styles.info}>{users.length} usuários</p>
      )}
      
      <UserList 
        users={users} 
        onSave={onSaveUser}
        onUpdate={onUpdateSavedUsers}
      />
    </div>
  );
}