import TabNavigation from './TabNavigation';
import styles from './styles/Home.module.css';

export default function Header({ error, activeTab, onTabChange, savedUsersCount }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Sistema de gerenciamento de usuários</h1>
      <p className={styles.description}>
        O aplicativo exibe uma lista de usuários obtidos da API e permite salvar esses dados em um arquivo CSV local. Após o salvamento,
        o usuário pode editar ou excluir registros diretamente do arquivo e podendo adicionar novos usuários ao banco interno a qualquer momento.
      </p>
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
      
      <TabNavigation 
        activeTab={activeTab}
        onTabChange={onTabChange}
        savedUsersCount={savedUsersCount}
      />
    </header>
  );
}