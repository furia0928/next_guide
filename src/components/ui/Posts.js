import Link from 'next/link';
import { PostsContainer } from './Posts.styles';

export const Posts = ({ posts }) => {
  return (
    <PostsContainer>
      <h2>posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/board/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </PostsContainer>
  );
};
