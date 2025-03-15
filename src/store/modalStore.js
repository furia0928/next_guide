import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v1 } from 'uuid';

const speed = 300;

export const useModalStore = create(
  devtools(
    (set, get) => ({
      // 모달 목록
      modalList: [],
      modalSpeed: speed,

      alert: async ({ title, text, modalSpeed = speed }) => {
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

      confirm: async ({ title, text, modalSpeed = speed }) => {
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
        { modalSpeed = speed, callback } = {}
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
        { modalSpeed = speed, confirm = false, callback } = {}
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
              modalSpeed: speed,
            });
            if (callback) callback();
          }, modalSpeed);
        } catch (e) {
          console.error(e);
        }
      },

      // 모든 모달 닫기
      modalCloseAll: () => {
        const { modalList } = get();
        // 모든 모달의 resolve 함수 호출
        modalList.forEach((modal) => {
          if (modal.resolve) {
            modal.resolve(false);
          }
        });

        set({
          modalList: [],
        });
      },
    }),
    { name: 'modal-store' }
  )
);
