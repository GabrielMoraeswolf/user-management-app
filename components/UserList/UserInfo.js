import styles from './styles/UserList.module.css';

export default function UserInfo({ user }) {
  return (
    <div className={styles.userInfo}>
      <h3>{user.first_name} {user.last_name}</h3>
      <p><strong>Nome de usuário:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Telefone:</strong> {user.phone_number}</p>
      <p><strong>Data de nascimento:</strong> {user.date_of_birth}</p>
      <p><strong>Identificador Único:</strong> {user.uid}</p>
      {user.gender && <p><strong>Gênero:</strong> {user.gender}</p>}
      {user.nationality && <p><strong>Nacionalidade:</strong> {user.nationality}</p>}
    </div>
  );
}