import React from 'react';
import styled from '@emotion/styled';
import Modal from '@/components/feedback/Modal/Modal';
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

const Button = styled.button`
  padding: 8px 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0051c1;
  }

  &.secondary {
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background-color: #e5e5e5;
    }
  }

  &.danger {
    background-color: #e53e3e;

    &:hover {
      background-color: #c53030;
    }
  }
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
      ></Button>
    </Modal>
  );
};

// 메인 예제 페이지 컴포넌트
const ModalExample = () => {
  const { confirm, alert, modalList, modalOpen } = useModalStore();

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
      {JSON.stringify(modalList)}
    </Container>
  );
};

export default ModalExample;
