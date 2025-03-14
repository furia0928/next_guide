import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Radio from '@/components/forms/Radio';
import FormField from '@/components/forms/FormField/FormField';
import {  theme } from '@/styles/theme';

// 유효성 검사 스키마 정의
const validationSchema = yup.object().shape({
  gender: yup.string().required('성별을 선택해주세요'),
  subscription: yup.string().required('구독 방식을 선택해주세요'),
  experience: yup.string().required('경험 수준을 선택해주세요'),
  contactPreference: yup.string(),
});

const RadioEx = () => {
  const [successMessage, setSuccessMessage] = useState('');

  // 폼 초기화
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      gender: '',
      subscription: '',
      experience: '',
      contactPreference: '',
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
      <h1>Radio 컴포넌트 예제 (Yup 유효성 검사 적용)</h1>

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
            <h2>기본 라디오 버튼</h2>
            <FormField
              name="gender"
              label="성별"
              validationMessage="✓ 성별이 선택되었습니다"
            >
              <RadioGroup>
                <Radio
                  id="male"
                  name="gender"
                  value="male"
                  label="남성"
                  {...formMethods.register('gender')}
                  checked={values.gender === 'male'}
                />
                <Radio
                  id="female"
                  name="gender"
                  value="female"
                  label="여성"
                  {...formMethods.register('gender')}
                  checked={values.gender === 'female'}
                />
                <Radio
                  id="other"
                  name="gender"
                  value="other"
                  label="기타"
                  {...formMethods.register('gender')}
                  checked={values.gender === 'other'}
                />
              </RadioGroup>
            </FormField>
          </Section>

          <Section>
            <h2>가로 정렬 라디오 버튼</h2>
            <FormField
              name="subscription"
              label="구독 방식"
              validationMessage="✓ 구독 방식이 선택되었습니다"
            >
              <HorizontalRadioGroup>
                <Radio
                  id="monthly"
                  name="subscription"
                  value="monthly"
                  label="월간 구독"
                  {...formMethods.register('subscription')}
                  checked={values.subscription === 'monthly'}
                />
                <Radio
                  id="yearly"
                  name="subscription"
                  value="yearly"
                  label="연간 구독"
                  {...formMethods.register('subscription')}
                  checked={values.subscription === 'yearly'}
                />
                <Radio
                  id="lifetime"
                  name="subscription"
                  value="lifetime"
                  label="평생 구독"
                  {...formMethods.register('subscription')}
                  checked={values.subscription === 'lifetime'}
                />
              </HorizontalRadioGroup>
            </FormField>
          </Section>

          <Section>
            <h2>비활성화된 라디오 버튼</h2>
            <RadioGroup>
              <Radio
                id="contact-email"
                name="contactPreference"
                value="email"
                label="이메일로 연락 (추천)"
                {...formMethods.register('contactPreference')}
                checked={values.contactPreference === 'email'}
              />
              <Radio
                id="contact-phone"
                name="contactPreference"
                value="phone"
                label="전화로 연락"
                {...formMethods.register('contactPreference')}
                checked={values.contactPreference === 'phone'}
              />
              <Radio
                id="contact-mail"
                name="contactPreference"
                value="mail"
                label="우편으로 연락 (현재 불가능)"
                disabled
                {...formMethods.register('contactPreference')}
                checked={values.contactPreference === 'mail'}
              />
            </RadioGroup>
          </Section>

          <Section>
            <h2>스타일 변형</h2>
            <FormField
              name="experience"
              label="개발 경험 수준"
              validationMessage="✓ 경험 수준이 선택되었습니다"
            >
              <StyledRadioGroup>
                <StyledRadioItem isSelected={values.experience === 'beginner'}>
                  <Radio
                    id="beginner"
                    name="experience"
                    value="beginner"
                    label="초보자"
                    {...formMethods.register('experience')}
                    checked={values.experience === 'beginner'}
                  />
                  <RadioDescription>
                    프로그래밍 경험이 1년 미만입니다.
                  </RadioDescription>
                </StyledRadioItem>

                <StyledRadioItem isSelected={values.experience === 'intermediate'}>
                  <Radio
                    id="intermediate"
                    name="experience"
                    value="intermediate"
                    label="중급자"
                    {...formMethods.register('experience')}
                    checked={values.experience === 'intermediate'}
                  />
                  <RadioDescription>
                    프로그래밍 경험이 1-3년 정도입니다.
                  </RadioDescription>
                </StyledRadioItem>

                <StyledRadioItem isSelected={values.experience === 'advanced'}>
                  <Radio
                    id="advanced"
                    name="experience"
                    value="advanced"
                    label="고급자"
                    {...formMethods.register('experience')}
                    checked={values.experience === 'advanced'}
                  />
                  <RadioDescription>
                    프로그래밍 경험이 3년 이상입니다.
                  </RadioDescription>
                </StyledRadioItem>
              </StyledRadioGroup>
            </FormField>
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
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  font-family: 'Pretendard', sans-serif;
`;

const Section = styled.section`
  margin-bottom: 4rem;

  h2 {
    margin-bottom: 1.6rem;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HorizontalRadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const StyledRadioItem = styled.div`
  padding: 1.6rem;
  border: 0.1rem solid ${props => props.isSelected ? theme.colors.primary : theme.colors.gray300};
  border-radius: 0.8rem;
  transition: all 0.2s ease-in-out;
  background-color: ${props => props.isSelected ? 'rgba(234, 81, 30, 0.05)' : theme.colors.white};
`;

const RadioDescription = styled.div`
  margin-top: 0.8rem;
  margin-left: 3rem;
  font-size: 1.4rem;
  color: ${theme.colors.gray600};
`;

const FormStatusBar = styled.div`
  display: flex;
  gap: 1.5rem;
  background-color: ${theme.colors.gray100};
  padding: 1.2rem 1.6rem;
  border-radius: 0.4rem;
  margin-bottom: 2.4rem;
  flex-wrap: wrap;
`;

const FormStatusItem = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  background-color: ${theme.colors.gray200};

  &.active {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  &.valid {
    background-color: ${theme.colors.success};
    color: ${theme.colors.white};
  }
`;

const FormInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1.6rem;
  margin-bottom: 2rem;
`;

const FormInfoItem = styled.div`
  background-color: ${theme.colors.gray100};
  padding: 1.2rem;
  border-radius: 0.4rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    color: ${theme.colors.gray700};
  }
`;

const InfoValue = styled.div`
  font-size: 1.4rem;
  word-break: break-all;
`;

const CodePreview = styled.pre`
  background-color: ${theme.colors.gray100};
  padding: 1.6rem;
  border-radius: 0.4rem;
  font-family: 'Courier New', monospace;
  font-size: 1.4rem;
  overflow-x: auto;
`;

const ValidationStatus = styled.div`
  margin-bottom: 1.6rem;
  padding: 1.6rem;
  background-color: ${theme.colors.gray100};
  border-radius: 0.4rem;
  border-left: 0.4rem solid ${(props) => (props.error ? theme.colors.error : theme.colors.success)};
  transition: border-color 0.3s ease;

  h3 {
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 500;
  }

  ul {
    list-style: none;
    padding: 0;
    font-size: 1.4rem;  
  }

  li {
    margin-bottom: 0.4rem;
    color: ${theme.colors.error};
  }

  li.success {
    color: ${theme.colors.success};
  }
`;

const SuccessAlert = styled.div`
  margin-bottom: 2.4rem;
  padding: 1.6rem;
  background-color: ${theme.colors.success};
  color: ${theme.colors.white};
  border-radius: 0.4rem;
  font-weight: 500;
  text-align: center;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.6rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 0.4rem;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.primary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.3rem rgba(33, 150, 243, 0.3);
  }

  &:disabled {
    background-color: ${theme.colors.gray200};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ResetButton = styled.button`
  background-color: ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  border: none;
  border-radius: 0.4rem;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.gray200};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.3rem rgba(73, 80, 87, 0.2);
  }

  &:disabled {
    color: ${theme.colors.gray400};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default RadioEx; 