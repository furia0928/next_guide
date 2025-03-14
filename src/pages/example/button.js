import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/buttons/Button/Button';

const ButtonExample = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Container>
      <h1>버튼 컴포넌트 예제</h1>

      <Section>
        <h2>버튼 변형</h2>
        <ButtonGroup>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="text">Text Button</Button>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>버튼 크기</h2>
        <ButtonGroup>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>비활성화 상태</h2>
        <ButtonGroup>
          <Button disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>전체 너비</h2>
        <Button fullWidth>Full Width Button</Button>
      </Section>

      <Section>
        <h2>아이콘 버튼</h2>
        <ButtonGroup>
          <Button
            icon={
              <IconSvg viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.3 9 11.8l3 1.2 3-1.2 4.5 8.5L12 2z" />
              </IconSvg>
            }
            iconPosition="left"
          >
            Icon Left
          </Button>
          <Button
            variant="secondary"
            icon={
              <IconSvg viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.3 9 11.8l3 1.2 3-1.2 4.5 8.5L12 2z" />
              </IconSvg>
            }
            iconPosition="right"
          >
            Icon Right
          </Button>
        </ButtonGroup>
      </Section>

      <Section>
        <h2>로딩 상태</h2>
        <Button isLoading={isLoading} onClick={handleLoadingClick}>
          {isLoading ? '로딩 중...' : '로딩 시작'}
        </Button>
      </Section>
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Pretendard', sans-serif;
`;

const Section = styled.section`
  margin-bottom: 40px;

  h2 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const IconSvg = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
`;

export default ButtonExample;
