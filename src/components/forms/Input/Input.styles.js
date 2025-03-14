import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { rem, theme } from '@/styles/theme';

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 입력 필드 레이블 */
  .input-label {
    font-size: 1.3rem;
    line-height: 2.0rem;
    font-weight: 400;
    margin-bottom: 0.8rem;
    color: ${({ error, disabled }) => {
      if (error) return theme.colors.error;
      if (disabled) return theme.colors.gray400;
      return theme.colors.black;
    }};
  }

  /* 필수 표시 마크 */
  .required-mark {
    font-weight: 600;
    color: ${theme.colors.primary};
    margin-left: 0.4rem;
  }

  /* 입력 필드 */
  .input-field {
    border: 1px solid ${({ error }) => error ? theme.colors.error : theme.colors.gray300};
    border-radius: 0.8rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    color: ${theme.colors.text};
    background-color: ${theme.colors.white};

    padding: 1.4rem 1.6rem;
    font-size: 1.6rem;
    line-height: 2.4rem;

    &:focus {
      border-color: ${({ error }) => error ? theme.colors.error : theme.colors.gray700};
    }

    &:disabled {
      background-color: ${theme.colors.gray200};
      border-color: ${theme.colors.gray300};
      cursor: not-allowed;
      color: ${theme.colors.gray400};
    }

    &::placeholder {
      color: ${theme.colors.gray400};
    }
  }

  /* 헬퍼 텍스트 */
  .helper-text {
    font-size: 1.3rem;
    line-height: 2.0rem;
    margin: 0.4rem 0 0 2.0rem;
    color: ${({ error }) => error ? theme.colors.error : theme.colors.black};

    &.valid {
      color: ${theme.colors.success};
      display: flex;
      align-items: center;
    }
  }
`;
