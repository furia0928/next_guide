import Link from 'next/link';
import { css } from '@emotion/react';

const style = css`
  padding: 20px;
  background-color: #eee;
  border-radius: 10px;
  li a {
    display: block;
    border-top: 1px solid red;
    padding: 10px 0;
  }
`;

export const Posts = ({ posts }) => {
  return (
    <div css={style}>
      <h2>posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/board/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
