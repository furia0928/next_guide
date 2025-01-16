import { css } from '@emotion/react';

const style = css`
  padding: 20px;
  background-color: #eee;
  border-radius: 10px;
`;

export const PostsComments = ({ postsComments }) => {
  return (
    <ul css={style}>
      {postsComments.map((comment) => (
        <li key={comment.id} style={{ borderBottom: '1px solid #ccc' }}>
          {comment.body}
          <br />
          <span style={{ color: 'red' }}>{comment.name}</span>
          <span style={{ color: 'blue' }}>{comment.email}</span>
          <br />
        </li>
      ))}
    </ul>
  );
};
