import useNumberStore from '@/store/numberStore';
import Button from '@/components/buttons/Button/Button';
import useSWR from 'swr';
import { withSSRProps } from '@/lib/axiosInstance';

export const getServerSideProps = withSSRProps(() => {
  return ['/users'];
});

export default function Home({ initialData }) {
  const { number, increase, decrease, reset } = useNumberStore();
  const { data: users } = useSWR('/users', {
    fallbackData: initialData[`/users`],
  });

  console.log(users);

  return (
    <>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              {user.id}
              <br />
              {user.name}
              <br />
              {JSON.stringify(user)}
            </li>
          ))}
      </ul>

      <h1>Current Number: {number}</h1>
      <Button variant="primary" size="small" onClick={increase}>
        increase
      </Button>
      <Button variant="secondary" size="small" onClick={decrease}>
        decrease
      </Button>
      <Button variant="danger" size="small" onClick={reset}>
        Reset
      </Button>
      <Button variant="primary" size="small" disabled>
        disabled
      </Button>
    </>
  );
}
