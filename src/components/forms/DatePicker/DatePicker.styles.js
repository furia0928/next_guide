import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledDatePicker = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 입력 필드 레이블 */
  .datepicker-label {
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

  .react-datepicker-wrapper {
    display: block;
    width: 100%;
  }
  .custom-input-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${theme.colors.gray300};
    border-radius: 0.8rem;
    overflow: hidden;
  }
  input {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1.6rem;
    line-height: 2.4rem;
    padding: 1.4rem 1.6rem;
    color: ${theme.colors.gray700};
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
