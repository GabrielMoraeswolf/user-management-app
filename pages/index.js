import { useState, useEffect } from 'react';
import UserList from '../components/UserList';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('api');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/users?size=10');
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.message || 'Falha ao buscar usuários');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setError('Erro de rede: Não foi possível obter os usuários.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedUsers = async () => {
    try {
      const response = await fetch('/api/records');
      const data = await response.json();
      setSavedUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários salvos:', error);
      setError('Falha ao carregar');
    }
  };

const saveUser = async (user) => {
  try {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('usuário salvo:', result);
      return result; 
    } else {
      new Error(result.message || 'Não foi possível salvar o  usuário!');
    }
  } catch (error) {
    console.error('Erro ao salvar usuário!:', error);
    throw error; 
  }
};
 
  const saveAllUsers = async () => {
  setLoading(true);
  try {
    let successCount = 0;
    let errorCount = 0;
    
    for (const user of users) {
      try {
        await saveUser(user);
        successCount++;
      } catch (error) {
        console.error(`Falha ao salvar o usuário ${user.first_name}:`, error);
        errorCount++;
      }
    }
    
    alert(`Salvo ${successCount} usuários com sucesso. ${errorCount > 0 ? `${errorCount} falha.` : ''}`);
    fetchSavedUsers(); // Refresh the saved users list
  } catch (error) {
    alert('Erro ao salvar usuários');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUsers();
    fetchSavedUsers();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Sistema de gerenciamento de usuários</h1>
        <p>O aplicativo exibe uma lista de usuários obtidos da  API e permite salvar esses dados em um arquivo CSV local. Após o salvamento,
           o usuário pode editar ou excluir registros diretamente do arquivo e podendo adicionar novos usuários ao banco interno a qualquer momento.</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <nav>
          <button 
            className={activeTab === 'api' ? 'active' : ''} 
            onClick={() => setActiveTab('api')}
          >
            Usuários
          </button>
          <button 
            className={activeTab === 'saved' ? 'active' : ''} 
            onClick={() => setActiveTab('saved')}
          >
            Usuários Salvos ({savedUsers.length})
          </button>
          
        </nav>
      </header>

      <main>
        {activeTab === 'api' && (
          <div>
            <div className="controls">
              <button onClick={fetchUsers} disabled={loading}>
                {loading ? 'Carregando...' : 'Buscar novos usuários'}
              </button>
              {users.length > 0 && (
                <button onClick={saveAllUsers} className="save-all">
                  Salvar todos os usuários no CSV
                </button>
              )}
            </div>
            
            {users.length > 0 && (
              <p className="info"> {users.length} usuários</p>
            )}
            
            <UserList 
              users={users} 
              onSave={saveUser}
              onUpdate={fetchSavedUsers}
            />
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <button onClick={fetchSavedUsers} className="refresh">
              Atualizar usuários salvos.
            </button>
            <UserList 
              users={savedUsers} 
              isSaved={true}
              onUpdate={fetchSavedUsers}
            />
          </div>
        )}

      
      </main>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        header {
          margin-bottom: 30px;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 20px;
        }
        
        h1 {
          color: #0070f3;
          margin-bottom: 5px;
        }
        
        .error-message {
          background-color: #fee;
          border: 1px solid #fcc;
          color: #c00;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .info {
          color: #666;
          font-style: italic;
          margin: 10px 0;
        }
        
        nav {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        
        nav button {
          padding: 10px 20px;
          border: 1px solid #0070f3;
          background: white;
          color: #0070f3;
          cursor: pointer;
          border-radius: 5px;
        }
        
        nav button.active {
          background: #0070f3;
          color: white;
        }
        
        .controls {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
        }
        
        button {
          padding: 10px 15px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .save-all {
          background: #28a745;
        }
        
        .refresh {
          background: #ffc107;
          color: black;
          margin-bottom: 20px;
        }
        
        .search-form {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
        }
        
        .search-form input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}