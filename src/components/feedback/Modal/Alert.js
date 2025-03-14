import Modal from '@/components/feedback/Modal/Modal';
import { useMemo } from 'react';
import { useModalStore } from '@/store/modalStore';
import Button from '@/components/buttons/Button/Button';

const Alert = () => {
  const { modalList, modalClose } = useModalStore();

  const alertList = useMemo(() => {
    return modalList.filter((modal) => modal.name.includes('alert'));
  }, [modalList]);

  return (
    <>
      {alertList.map((alertData) => {
        return (
          <Modal
            key={alertData.name}
            size="small"
            name={alertData.name}
            closeOnOverlayClick={false}
            closeOnEsc={false}
            showCloseButton={false}
            title={alertData?.title}
            footer={
              <div>
                {alertData?.confirm && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      modalClose(alertData.name, { confirm: false })
                    }
                  >
                    취소
                  </Button>
                )}
                <Button
                  onClick={() => modalClose(alertData.name, { confirm: true })}
                >
                  확인
                </Button>
              </div>
            }
          >
            {alertData?.text}
          </Modal>
        );
      })}
    </>
  );
};
export default Alert;
