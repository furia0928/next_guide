import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';

const InputExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: 'onBlur', // 포커스가 빠질 때 유효성 검사
    defaultValues: {
      username: '',
      email: '',
      password: '',
      disabled: 'This input is disabled',
    },
  });

  // 현재 폼 값을 관찰
  const values = watch();

  const onSubmit = (data) => {
    // 폼 제출 처리
    console.log('Form submitted:', data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Container>
      <h1>Input 컴포넌트 예제 (React Hook Form 적용)</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <h2>기본 입력 필드</h2>
          <Input
            label="사용자 이름"
            {...register('username')}
            placeholder="사용자 이름을 입력하세요"
            fullWidth
          />
        </Section>

        <Section>
          <h2>유효성 검사 입력 필드</h2>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            {...register('email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '유효한 이메일 주소를 입력해주세요',
              },
            })}
            error={errors.email?.message}
            fullWidth
          />
        </Section>

        <Section>
          <h2>필수 입력 필드</h2>
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상이어야 합니다',
              },
            })}
            error={errors.password?.message}
            helperText="8자 이상의 비밀번호를 입력해주세요"
            required
            fullWidth
          />
        </Section>

        <Section>
          <h2>비활성화된 입력 필드</h2>
          <Input
            label="비활성화됨"
            {...register('disabled')}
            disabled
            fullWidth
          />
        </Section>

        <Section>
          <h2>다양한 크기</h2>
          <SizeWrapper>
            <Input
              label="작은 크기"
              placeholder="Small"
              size="small"
              className="size-input"
            />
            <Input
              label="중간 크기"
              placeholder="Medium"
              size="medium"
              className="size-input"
            />
            <Input
              label="큰 크기"
              placeholder="Large"
              size="large"
              className="size-input"
            />
          </SizeWrapper>
        </Section>

        <Section>
          <h2>폼 데이터</h2>
          <CodePreview>{JSON.stringify(values, null, 2)}</CodePreview>
        </Section>

        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </Container>
  );
};

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

const SizeWrapper = styled.div`
  display: flex;
  gap: 16px;

  .size-input {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CodePreview = styled.pre`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
`;

const SubmitButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976d2;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
  }
`;

export default InputExample;
