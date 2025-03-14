import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Radio from '@/components/forms/Radio/Radio';
import FormField from '@/components/forms/FormField/FormField';
import { theme } from '@/styles/theme';

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

      {successMessage && <div className="success-alert">{successMessage}</div>}

      <div className="form-status-bar">
        <div className={`form-status-item ${isDirty ? 'active' : ''}`}>
          변경됨: {isDirty ? 'Yes' : 'No'}
        </div>
        <div className={`form-status-item ${isValid ? 'valid' : ''}`}>
          유효함: {isValid ? 'Yes' : 'No'}
        </div>
        <div className="form-status-item">제출 시도: {submitCount}</div>
      </div>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="section">
            <h2>기본 라디오 버튼</h2>
            <FormField
              name="gender"
              label="성별"
              validationMessage="✓ 성별이 선택되었습니다"
            >
              <div className="radio-group">
                <Radio
                  id="male"
                  name="gender"
                  value="male"
                  label="남성"
                  required
                  error={!!errors.gender}
                  helperText={errors.gender ? errors.gender.message : null}
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
              </div>
            </FormField>
          </section>

          <section className="section">
            <h2>가로 정렬 라디오 버튼</h2>
            <FormField
              name="subscription"
              label="구독 방식"
              validationMessage="✓ 구독 방식이 선택되었습니다"
            >
              <div className="horizontal-radio-group">
                <Radio
                  id="monthly"
                  name="subscription"
                  value="monthly"
                  label="월간 구독"
                  error={!!errors.subscription}
                  helperText={errors.subscription ? errors.subscription.message : null}
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
              </div>
            </FormField>
          </section>

          <section className="section">
            <h2>비활성화된 라디오 버튼</h2>
            <div className="radio-group">
              <Radio
                id="contact-email"
                name="contactPreference"
                value="email"
                label="이메일로 연락 (추천)"
                helperText="가장 빠른 응답을 받을 수 있는 방법입니다."
                {...formMethods.register('contactPreference')}
                checked={values.contactPreference === 'email'}
              />
              <Radio
                id="contact-phone"
                name="contactPreference"
                value="phone"
                label="전화로 연락"
                helperText="영업일 기준 1-2일 내에 연락드립니다."
                {...formMethods.register('contactPreference')}
                checked={values.contactPreference === 'phone'}
              />
              <Radio
                id="contact-mail"
                name="contactPreference"
                value="mail"
                label="우편으로 연락 (현재 불가능)"
                disabled
                helperText="현재 지원하지 않는 연락 방식입니다."
                {...formMethods.register('contactPreference')}
                checked={values.contactPreference === 'mail'}
              />
            </div>
          </section>

          <section className="section">
            <h2>스타일 변형</h2>
            <FormField
              name="experience"
              label="개발 경험 수준"
              validationMessage="✓ 경험 수준이 선택되었습니다"
            >
              <div className="styled-radio-group">
                <label className={`styled-radio-item ${values.experience === 'beginner' ? 'selected' : ''}`}>
                  <Radio
                    id="beginner"
                    name="experience"
                    value="beginner"
                    label="초보자"
                    error={!!errors.experience}
                    required
                    helperText={values.experience === 'beginner' ? "초보자를 위한 기본 과정을 추천합니다." : null}
                    {...formMethods.register('experience')}
                    checked={values.experience === 'beginner'}
                  />
                  <div className="radio-description">
                    프로그래밍 경험이 1년 미만입니다.
                  </div>
                </label>

                <label className={`styled-radio-item ${values.experience === 'intermediate' ? 'selected' : ''}`}>
                  <Radio
                    id="intermediate"
                    name="experience"
                    value="intermediate"
                    label="중급자"
                    error={!!errors.experience}
                    helperText={values.experience === 'intermediate' ? "중급자를 위한 심화 과정을 추천합니다." : null}
                    {...formMethods.register('experience')}
                    checked={values.experience === 'intermediate'}
                  />
                  <div className="radio-description">
                    프로그래밍 경험이 1-3년 정도입니다.
                  </div>
                </label>

                <label className={`styled-radio-item ${values.experience === 'advanced' ? 'selected' : ''}`}>
                  <Radio
                    id="advanced"
                    name="experience"
                    value="advanced"
                    label="고급자"
                    error={!!errors.experience}
                    helperText={values.experience === 'advanced' ? "고급자를 위한 전문가 과정을 추천합니다." : null}
                    {...formMethods.register('experience')}
                    checked={values.experience === 'advanced'}
                  />
                  <div className="radio-description">
                    프로그래밍 경험이 3년 이상입니다.
                  </div>
                </label>
              </div>
            </FormField>
          </section>

          <section className="section">
            <h2>전체 너비 라디오 버튼</h2>
            <div className="radio-group">
              <Radio
                id="full-width-radio"
                name="fullWidthRadio"
                value="full-width"
                label="전체 너비 라디오 버튼"
                fullWidth
                helperText="이 라디오 버튼은 부모 컨테이너의 전체 너비를 차지합니다."
              />
            </div>
          </section>

          <section className="section">
            <h2>에러 상태 라디오 버튼</h2>
            <div className="radio-group">
              <Radio
                id="error-radio"
                name="errorRadio"
                value="error"
                label="에러 상태 라디오 버튼"
                error={true}
                helperText="이 라디오 버튼은 에러 상태를 보여줍니다."
              />
            </div>
          </section>

          <section className="section">
            <h2>폼 상태 정보</h2>
            <div className="form-info-grid">
              <div className="form-info-item">
                <h3>터치된 필드</h3>
                <div className="info-value">
                  {Object.keys(touchedFields).join(', ') || '없음'}
                </div>
              </div>
              <div className="form-info-item">
                <h3>변경된 필드</h3>
                <div className="info-value">
                  {Object.keys(dirtyFields).join(', ') || '없음'}
                </div>
              </div>
              <div className="form-info-item">
                <h3>오류 있는 필드</h3>
                <div className="info-value">
                  {Object.keys(errors).join(', ') || '없음'}
                </div>
              </div>
            </div>

            <div className={`validation-status ${Object.keys(errors).length > 0 ? 'error' : ''}`}>
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
            </div>
            <pre className="code-preview">{JSON.stringify(values, null, 2)}</pre>
          </section>

          <div className="button-group">
            <button
              className="submit-button"
              type="submit"
              disabled={!isDirty || !isValid || formMethods.isSubmitting}
            >
              {formMethods.isSubmitting ? '제출 중...' : '제출하기'}
            </button>
            <button
              className="reset-button"
              type="button"
              onClick={handleReset}
              disabled={!isDirty && !formMethods.isSubmitSuccessful}
            >
              초기화
            </button>
          </div>
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

  h1 {
    margin-bottom: 2rem;
    font-size: 2.4rem;
    font-weight: 700;
  }

  .success-alert {
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
  }

  .form-status-bar {
    display: flex;
    gap: 1.5rem;
    background-color: ${theme.colors.gray100};
    padding: 1.2rem 1.6rem;
    border-radius: 0.4rem;
    margin-bottom: 2.4rem;
    flex-wrap: wrap;

    .form-status-item {
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
    }
  }

  .section {
    margin-bottom: 4rem;

    h2 {
      margin-bottom: 1.6rem;
      font-size: 1.8rem;
      font-weight: 600;
    }
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .horizontal-radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .styled-radio-group {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    .styled-radio-item {
      padding: 1.6rem;
      border: 0.1rem solid ${theme.colors.gray300};
      border-radius: 0.8rem;
      transition: all 0.2s ease-in-out;
      background-color: ${theme.colors.white};

      &.selected {
        border-color: ${theme.colors.primary};
        background-color: rgba(234, 81, 30, 0.05);
      }

      .radio-description {
        margin-top: 0.8rem;
        margin-left: 3rem;
        font-size: 1.4rem;
        color: ${theme.colors.gray600};
      }
    }
  }

  .form-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    gap: 1.6rem;
    margin-bottom: 2rem;

    .form-info-item {
      background-color: ${theme.colors.gray100};
      padding: 1.2rem;
      border-radius: 0.4rem;

      h3 {
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 0.8rem;
        color: ${theme.colors.gray700};
      }

      .info-value {
        font-size: 1.4rem;
        word-break: break-all;
      }
    }
  }

  .validation-status {
    margin-bottom: 1.6rem;
    padding: 1.6rem;
    background-color: ${theme.colors.gray100};
    border-radius: 0.4rem;
    border-left: 0.4rem solid ${theme.colors.success};
    transition: border-color 0.3s ease;

    &.error {
      border-left-color: ${theme.colors.error};
    }

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

      &.success {
        color: ${theme.colors.success};
      }
    }
  }

  .code-preview {
    background-color: ${theme.colors.gray100};
    padding: 1.6rem;
    border-radius: 0.4rem;
    font-family: 'Courier New', monospace;
    font-size: 1.4rem;
    overflow-x: auto;
  }

  .button-group {
    display: flex;
    gap: 1.6rem;

    @media (max-width: 480px) {
      flex-direction: column;
    }

    .submit-button {
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
    }

    .reset-button {
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
    }
  }
`;

export default RadioEx; 