import useSWR from 'swr';
import { Posts } from '@/components/ui/Posts';
import { Users } from '@/components/ui/Users';
import { withSSRProps } from '@/lib/axiosInstance';
import useNumberStore from '@/store/numberStore';

export const getServerSideProps = withSSRProps(() => {
  return ['/posts', '/users'];
});

export default function Board({ initialData }) {
  const { number, increase, decrease, reset } = useNumberStore();
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

  return (
    <>
      <h1 className="title">Board</h1>
      <h1>Current Number: {number}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={reset}>Reset</button>
      <Users users={users} />
      <Posts posts={posts} />
    </>
  );
}
