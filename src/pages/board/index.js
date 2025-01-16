import useSWR from 'swr';
import { withSSRProps } from '@/lib/axiosInstance';
import { css } from '@emotion/react';
import Header from '@/components/layout/Header';
import { Posts } from '@/components/ui/Posts';
import { Users } from '@/components/ui/Users';

const container = css`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .title {
    border-bottom: 1px solid red;
    margin-bottom: 50px;
    padding-bottom: 50px;
  }
`;

export const getServerSideProps = withSSRProps(() => [`/users`, `/posts`]);

export default function Board({ initialData }) {
  const {
    data: posts,
    error,
    mutate,
  } = useSWR('/posts', {
    fallbackData: initialData['/posts'],
  });
  const { data: users } = useSWR('/users', {
    fallbackData: initialData['/users'],
  });

  if (error) return <div>Failed to load posts</div>;
  if (!posts) return <div>Loading...</div>;

  return (
    <div css={container}>
      <Header />
      <h1 className="title">Board</h1>
      <Users users={users} />
      <Posts posts={posts} />
    </div>
  );
}
