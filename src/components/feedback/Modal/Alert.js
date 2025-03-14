import Modal from '@/components/feedback/Modal/Modal';
import { useMemo } from 'react';
import { useModalStore } from '@/store/modalStore';
import Button from '@/components/buttons/Button/Button';

const Alert = () => {
  const { modalList, modalClose } = useModalStore();
  const alertArr = useMemo(() => {
    return modalList.filter((modal) => modal.name.includes('alert'));
  }, [modalList]);
  return (
    <>
      {alertArr.map((alertData, index) => {
        return (
          <Modal
            key={alertData.name}
            name={alertData.name}
            closeOnOverlayClick={false}
            closeOnEsc={false}
            showCloseButton={false}
            size="small"
            title={alertData?.title}
            footer={
              <div className="flex gap-2 ">
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
