import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledSelect = styled.div`
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  .select-wrapper {
    position: relative;
  }

  /* 네이티브 셀렉트 (숨김) */
  // .select-hidden {overflow: hidden; height:0; width:0;}
  .select-native {
    position: absolute;
    left: 100%;
    // width: 0;
    // height: 0;
    // left:-300vw;
    cursor: ${({ disabled }) =>
      disabled ? theme.cursor.notAllowed : theme.cursor.pointer};
    z-index: 1;
  }

  /* 커스텀 셀렉트 */
  .select-custom {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
    padding: 0 1.2rem;
    background-color: ${theme.colors.white};
    border: 0.1rem solid
      ${({ error, focused }) => {
        if (error) return theme.colors.error;
        if (focused) return theme.colors.primary;
        return theme.colors.border;
      }};
    border-radius: 0.4rem;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: ${({ disabled }) =>
        disabled ? theme.colors.border : theme.colors.primary};
    }
  }

  /* 셀렉트 텍스트 */
  .select-text {
    flex-grow: 1;
    font-size: 1.4rem;
    color: ${({ error, disabled }) => {
      if (error) return theme.colors.error;
      if (disabled) return theme.colors.disabled;
      return theme.colors.text;
    }};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 플레이스홀더 */
  .select-placeholder {
    color: ${theme.colors.gray400};
  }

  /* 화살표 아이콘 */
  .select-arrow {
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 0.8rem;
    color: ${({ disabled }) =>
      disabled ? theme.colors.disabled : theme.colors.gray700};
    transition: transform 0.2s ease-in-out;
    transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0)')};
  }

  /* 드롭다운 메뉴 */
  .select-dropdown {
    position: absolute;
    top: calc(100%);
    left: 0;
    right: 0;
    max-height: 24rem;
    overflow-y: auto;
    background-color: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.border};
    border-radius: 0.4rem;
    box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.1);
    z-index: 10;
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    opacity: ${({ open }) => (open ? 1 : 0)};
  }

  /* 옵션 항목 */
  .select-option {
    padding: 1rem 1.2rem;
    font-size: 1.4rem;
    color: ${theme.colors.text};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${theme.colors.gray100};
    }

    &.selected {
      background-color: ${theme.colors.gray100};
      font-weight: 500;
    }

    &.disabled {
      color: ${theme.colors.disabled};
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }

  /* 라벨 */
  .select-label {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ error, disabled }) => {
      if (error) return theme.colors.error;
      if (disabled) return theme.colors.disabled;
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
    margin-top: 0.4rem;
    font-size: 1.2rem;
    color: ${({ error }) =>
      error ? theme.colors.error : theme.colors.gray600};

    &.valid {
      color: ${theme.colors.success};
    }
  }
`;
