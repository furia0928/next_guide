import useSWR from 'swr';
import { fetchSSRData } from '@/lib/axiosInstance';
import { Posts } from '@/components/ui/Posts';
import { Users } from '@/components/ui/Users';

export const getServerSideProps = fetchSSRData(() => {
  return ['/posts', '/users'];
});

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
    <>
      <h1 className="title">Board</h1>
      <Users users={users} />
      <Posts posts={posts} />
    </>
  );
}
