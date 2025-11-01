import { useState } from 'react';
import Header from './Header';
import ApiUsersTab from './ApiUsersTab';
import SavedUsersTab from './SavedUsersTab';
import { useUsers, useSavedUsers } from './hooks';
import styles from './styles/Home.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('api');
  const { users, loading, error, fetchUsers } = useUsers();
  const { savedUsers, fetchSavedUsers, saveUser, saveAllUsers } = useSavedUsers();

  return (
    <div className={styles.container}>
      <Header 
        error={error}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedUsersCount={savedUsers.length}
      />
      
      <main>
        {activeTab === 'api' && (
          <ApiUsersTab
            users={users}
            loading={loading}
            onFetchUsers={fetchUsers}
            onSaveAllUsers={saveAllUsers}
            onSaveUser={saveUser}
            onUpdateSavedUsers={fetchSavedUsers}
          />
        )}

        {activeTab === 'saved' && (
          <SavedUsersTab
            savedUsers={savedUsers}
            onRefresh={fetchSavedUsers}
          />
        )}
      </main>
    </div>
  );
}