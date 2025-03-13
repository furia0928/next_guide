import { css } from '@emotion/react';
import styled from '@emotion/styled';

// 버튼 크기별 스타일 정의
const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px 16px;
        font-size: 0.875rem;
        min-height: 32px;
      `;
    case 'large':
      return css`
        padding: 16px 32px;
        font-size: 1.125rem;
        min-height: 48px;
      `;
    case 'medium':
    default:
      return css`
        padding: 12px 24px;
        font-size: 1rem;
        min-height: 40px;
      `;
  }
};

// 버튼 변형별 스타일 정의
const getVariantStyles = (variant, theme) => {
  const variants = {
    primary: css`
      background-color: ${theme.colors.primary || '#2196f3'};
      color: ${theme.colors.white || '#ffffff'};
      &:hover:not(:disabled) {
        background-color: ${theme.colors.primaryDark || '#1976d2'};
      }
    `,
    secondary: css`
      background-color: ${theme.colors.secondary || '#f5f5f5'};
      color: ${theme.colors.text || '#333333'};
      border: 1px solid ${theme.colors.border || '#dddddd'};
      &:hover:not(:disabled) {
        background-color: ${theme.colors.secondaryDark || '#e0e0e0'};
      }
    `,
    danger: css`
      background-color: ${theme.colors.danger || '#dc3545'};
      color: ${theme.colors.white || '#ffffff'};
      &:hover:not(:disabled) {
        background-color: ${theme.colors.dangerDark || '#c82333'};
      }
    `,
    text: css`
      background-color: transparent;
      color: ${theme.colors.primary || '#2196f3'};
      padding: 6px 8px;
      &:hover:not(:disabled) {
        background-color: ${theme.colors.backgroundLight ||
        'rgba(33, 150, 243, 0.1)'};
      }
    `,
  };

  return variants[variant] || variants.primary;
};

// 스타일드 버튼 컴포넌트
export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  outline: none;

  /* 크기 스타일 */
  ${({ size }) => getSizeStyles(size)}

  /* 변형 스타일 */
  ${({ variant, theme }) => getVariantStyles(variant, theme)}
  
  /* 비활성화 스타일 */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* 아이콘 포함 시 간격 조정 */
  .button-icon {
    display: inline-flex;
    margin-right: ${({ iconPosition }) =>
      iconPosition === 'right' ? 0 : '8px'};
    margin-left: ${({ iconPosition }) =>
      iconPosition === 'right' ? '8px' : 0};
  }

  /* 전체 너비 */
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 로딩 상태 스타일 */
  .loading-spinner {
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
