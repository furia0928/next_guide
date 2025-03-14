import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledUsers = styled.div`
  padding: 2rem;
  background-color: ${theme.colors.white};
  border-radius: 1rem;
  font-size: 1.4rem;

  h2 {
    color: ${theme.colors.gray700};
    margin-bottom: 1.6rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.8rem 0;
    border-bottom: 0.1rem solid ${theme.colors.gray300};

    &:last-child {
      border-bottom: none;
    }
  }
`;
