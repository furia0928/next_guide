import React from 'react';
import styled from '@emotion/styled';
import Modal from '@/components/feedback/Modal/Modal';
import Button from '@/components/buttons/Button/Button';
import { useModalStore } from '@/store/modalStore';

// 스타일드 컴포넌트
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

// 기본 모달 컴포넌트
const BasicModal = () => {
  const { alert } = useModalStore();
  return (
    <Modal name={'basic-modal'}>
      <p>이것은 useModal 훅을 사용한 기본 모달입니다.</p>
      <p>모달 스토어로 상태를 관리하여 어디서든 열고 닫을 수 있습니다.</p>
      <Button
        onClick={() => {
          alert({ title: 'asdfasdf' });
        }}
      >
        알랏
      </Button>
    </Modal>
  );
};

// 메인 예제 페이지 컴포넌트
const ModalExample = () => {
  const { confirm, alert, modalList, modalOpen, modalZIndex } = useModalStore();

  return (
    <Container>
      <h1>모달 컴포넌트 예제</h1>
      <p>
        이 예제는 Zustand와 useModal 훅을 활용한 모달 시스템을 보여줍니다. 여러
        개의 모달을 동시에 관리하고, 중첩된 모달도 표시할 수 있습니다.
      </p>

      <Section>
        <h2>기본 모달</h2>
        <p>모달 스토어와 useModal 훅을 사용한 기본 모달 예시입니다.</p>
        <ButtonGroup>
          <Button
            onClick={async () => {
              await alert({
                title: '가나다라마바사아자차카타파하',
                text: '가나다라마바사아자차카타파하',
              });
            }}
          >
            useModal 훅으로 열기
          </Button>
          <Button
            onClick={async () => {
              await modalOpen('basic-modal');
            }}
          >
            useModal 훅으로 열기
          </Button>
          <Button
            onClick={async () => {
              await alert({
                title: '가나다라마바사아자차카타파하',
                text: '가나다라마바사아자차카타파하',
              });
              const test = await confirm({
                title: '가나다라마바사아자차카타파하',
                text: '가나다라마바사아자차카타파하',
              });
              if (test) {
                await modalOpen('basic-modal', {
                  callback: () => {
                    console.log('modal open');
                  },
                });
              }
              console.log('end');
            }}
          >
            useModal 훅으로 열기2
          </Button>
        </ButtonGroup>
      </Section>
      <BasicModal />
    </Container>
  );
};

export default ModalExample;
