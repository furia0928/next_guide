import useSWR from 'swr';
import { fetchSSRData } from '@/lib/axiosInstance';
import { useRouter } from 'next/router';
import { PostsComments } from '@/components/ui/PostsComments';

export const getServerSideProps = fetchSSRData((context) => {
  const { id } = context.query;
  return [`/posts/${id}`, `/posts/${id}/comments`];
});

export default function BoardDetail({ initialData }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: posts } = useSWR(`/posts/${id}`, {
    fallbackData: initialData[`/posts/${id}`],
  });
  const { data: postsComments } = useSWR(`/posts/${id}/comments`, {
    fallbackData: initialData[`/posts/${id}/comments`],
  });

  return (
    <>
      <h1 className="title">Board</h1>
      <h2>{posts.title}</h2>
      <p>{posts.body}</p>
      <PostsComments postsComments={postsComments} />
    </>
  );
}
