import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/components/forms/Input/Input';
import FormField from '@/components/forms/FormField';

// 유효성 검사 스키마 정의
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('사용자 이름은 필수입니다')
    .min(4, '사용자 이름은 최소 4자 이상이어야 합니다')
    .max(20, '사용자 이름은 최대 20자까지 가능합니다'),
  email: yup
    .string()
    .required('이메일은 필수입니다')
    .email('유효한 이메일 형식이 아닙니다'),
  password: yup
    .string()
    .required('비밀번호는 필수입니다')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다'
    ),
  disabled: yup.string(),
});

const InputEx = () => {
  const [successMessage, setSuccessMessage] = useState('');

  // 폼 초기화
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      disabled: '이 필드는 비활성화되어 있습니다',
    },
  });

  const {
    handleSubmit,
    reset,
    trigger,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isValid,
      isDirty,
      submitCount,
    },
  } = formMethods;

  // 현재 폼 값을 관찰
  const values = formMethods.watch();

  // 제출 성공 후 처리
  useEffect(() => {
    if (formMethods.isSubmitSuccessful) {
      setSuccessMessage('폼이 성공적으로 제출되었습니다!');

      // 3초 후 성공 메시지 제거
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [formMethods.isSubmitSuccessful]);

  const onSubmit = (data) => {
    // 폼 제출 처리 (API 호출을 시뮬레이션)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', data);
        resolve(data);
      }, 1500); // 1.5초 지연
    });
  };

  // 폼 초기화
  const handleReset = () => {
    reset();
    setSuccessMessage('');
  };

  // 특정 필드만 유효성 검사 트리거
  const validateField = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <Container>
      <h1>Input 컴포넌트 예제 (Yup 유효성 검사 적용)</h1>

      {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}

      <FormStatusBar>
        <FormStatusItem className={isDirty ? 'active' : ''}>
          변경됨: {isDirty ? 'Yes' : 'No'}
        </FormStatusItem>
        <FormStatusItem className={isValid ? 'valid' : ''}>
          유효함: {isValid ? 'Yes' : 'No'}
        </FormStatusItem>
        <FormStatusItem>제출 시도: {submitCount}</FormStatusItem>
      </FormStatusBar>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Section>
            <h2>기본 입력 필드</h2>
            <FormField
              name="username"
              label="사용자 이름"
              validationMessage="✓ 올바른 형식입니다"
              fullWidth
            >
              <Input
                placeholder="사용자 이름을 입력하세요"
                required
                fullWidth
              />
            </FormField>
          </Section>

          <Section>
            <h2>유효성 검사 입력 필드</h2>
            <FormField
              name="email"
              label="이메일"
              validationMessage="✓ 올바른 이메일 형식입니다"
              fullWidth
            >
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                required
                fullWidth
              />
            </FormField>
          </Section>

          <Section>
            <h2>필수 입력 필드</h2>
            <FormField
              name="password"
              label="비밀번호"
              validationMessage="✓ 안전한 비밀번호입니다"
              fullWidth
            >
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                helperText="대문자, 소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요"
                required
                fullWidth
              />
            </FormField>
          </Section>

          <Section>
            <h2>비활성화된 입력 필드</h2>
            <FormField name="disabled" label="비활성화됨" fullWidth>
              <Input disabled fullWidth />
            </FormField>
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
            <h2>폼 상태 정보</h2>
            <FormInfoGrid>
              <FormInfoItem>
                <h3>터치된 필드</h3>
                <InfoValue>
                  {Object.keys(touchedFields).join(', ') || '없음'}
                </InfoValue>
              </FormInfoItem>
              <FormInfoItem>
                <h3>변경된 필드</h3>
                <InfoValue>
                  {Object.keys(dirtyFields).join(', ') || '없음'}
                </InfoValue>
              </FormInfoItem>
              <FormInfoItem>
                <h3>오류 있는 필드</h3>
                <InfoValue>
                  {Object.keys(errors).join(', ') || '없음'}
                </InfoValue>
              </FormInfoItem>
            </FormInfoGrid>

            <ValidationStatus error={Object.keys(errors).length > 0}>
              <h3>유효성 검사 상태</h3>
              <ul>
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>
                    <strong>{field}:</strong> {error.message}
                  </li>
                ))}
                {Object.keys(errors).length === 0 && (
                  <li className="success">모든 필드가 유효합니다</li>
                )}
              </ul>
            </ValidationStatus>
            <CodePreview>{JSON.stringify(values, null, 2)}</CodePreview>
          </Section>

          <ButtonGroup>
            <SubmitButton
              type="submit"
              disabled={!isDirty || !isValid || formMethods.isSubmitting}
            >
              {formMethods.isSubmitting ? '제출 중...' : '제출하기'}
            </SubmitButton>
            <ResetButton
              type="button"
              onClick={handleReset}
              disabled={!isDirty && !formMethods.isSubmitSuccessful}
            >
              초기화
            </ResetButton>
          </ButtonGroup>
        </form>
      </FormProvider>
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

  .field-error {
    input {
      border-color: #dc3545;
    }
  }

  .field-valid {
    input {
      border-color: #28a745;
    }
  }
`;

const FieldStatus = styled.div`
  font-size: 12px;
  margin-top: 4px;

  &.valid {
    color: #28a745;
  }

  &.error {
    color: #dc3545;
  }
`;

const FormStatusBar = styled.div`
  display: flex;
  gap: 15px;
  background-color: #f8f9fa;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FormStatusItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #e9ecef;

  &.active {
    background-color: #cfe2ff;
    color: #0a58ca;
  }

  &.valid {
    background-color: #d1e7dd;
    color: #0f5132;
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

const FormInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const FormInfoItem = styled.div`
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 4px;

  h3 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #6c757d;
  }
`;

const InfoValue = styled.div`
  font-size: 14px;
  word-break: break-all;
`;

const CodePreview = styled.pre`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
`;

const ValidationStatus = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border-left: 4px solid ${(props) => (props.error ? '#dc3545' : '#28a745')};
  transition: border-color 0.3s ease;

  h3 {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 4px;
    color: #dc3545;
  }

  li.success {
    color: #28a745;
  }
`;

const SuccessAlert = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #d1e7dd;
  color: #0f5132;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
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
  transition: all 0.2s;
  flex: 1;

  &:hover:not(:disabled) {
    background-color: #1976d2;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ResetButton = styled.button`
  background-color: #e9ecef;
  color: #495057;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;

  &:hover:not(:disabled) {
    background-color: #dee2e6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(73, 80, 87, 0.2);
  }

  &:disabled {
    color: #adb5bd;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default InputEx;
