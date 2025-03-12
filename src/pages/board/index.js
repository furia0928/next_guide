import useSWR from 'swr';
import Button from '@/components/common/Button';
import Tabs from '@/components/common/Tabs';
import { Posts } from '@/components/ui/Posts';
import { Users } from '@/components/ui/Users';
import { withSSRProps } from '@/lib/axiosInstance';
import useNumberStore from '@/store/numberStore';
import { useState } from 'react';

const tabsData = [
  { label: '탭 1', content: <p>탭 1의 내용입니다.</p> },
  { label: '탭 2', content: <p>탭 2의 내용입니다.</p> },
  { label: '탭 3', content: <p>탭 3의 내용입니다.</p> },
];
export const getServerSideProps = withSSRProps(() => {
  return ['/posts', '/users'];
});

export default function Board({ initialData }) {
  const [activeIndex, setActiveIndex] = useState(0);
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
      <Tabs tabs={tabsData} initIndex={0} onTabChange={setActiveIndex} />
      {activeIndex}
      <Users users={users} />
      <Posts posts={posts} />
    </>
  );
}
