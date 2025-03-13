import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { withOpacity } from '@/styles/theme';

const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px 10px;
        font-size: 12px;
      `;
    case 'large':
      return css`
        padding: 12px 16px;
        font-size: 16px;
      `;
    case 'medium':
    default:
      return css`
        padding: 8px 12px;
        font-size: 14px;
      `;
  }
};

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 입력 필드 레이블 */
  .input-label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
    color: ${({ error, disabled, theme }) => {
      if (error) return theme.colors.error;
      if (disabled) return theme.colors.disabledText;
      return theme.colors.text;
    }};
  }

  /* 필수 표시 마크 */
  .required-mark {
    color: ${({ theme }) => theme.colors.error};
    margin-left: 2px;
  }

  /* 입력 필드 */
  .input-field {
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.colors.error : theme.colors.border};
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};

    &:focus {
      border-color: ${({ error, theme }) =>
        error ? theme.colors.error : theme.colors.primary};
      box-shadow: 0 0 0 1px
        ${({ error, theme }) =>
          withOpacity(error ? 'error' : 'primary', 0.1)(theme)};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabledBg};
      border-color: ${({ theme }) => theme.colors.disabled};
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.disabledText};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
    }

    /* 크기별 스타일 */
    &.size-small {
      padding: 6px 10px;
      font-size: 12px;
    }

    &.size-medium {
      padding: 8px 12px;
      font-size: 14px;
    }

    &.size-large {
      padding: 12px 16px;
      font-size: 16px;
    }
  }

  /* 헬퍼 텍스트 */
  .helper-text {
    font-size: 12px;
    margin: 4px 0 0;
    color: ${({ error, theme }) =>
      error ? theme.colors.error : theme.colors.textSecondary};

    &.valid {
      color: ${({ theme }) => theme.colors.success || '#28a745'};
      display: flex;
      align-items: center;
    }
  }
`;
