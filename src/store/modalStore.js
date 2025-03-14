import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v1 } from 'uuid';

export const useModalStore = create(
  devtools(
    (set, get) => ({
      // 모달 목록
      modalList: [],
      modalSpeed: 1000,

      alert: async ({ title, text, modalSpeed = 1000 }) => {
        const uuid = v1();
        const { modalList } = get();
        return new Promise((resolve, reject) => {
          set({
            modalList: [
              ...modalList,
              {
                name: `alert-${uuid}`,
                visible: true,
                resolve,
                title,
                text,
              },
            ],
            modalSpeed,
          });
        });
      },

      confirm: async ({ title, text, modalSpeed = 1000 }) => {
        const uuid = v1();
        const { modalList } = get();
        return new Promise((resolve, reject) => {
          set({
            modalList: [
              ...modalList,
              {
                name: `alert-${uuid}`,
                visible: true,
                resolve,
                title,
                text,
                confirm: true,
              },
            ],
            modalSpeed,
          });
        });
      },

      modalOpen: async (
        modalName = '',
        { modalSpeed = 1000, callback } = {}
      ) => {
        const { modalList } = get();
        try {
          if (modalList.some((modal) => modal.name === modalName))
            throw '이미 열려있는 모달';
          if (!modalName) throw '모달 이름 입력';
          return new Promise((resolve, reject) => {
            set({
              modalList: [
                ...modalList,
                {
                  name: modalName,
                  visible: true,
                  resolve,
                },
              ],
              modalSpeed,
            });
            setTimeout(() => {
              if (callback) callback();
            }, modalSpeed);
          });
        } catch (e) {
          console.error(e);
        }
      },

      modalClose: async (
        modalName = '',
        { modalSpeed = 1000, confirm = false, callback } = {}
      ) => {
        try {
          const { modalList } = get();
          if (modalName === '') throw '모달 이름 입력';
          const modal = modalList.find((modal) => modal.name === modalName);
          if (!modal) throw '없는 모달 닫음';

          modal.visible = false;
          const resolve = modal.resolve;

          await set({
            modalList: modalList.map((modal) => ({ ...modal })),
            modalSpeed: modalSpeed,
          });

          setTimeout(() => {
            resolve(confirm);
            set({
              modalList: modalList.filter((modal) => modal.name !== modalName),
              modalSpeed: 1000,
            });
            if (callback) callback();
          }, modalSpeed);
        } catch (e) {
          console.error(e);
        }
      },

      // 모든 모달 닫기
      modalCloseAll: () => {
        set({ modalList: [] });
      },
    }),
    { name: 'modal-store' }
  )
);
