import useNumberStore from '@/store/numberStore';

export default function Home() {
  const { number, increase, decrease, reset } = useNumberStore();

  return (
    <div>
      <h1>Current Number: {number}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
