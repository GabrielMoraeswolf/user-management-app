import UserList from '../UserList';
import styles from './styles/Home.module.css';

export default function SavedUsersTab({ savedUsers, onRefresh }) {
  return (
    <div>
      <button 
        className={`${styles.button} ${styles.refresh}`}
        onClick={onRefresh}
      >
        Atualizar usuários salvos.
      </button>
      <UserList 
        users={savedUsers} 
        isSaved={true}
        onUpdate={onRefresh}
      />
    </div>
  );
}