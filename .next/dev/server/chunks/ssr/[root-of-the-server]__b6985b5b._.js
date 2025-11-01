module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/components/ui/Button.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /components/ui/Button.js
__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Button({ children, onClick, disabled, variant = 'primary', ...props }) {
    const baseStyle = {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1
    };
    const variants = {
        primary: {
            background: '#0070f3',
            color: 'white'
        },
        success: {
            background: '#28a745',
            color: 'white'
        },
        warning: {
            background: '#ffc107',
            color: 'black'
        },
        secondary: {
            background: '#6c757d',
            color: 'white'
        }
    };
    const style = {
        ...baseStyle,
        ...variants[variant]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        style: style,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/Button.js",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*import { useState, useEffect } from 'react';
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
}*/ // /pages/index.js
__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
(()=>{
    const e = new Error("Cannot find module '../lib/hooks'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../components/ui/TabNav'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.js [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../components/ui/SearchForm'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../components/users'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
;
;
;
function Home() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('api');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const { users, loading, error: apiError, fetchUsers, saveUser, saveAllUsers } = useUsers();
    const { savedUsers, error: savedError, fetchSavedUsers, updateSavedUsers } = useSavedUsers();
    const { searchResults, error: searchError, handleSearch } = useSearch();
    const error = apiError || savedError || searchError;
    const handleTabChange = (tab)=>{
        setActiveTab(tab);
        if (tab === 'search') {
            setSearchQuery('');
        }
    };
    const handleSearchSubmit = async (e)=>{
        e.preventDefault();
        await handleSearch(searchQuery);
    };
    const tabs = [
        {
            id: 'api',
            label: 'API Users',
            count: null
        },
        {
            id: 'saved',
            label: 'Saved Records',
            count: savedUsers.length
        },
        {
            id: 'search',
            label: 'Search',
            count: null
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-d8dd017dc9ae0275" + " " + "container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "jsx-d8dd017dc9ae0275",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "jsx-d8dd017dc9ae0275",
                        children: "User Management System"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "jsx-d8dd017dc9ae0275",
                        children: "Random Data API Integration"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-d8dd017dc9ae0275" + " " + "error-message",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TabNav, {
                        tabs: tabs,
                        activeTab: activeTab,
                        onTabChange: handleTabChange
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "jsx-d8dd017dc9ae0275",
                children: [
                    activeTab === 'api' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ApiUsersTab, {
                        users: users,
                        loading: loading,
                        onFetchUsers: fetchUsers,
                        onSaveUser: saveUser,
                        onSaveAllUsers: saveAllUsers,
                        onUpdateSaved: fetchSavedUsers
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this),
                    activeTab === 'saved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SavedUsersTab, {
                        savedUsers: savedUsers,
                        onRefresh: fetchSavedUsers,
                        onUpdate: updateSavedUsers
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 355,
                        columnNumber: 11
                    }, this),
                    activeTab === 'search' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SearchTab, {
                        searchQuery: searchQuery,
                        searchResults: searchResults,
                        onSearchChange: setSearchQuery,
                        onSearchSubmit: handleSearchSubmit,
                        onUpdateSaved: updateSavedUsers
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "d8dd017dc9ae0275",
                children: ".container.jsx-d8dd017dc9ae0275{max-width:1200px;margin:0 auto;padding:20px}header.jsx-d8dd017dc9ae0275{border-bottom:2px solid #0070f3;margin-bottom:30px;padding-bottom:20px}h1.jsx-d8dd017dc9ae0275{color:#0070f3;margin-bottom:5px}.error-message.jsx-d8dd017dc9ae0275{color:#c00;background-color:#fee;border:1px solid #fcc;border-radius:4px;margin:10px 0;padding:10px}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 324,
        columnNumber: 5
    }, this);
}
// Tab Components
function ApiUsersTab({ users, loading, onFetchUsers, onSaveUser, onSaveAllUsers, onUpdateSaved }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: onFetchUsers,
                        disabled: loading,
                        variant: "primary",
                        children: loading ? 'Loading...' : 'Fetch New Users'
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this),
                    users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: onSaveAllUsers,
                        variant: "success",
                        children: "Save All Users to CSV"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 417,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 408,
                columnNumber: 7
            }, this),
            users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "info",
                children: [
                    "Showing ",
                    users.length,
                    " users from API"
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 427,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(UserList, {
                users: users,
                onSave: onSaveUser,
                onUpdate: onUpdateSaved
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 430,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 407,
        columnNumber: 5
    }, this);
}
function SavedUsersTab({ savedUsers, onRefresh, onUpdate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                onClick: onRefresh,
                variant: "warning",
                children: "Refresh Saved Records"
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(UserList, {
                users: savedUsers,
                isSaved: true,
                onUpdate: onUpdate
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 445,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 441,
        columnNumber: 5
    }, this);
}
function SearchTab({ searchQuery, searchResults, onSearchChange, onSearchSubmit, onUpdateSaved }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SearchForm, {
                query: searchQuery,
                onChange: onSearchChange,
                onSubmit: onSearchSubmit,
                placeholder: "Search by first name, last name, or email..."
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 457,
                columnNumber: 7
            }, this),
            searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "info",
                        children: [
                            "Found ",
                            searchResults.length,
                            " results"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(UserList, {
                        users: searchResults,
                        isSaved: true,
                        onUpdate: onUpdateSaved
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 467,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 465,
                columnNumber: 9
            }, this),
            searchQuery && searchResults.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: "No users found matching your search."
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 476,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 456,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b6985b5b._.js.map