import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { opacity } from '@/styles/theme';
import { theme } from '@/styles/theme';

// 버튼 크기별 스타일 정의
const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.6rem 1.2rem;
        font-size: 1.3rem;
        line-height: 2rem;
      `;
    case 'medium':
      return css`
        padding: 1rem 1.6rem;
        font-size: 1.4rem;
        line-height: 2.2rem;
      `;
    case 'large':
      return css`
        padding: 1.4rem 1.6rem;
        font-size: 1.6rem;
        line-height: 2.4rem;
      `;
    case 'text':
      return css`
        font-size: 1.4rem;
        line-height: 2.2rem;
      `;
    default:
      return css`
        padding: 1rem 1.6rem;
        font-size: 1.4rem;
        line-height: 2.2rem;
      `;
  }
};

// 버튼 변형별 스타일 정의
const getVariantStyles = (variant) => {
  const variants = {
    primary: css`
      background-color: ${theme.button.primary.bg};
      color: ${theme.colors.black};
      &:hover:not(:disabled) {
      }
      &:disabled {
        background-color: ${opacity(theme.button.primary.bg, 0.3)};
        color: ${opacity(theme.button.primary.text, 0.3)};
      }
    `,
    secondary: css`
      background-color: ${theme.button.secondary.bg};
      color: ${theme.button.secondary.text};
      &:hover:not(:disabled) {
      }
      &:disabled {
        background-color: ${opacity(theme.button.secondary.bg, 0.3)};
        color: ${opacity(theme.button.secondary.text, 0.3)};
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
  font-weight: 500;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  /* 크기 스타일 */
  ${({ size }) => getSizeStyles(size)}

  /* 변형 스타일 */
  ${({ variant }) => getVariantStyles(variant)}
  
  /* 비활성화 스타일 */
  &:disabled {
    opacity: 1;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* 아이콘 포함 시 간격 조정 */
  .button-icon {
    display: inline-flex;
    margin-right: ${({ iconPosition }) =>
      iconPosition === 'right' ? 0 : '0.8rem'};
    margin-left: ${({ iconPosition }) =>
      iconPosition === 'right' ? '0.8rem' : 0};
  }

  /* 전체 너비 */
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 로딩 상태 스타일 */
  .loading-spinner {
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.8rem;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
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
