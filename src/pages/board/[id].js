import useSWR from 'swr';
import { withSSRProps } from '@/lib/axiosInstance';
import { css } from '@emotion/react';
import Header from '@/components/layout/Header';
import { Posts } from '@/components/ui/Posts';
import { Users } from '@/components/ui/Users';
import { useRouter } from 'next/router';

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
export const getServerSideProps = withSSRProps((context) => {
  const { id } = context.query;
  return [`/posts/${id}`];
});

export default function BoardDetail({ initialData }) {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: posts,
    error,
    mutate,
  } = useSWR(`/posts/${id}`, {
    fallbackData: initialData[`/posts/${id}`],
  });

  return (
    <div css={container}>
      <Header />
      <h1 className="title">Board</h1>
      <h2>{posts.title}</h2>
      <p>{posts.body}</p>
    </div>
  );
}
