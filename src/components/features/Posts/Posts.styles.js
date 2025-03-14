import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledPosts = styled.div`
  padding: 2rem;
  background-color: ${theme.colors.background};
  border-radius: 1rem;
  font-size: 1.4rem;

  h2 {
    color: ${theme.colors.text};
  }
  li {
    a {
      color: ${theme.colors.text};
      display: block;
      padding: 1rem 0;
    }
    & + li a {
      border-top: 0.1rem solid ${theme.colors.error};
    }
  }
`;
