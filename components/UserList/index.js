import { useState } from 'react';
import UserCard from './UserCard';
import styles from './styles/UserList.module.css';

export default function UserList({ users, isSaved = false, onSave, onUpdate }) {
  const [editingId, setEditingId] = useState(null);

  if (users.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Nenhum usuário encontrado</p>
      </div>
    );
  }

  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <UserCard
          key={user.uid || user.id}
          user={user}
          isSaved={isSaved}
          onSave={onSave}
          onUpdate={onUpdate}
          isEditing={editingId === user.id}
          onEditStart={() => setEditingId(user.id)}
          onEditEnd={() => setEditingId(null)}
        />
      ))}
    </div>
  );
}