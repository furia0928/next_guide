import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 입력 필드 레이블 */
  .input-label {
    font-size: 1.3rem;
    line-height: 2rem;
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

  /* 입력 컨테이너 - suffix가 있는 경우를 위해 추가 */
  .input-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  /* 헬퍼 텍스트 */
  .helper-text {
    font-size: 1.3rem;
    line-height: 2rem;
    margin: 0.4rem 0 0 2rem;
    color: ${({ error }) => (error ? theme.colors.error : theme.colors.black)};

    &.valid {
      color: ${theme.colors.success};
      display: flex;
      align-items: center;
    }
  }
`;
