import useNumberStore from '@/store/numberStore';
import Button from '@/components/common/Button';

export default function Home() {
  const { number, increase, decrease, reset } = useNumberStore();

  return (
    <div>
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
    </div>
  );
}
