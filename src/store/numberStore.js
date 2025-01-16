import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useNumberStore = create(
  persist(
    devtools(
      (set) => ({
        number: 0, // 초기 상태 값
        increase: () => set((state) => ({ number: state.number + 1 })), // 증가 함수
        decrease: () => set((state) => ({ number: state.number - 1 })), // 감소 함수
        reset: () => set({ number: 0 }), // 초기화 함수
      }),
      { name: 'NumberStore' } // Redux DevTools에서 표시될 이름
    ),
    {
      name: 'number-storage', // 로컬 스토리지 키 이름
      getStorage: () => localStorage, // 로컬 스토리지 사용 (기본값)
    }
  )
);

export default useNumberStore;
