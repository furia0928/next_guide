import styled from '@emotion/styled';

export const StyledPostsComments = styled.ul`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundLight || '#eee'};
  border-radius: 10px;
  list-style: none;

  li {
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#ccc'};

    &:last-child {
      border-bottom: none;
    }
  }

  .comment-body {
    margin-bottom: 8px;
  }

  .comment-author {
    color: ${({ theme }) => theme.colors.primary || 'red'};
    margin-right: 12px;
    font-weight: 500;
  }

  .comment-email {
    color: ${({ theme }) => theme.colors.secondary || 'blue'};
    font-size: 0.9em;
  }
`;
