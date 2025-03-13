import styled from '@emotion/styled';

export const StyledPosts = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;

  h2 {
    color: ${({ theme }) => theme.colors.text};
  }
  li {
    a {
      color: ${({ theme }) => theme.colors.text};
      display: block;
      padding: 10px 0;
    }
    & + li a {
      border-top: 1px solid ${({ theme }) => theme.colors.error};
    }
  }
`;
