import Link from 'next/link';
import { css } from '@emotion/react';

const style = css`
  padding: 20px;
  background-color: #eee;
  border-radius: 10px;

  h2 {
    color: #000;
  }
  li {
    a {
      color: #666;
      display: block;
      padding: 10px 0;
    }
    & + li a {
      border-top: 1px solid red;
    }
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
