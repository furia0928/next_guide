import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledRadio = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
  cursor: ${({ disabled }) => (disabled ? theme.cursor.notAllowed : theme.cursor.pointer)};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 2.4rem;
  height: 2.4rem;
  margin: 0;
  z-index: 1;
  cursor: inherit;

  &:focus + div {
    box-shadow: 0 0 0 0.2rem ${theme.colors.secondary};
  }

  &:checked + div {
    border-color: ${theme.colors.primary};
    
    &:after {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const RadioCircle = styled.div`
  position: relative;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  border: 0.2rem solid ${theme.colors.gray600};
  background-color: ${theme.colors.white};
  transition: all 0.2s ease-in-out;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 1rem;
    height: 1rem;
    margin: -0.5rem 0 0 -0.5rem;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
`;

export const RadioLabel = styled.label`
  font-size: 1.4rem;
  margin-left: 1rem;
  user-select: none;
  cursor: inherit;
`; 