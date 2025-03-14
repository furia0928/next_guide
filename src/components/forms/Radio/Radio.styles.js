import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledRadio = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
  cursor: ${({ disabled }) => (disabled ? theme.cursor.notAllowed : theme.cursor.pointer)};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 실제 라디오 입력 (숨김) */
  .radio-input {
    position: absolute;
    opacity: 0;
    width: 2.4rem;
    height: 2.4rem;
    margin: 0;
    z-index: 1;
    cursor: inherit;

    &:focus + .radio-circle {
      box-shadow: 0 0 0 0.2rem ${theme.colors.secondary};
    }

    &:checked + .radio-circle {
      border-color: ${theme.colors.primary};
      
      &:after {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  /* 커스텀 라디오 원형 */
  .radio-circle {
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 0.2rem solid ${({ error }) => error ? theme.colors.error : theme.colors.gray600};
    background-color: ${theme.colors.white};
    transition: all 0.2s ease-in-out;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      margin: -0.5rem 0 0 -0.5rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: ${theme.colors.primary};
      opacity: 0;
      transition: all 0.2s ease-in-out;
    }
  }

  /* 라디오 버튼 호버 효과 */
  &:hover .radio-circle {
    border-color: ${({ disabled }) =>
      disabled ? theme.colors.gray600 : theme.colors.primary};
  }

  /* 라디오 레이블 */
  .radio-label {
    font-size: 1.4rem;
    margin-left: 1rem;
    user-select: none;
    cursor: inherit;
    color: ${({ error, disabled }) => {
      if (error) return theme.colors.error;
      if (disabled) return theme.colors.gray400;
      return theme.colors.gray700;
    }};
  }

  /* 필수 표시 마크 */
  .required-mark {
    color: ${theme.colors.error};
    margin-left: 0.4rem;
  }

  /* 헬퍼 텍스트 */
  .helper-text {
    font-size: 1.2rem;
    margin:0 0 0 2.8rem;
    color: ${({ error }) =>
      error ? theme.colors.error : theme.colors.gray600};

    &.valid {
      color: ${theme.colors.success};
      display: flex;
      align-items: center;
    }
  }
`; 