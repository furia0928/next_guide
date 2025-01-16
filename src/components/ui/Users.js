import { css } from '@emotion/react';

const style = css`
  padding: 20px;
  background-color: #eee;
  border-radius: 10px;
`;

export const Users = ({ users }) => {
  return (
    <div css={style}>
      <h2>user</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
