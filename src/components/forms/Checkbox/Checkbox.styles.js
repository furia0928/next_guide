import styled from '@emotion/styled';

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
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin-right: 8px;
    margin-top: ${({ alignTop }) => (alignTop ? '3px' : '0')};
    background-color: ${({ checked, disabled, theme }) => {
      if (disabled) return theme.colors.disabledBg || '#f5f5f5';
      return checked
        ? theme.colors.primary || '#2196f3'
        : theme.colors.background || '#ffffff';
    }};
    border: 1px solid
      ${({ checked, error, disabled, theme }) => {
        if (error) return theme.colors.error || '#dc3545';
        if (disabled) return theme.colors.disabled || '#cccccc';
        return checked
          ? theme.colors.primary || '#2196f3'
          : theme.colors.border || '#ced4da';
      }};
    border-radius: 4px;
    transition: all 0.2s;
  }

  /* 체크박스 호버 효과 */
  .checkbox-container:hover .checkbox-custom {
    border-color: ${({ disabled, theme }) =>
      disabled
        ? theme.colors.disabled || '#cccccc'
        : theme.colors.primary || '#2196f3'};
  }

  /* 체크 아이콘 */
  .checkbox-icon {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    color: white;
    width: 14px;
    height: 14px;
  }

  /* 레이블 텍스트 */
  .checkbox-label {
    flex: 1;
    font-size: 14px;
    color: ${({ error, disabled, theme }) => {
      if (error) return theme.colors.error || '#dc3545';
      if (disabled) return theme.colors.disabledText || '#999999';
      return theme.colors.text || '#333333';
    }};
  }

  /* 필수 표시 마크 */
  .required-mark {
    color: ${({ theme }) => theme.colors.error || '#dc3545'};
    margin-left: 4px;
  }

  /* 헬퍼 텍스트 */
  .helper-text {
    font-size: 12px;
    margin: 4px 0 0 28px;
    color: ${({ error, theme }) =>
      error
        ? theme.colors.error || '#dc3545'
        : theme.colors.textSecondary || '#666666'};

    &.valid {
      color: ${({ theme }) => theme.colors.success || '#28a745'};
      display: flex;
      align-items: center;
    }
  }
`;
