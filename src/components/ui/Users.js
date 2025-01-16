export const Users = ({ users }) => {
  return (
    <>
      <h2>user</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};
