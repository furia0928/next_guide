import { withSSRProps } from '@/lib/axiosInstance';
import useSWR from 'swr';

export const getServerSideProps = withSSRProps(async (context, user) => {
  return {
    props: { user },
  };
});

const UserPage = ({ user }) => {
  const {
    data: swrUser,
    isLoading,
    isError,
  } = useSWR('/user', {
    fallbackData: user, // 서버 데이터를 초기 값으로 설정
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user data.</p>;

  const displayedUser = swrUser || user;

  return (
    <div>
      <h1>Welcome, {displayedUser.name}</h1>
      <p>Email: {displayedUser.email}</p>
    </div>
  );
};

export default UserPage;
