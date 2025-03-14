import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledTabs = styled.div`
  font-family: sans-serif;
  width: 100%;

  .tab-header {
    display: flex;
    border-bottom: 0.1rem solid ${theme.colors.border};
    margin-bottom: 1.6rem;
  }

  .tab-button {
    padding: 0.8rem 1.6rem;
    background: ${theme.colors.gray100};
    border: none;
    border-bottom: 0.2rem solid transparent;
    cursor: pointer;
    font-weight: normal;
    margin-right: 0.8rem;
    transition: all 0.3s;

    &:hover {
      background: ${theme.colors.gray300};
    }

    &:focus {
      outline: none;
      background: ${theme.colors.gray100};
    }

    &.active {
      background: ${theme.colors.primary};
      font-weight: bold;
      border-bottom: 0.2rem solid ${theme.colors.primary};
    }
  }

  .tab-content {
    padding: 0.8rem;
    font-size: 1.4rem;
  }
`;
