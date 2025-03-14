import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
export const StyledCheckbox = styled.div`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  /* 체크박스 컨테이너 */
  .checkbox-container {
    display: flex;
    align-items: center;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  /* 실제 체크박스 (숨김) */
  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* 커스텀 체크박스 */
  .checkbox-custom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    margin-right: 0.8rem;
    margin-top: ${({ alignTop }) => (alignTop ? '0.3rem' : '0')};
    background-color: ${({ checked, disabled }) => {
      if (disabled) return theme.colors.gray300;
      return checked
        ? theme.colors.primary
        : theme.colors.background;
    }};
    border: 0.1rem solid
      ${({ checked, error, disabled }) => {
        if (error) return theme.colors.error;
        if (disabled) return theme.colors.disabled;
        return checked
          ? theme.colors.primary
          : theme.colors.border;
      }};
    border-radius: 0.4rem;
    transition: all 0.2s;
  }

  /* 체크박스 호버 효과 */
  .checkbox-container:hover .checkbox-custom {
    border-color: ${({ disabled }) =>
      disabled
        ? theme.colors.disabled
        : theme.colors.primary};
  }

  /* 체크 아이콘 */
  .checkbox-icon {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    color: white;
    width: 1.4rem;
    height: 1.4rem;
  }

  /* 레이블 텍스트 */
  .checkbox-label {
    flex: 1;
    font-size: 1.4rem;
    color: ${({ error, disabled }) => {
      if (error) return theme.colors.error;
      if (disabled) return theme.colors.disabled;
      return theme.colors.gray700;
    }};
  }

  /* 필수 표시 마크 */
  .required-mark {
    color: ${({ theme }) => theme.colors.error};
    margin-left: 0.4rem;
  }

  /* 헬퍼 텍스트 */
  .helper-text {
    font-size: 1.2rem;
    margin: 0.4rem 0 0 2.8rem;
    color: ${({ error }) =>
      error
        ? theme.colors.error
        : theme.colors.textSecondary};

    &.valid {
      color: ${theme.colors.success};
      display: flex;
      align-items: center;
    }
  }
`;
