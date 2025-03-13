import { StyledUsers } from './Users.styles';

export const Users = ({ users }) => {
  return (
    <StyledUsers>
      <h2>user</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </StyledUsers>
  );
};
