import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledBaseInput = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 입력 필드 */
  .input-field {
    border: 1px solid
      ${({ error }) => (error ? theme.colors.error : theme.colors.gray300)};
    border-radius: 0.8rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    color: ${theme.colors.text};
    background-color: ${theme.colors.white};

    padding: 1.4rem 1.6rem;
    font-size: 1.6rem;
    line-height: 2.4rem;

    &.has-suffix {
      padding-right: 4rem; /* suffix 공간 확보 */
    }

    &:focus {
      border-color: ${({ error }) =>
        error ? theme.colors.error : theme.colors.gray700};
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

  /* Suffix 영역 */
  .input-suffix {
    position: absolute;
    right: 1.2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; /* 기본적으로는 클릭 이벤트를 통과시킴 */

    /* suffix 내의 버튼 등 상호작용 요소는 이벤트를 받을 수 있도록 함 */
    button,
    a,
    input,
    select,
    label {
      pointer-events: auto;
    }
  }
`;
