import styled from '@emotion/styled';

export const StyledUsers = styled.div`
  padding: 20px;
  background-color: ${({ theme }) =>
    theme.colors.background || 'var(--background)'};
  border-radius: 10px;

  h2 {
    color: ${({ theme }) => theme.colors.text || 'var(--text)'};
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 8px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#eaeaea'};

    &:last-child {
      border-bottom: none;
    }
  }
`;
