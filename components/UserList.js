
import { useState } from 'react';

export default function UserList({ users, isSaved = false, onSave, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      phone_number: user.phone_number || '',
      date_of_birth: user.date_of_birth || ''
    });
  };

  const handleSaveEdit = async (id) => {
    setSavingId(id);
    try {
      console.log('Saving edit for user ID:', id, 'with data:', editForm);
      
      const response = await fetch(`/api/records?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      const result = await response.json();

      if (response.ok) {
        setEditingId(null);
        setEditForm({});
        onUpdate?.();
        alert('User updated successfully!');
      } else {
        alert(`Error updating user: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user: ' + error.message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setDeletingId(id);
      try {
        console.log('Deleting user ID:', id);
        
        const response = await fetch(`/api/records?id=${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
          onUpdate?.();
          alert('User deleted successfully!');
        } else {
          alert(`Error deleting user: ${result.message}`);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user: ' + error.message);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleSaveUser = async (user) => {
    setSavingId(user.uid);
    try {
      await onSave(user);
    } finally {
      setSavingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No users found</p>
      </div>
    );
  }

  
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.uid || user.id} className="user-card">
          {editingId === user.id ? (
            <div className="edit-form">
              <div className="form-row">
                <label>First Name:</label>
                <input
                  type="text"
                  value={editForm.first_name || ''}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={editForm.last_name || ''}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Email:</label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Phone:</label>
                <input
                  type="text"
                  value={editForm.phone_number || ''}
                  onChange={(e) => handleInputChange('phone_number', e.target.value)}
                />
              </div>
              <div className="form-actions">
                <button onClick={() => handleSaveEdit(user.id)}>Save</button>
                <button onClick={handleCancelEdit} className="cancel">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="user-info">
                <h3>{user.first_name} {user.last_name}</h3>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone_number}</p>
                <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
                <p><strong>UID:</strong> {user.uid}</p>
                {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
                {user.nationality && <p><strong>Nationality:</strong> {user.nationality}</p>}
              </div>
              
              <div className="user-actions">
                {!isSaved && onSave && (
                  <button 
                    onClick={() => onSave(user)}
                    className="save-btn"
                  >
                    Salvar no CSV
                  </button>
                )}
                {isSaved && (
                  <>
                    <button 
                      onClick={() => handleEdit(user)}
                      className="edit-btn"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="delete-btn"
                    >
                      Deletar
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ))}

      <style jsx>{`
        .user-list {
          display: grid;
          gap: 20px;
        }
        
        .user-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          justify-content: between;
          align-items: flex-start;
          gap: 20px;
        }
        
        .user-info {
          flex: 1;
        }
        
        .user-info h3 {
          margin: 0 0 10px 0;
          color: #333;
        }
        
        .user-info p {
          margin: 5px 0;
          color: #666;
        }
        
        .user-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .save-btn {
          background: #28a745;
        }
        
        .edit-btn {
          background: #ffc107;
          color: black;
        }
        
        .delete-btn {
          background: #dc3545;
        }
        
        .edit-form {
          width: 100%;
        }
        
        .form-row {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        
        .form-row label {
          width: 100px;
          font-weight: bold;
        }
        
        .form-row input {
          flex: 1;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 3px;
        }
        
        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        
        .cancel {
          background: #6c757d;
        }
      `}</style>
    </div>
  );

}