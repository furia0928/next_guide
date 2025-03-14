import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledPostsComments = styled.ul`
  padding: 2rem;
  background-color: ${theme.colors.gray100};
  border-radius: 1rem;
  list-style: none;
  font-size: 1.4rem;

  li {
    padding: 1.2rem 0;
    border-bottom: 0.1rem solid ${theme.colors.border};

    &:last-child {
      border-bottom: none;
    }
  }

  .comment-body {
    margin-bottom: 0.8rem;
  }

  .comment-author {
    color: ${theme.colors.primary};
    margin-right: 1.2rem;
    font-weight: 500;
  }

  .comment-email {
    color: ${theme.colors.secondary};
    font-size: 0.9em;
  }
`;
