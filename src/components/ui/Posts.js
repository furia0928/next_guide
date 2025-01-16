import Link from 'next/link';

export const Posts = ({ posts }) => {
  return (
    <>
      <h2>posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/board/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
