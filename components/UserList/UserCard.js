import EditForm from './EditForm';
import UserInfo from './UserInfo';
import UserActions from './UserActions';
import styles from './styles/UserList.module.css';

export default function UserCard({ 
  user, 
  isSaved, 
  onSave, 
  onUpdate, 
  isEditing, 
  onEditStart, 
  onEditEnd 
}) {
  return (
    <div className={styles.userCard}>
      {isEditing ? (
        <EditForm 
          user={user} 
          onSave={onUpdate}
          onCancel={onEditEnd}
        />
      ) : (
        <>
          <UserInfo user={user} />
          <UserActions 
            user={user}
            isSaved={isSaved}
            onSave={onSave}
            onEdit={onEditStart}
            onUpdate={onUpdate}
          />
        </>
      )}
    </div>
  );
}