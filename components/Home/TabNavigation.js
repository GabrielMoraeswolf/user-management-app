import styles from './styles/Home.module.css';

export default function TabNavigation({ activeTab, onTabChange, savedUsersCount }) {
  return (
    <nav className={styles.nav}>
      <button 
        className={`${styles.navButton} ${activeTab === 'api' ? styles.navButtonActive : ''}`}
        onClick={() => onTabChange('api')}
      >
        Usuários
      </button>
      <button 
        className={`${styles.navButton} ${activeTab === 'saved' ? styles.navButtonActive : ''}`}
        onClick={() => onTabChange('saved')}
      >
        Usuários Salvos ({savedUsersCount})
      </button>
    </nav>
  );
}