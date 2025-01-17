import useSWR from 'swr';
import { PostsComments } from '@/components/ui/PostsComments';
import { withSSRProps } from '@/lib/axiosInstance';
import Button from '@/components/common/Button';
import Tabs from '@/components/common/Tabs';
import useNumberStore from '@/store/numberStore';
import { useState } from 'react';

const tabsData = [{ label: '탭 1' }, { label: '탭 2' }, { label: '탭 3' }];

export const getServerSideProps = withSSRProps((context) => {
  const { id } = context.query;
  return [`/posts/${id}`, `/posts/${id}/comments`];
});

export default function BoardDetail({ initialData, query }) {
  const { id, tab } = query;
  const [activeIndex, setActiveIndex] = useState(tab || 0);
  const { number, increase, decrease, reset } = useNumberStore();

  console.log(123123, id, tab);

  const { data: posts } = useSWR(`/posts/${id}`, {
    fallbackData: initialData[`/posts/${id}`],
  });
  const { data: postsComments } = useSWR(`/posts/${id}/comments`, {
    fallbackData: initialData[`/posts/${id}/comments`],
  });

  return (
    <>
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
      <Tabs tabs={tabsData} initIndex={tab} onTabChange={setActiveIndex} />
      {activeIndex}
      <h2>{posts.title}</h2>
      <p>{posts.body}</p>
      <PostsComments postsComments={postsComments} />
    </>
  );
}
