import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${({ error, disabled, theme }) => {
    if (error) return theme?.colors?.error || '#f44336';
    if (disabled) return theme?.colors?.disabled || '#9e9e9e';
    return theme?.colors?.text || '#333333';
  }};
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme?.colors?.error || '#f44336'};
  margin-left: 2px;
`;

export const HelperText = styled.p`
  font-size: 12px;
  margin: 4px 0 0;
  color: ${({ error, theme }) =>
    error
      ? theme?.colors?.error || '#f44336'
      : theme?.colors?.textSecondary || '#757575'};
`;

export const getSizeStyles = (size) => {
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

export const StyledInput = styled.input`
  border: 1px solid
    ${({ error, theme }) =>
      error
        ? theme?.colors?.error || '#f44336'
        : theme?.colors?.border || '#e0e0e0'};
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  ${({ size }) => getSizeStyles(size)};

  &:focus {
    border-color: ${({ error, theme }) =>
      error
        ? theme?.colors?.error || '#f44336'
        : theme?.colors?.primary || '#2196f3'};
    box-shadow: 0 0 0 2px
      ${({ error, theme }) => {
        const color = error
          ? theme?.colors?.error || '#f44336'
          : theme?.colors?.primary || '#2196f3';
        return `${color}33`; // 20% opacity
      }};
  }

  &:disabled {
    background-color: ${({ theme }) => theme?.colors?.disabledBg || '#f5f5f5'};
    border-color: ${({ theme }) => theme?.colors?.disabled || '#e0e0e0'};
    cursor: not-allowed;
    color: ${({ theme }) => theme?.colors?.disabled || '#9e9e9e'};
  }

  &::placeholder {
    color: ${({ theme }) => theme?.colors?.placeholder || '#9e9e9e'};
  }
`;
