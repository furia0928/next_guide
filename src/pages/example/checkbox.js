import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormField from '@/components/forms/FormField/FormField';
import Checkbox from '@/components/forms/Checkbox/Checkbox';
import CheckboxGroup from '@/components/forms/CheckboxGroup/CheckboxGroup';

// 유효성 검사 스키마 정의
const validationSchema = yup.object().shape({
  acceptTerms: yup
    .boolean()
    .required('약관에 동의해주세요')
    .oneOf([true], '약관에 동의해주세요'),
  newsletter: yup.boolean(),
  preferencesArray: yup
    .array()
    .of(yup.string())
    .test(
      'contains-required',
      '마케팅 정보 수신(필수)에 동의해주세요',
      (value) => value && value.includes('marketing')
    ),
  preferencesArray2: yup.array().of(yup.string()),
  preferencesObject: yup.object().shape({
    marketing: yup
      .boolean()
      .oneOf([true], '마케팅 정보 수신(필수)에 동의해주세요'),
    updates: yup.boolean(),
    notifications: yup.boolean(),
  }),
});

const CheckboxEx = () => {
  const [successMessage, setSuccessMessage] = useState('');

  // 체크박스 그룹 옵션 정의
  const preferenceOptions = [
    {
      value: 'marketing',
      label: '마케팅 정보 수신 (필수)',
      required: true,
      helperText: '신제품 정보 및 할인 혜택을 받아보세요',
    },
    {
      value: 'updates',
      label: '업데이트 알림',
    },
    {
      value: 'notifications',
      label: '이메일 알림',
      helperText:
        '계정 활동, 보안 알림 및 기타 중요한 알림을 이메일로 받습니다',
    },
  ];

  // 폼 초기화
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      acceptTerms: false,
      newsletter: false,
      // 배열 형태 초기값
      preferencesArray: ['updates'],
      preferencesArray2: [],
      // 객체 형태 초기값
      preferencesObject: {
        marketing: false,
        updates: true,
        notifications: false,
      },
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = formMethods;

  // 폼 값 변경 모니터링
  const formValues = watch();

  // 폼 제출 처리
  const onSubmit = (data) => {
    // 폼 제출 처리 (API 호출을 시뮬레이션)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', data);
        setSuccessMessage('폼이 성공적으로 제출되었습니다!');

        // 3초 후 성공 메시지 제거
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);

        resolve(data);
      }, 1000);
    });
  };

  // 폼 초기화
  const handleReset = () => {
    reset();
    setSuccessMessage('');
  };

  return (
    <Container>
      <h1>체크박스 그룹 컴포넌트 예제</h1>

      {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}

      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div>
            <Section>
              <h2>기본 체크박스</h2>
              <FormField
                name="acceptTerms"
                validationMessage="✓ 약관에 동의하셨습니다"
                fullWidth
              >
                <Checkbox label="이용약관에 동의합니다 (필수)" required />
              </FormField>

              <FormField
                name="newsletter"
                label="뉴스레터를 구독합니다 (선택)"
                validationMessage="✓ 뉴스레터 구독이 설정되었습니다"
                fullWidth
              >
                <Checkbox />
              </FormField>
            </Section>

            <Section>
              <h2>체크박스 그룹 (배열 방식)</h2>
              <p>
                {`선택된 값들이 배열 형태로 저장됩니다: ['marketing', 'updates']`}
              </p>
              <FormField
                name="preferencesArray"
                fullWidth
                validationMessage="✓ 선호 설정이 저장되었습니다"
              >
                <CheckboxGroup
                  options={preferenceOptions}
                  valueType="array"
                  fullWidth
                />
              </FormField>
            </Section>

            <Section>
              <h2>체크박스 그룹 (객체 방식)</h2>
              <p>
                선택된 값들이 객체 형태로 저장됩니다:{' '}
                {`{ marketing: true, updates: true }`}
              </p>
              <FormField
                name="preferencesObject"
                fullWidth
                validationMessage="✓ 선호 설정이 저장되었습니다"
              >
                <CheckboxGroup
                  options={preferenceOptions}
                  valueType="object"
                  fullWidth
                />
              </FormField>
            </Section>

            <Section>
              <h2>수평 레이아웃 체크박스 그룹</h2>
              <FormField name="preferencesArray2" fullWidth>
                <CheckboxGroup
                  options={[
                    { value: 'option1', label: '옵션 1' },
                    { value: 'option2', label: '옵션 2' },
                    { value: 'option3', label: '옵션 3' },
                  ]}
                  layout="horizontal"
                  fullWidth
                />
              </FormField>
            </Section>

            <Section>
              <h2>비활성화된 체크박스</h2>
              <Checkbox
                name="disabled"
                label="이 체크박스는 비활성화되어 있습니다"
                disabled
                checked
              />
            </Section>

            <ButtonGroup>
              <SubmitButton type="submit" disabled={!isDirty || !isValid}>
                제출하기
              </SubmitButton>
              <ResetButton
                type="button"
                onClick={handleReset}
                disabled={!isDirty}
              >
                초기화
              </ResetButton>
            </ButtonGroup>
          </div>
          <div>
            <div style={{ position: 'sticky', top: '10px' }}>
              <Section>
                <h2>현재 폼 데이터</h2>
                <CodePreview>{JSON.stringify(formValues, null, 2)}</CodePreview>
              </Section>
            </div>
          </div>
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

  p {
    margin-bottom: 16px;
    font-size: 14px;
    color: #666;
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

const CodePreview = styled.pre`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
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

export default CheckboxEx;
