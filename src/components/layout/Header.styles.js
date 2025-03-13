import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #0070f3;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;

  nav {
    display: flex;
    gap: 16px;
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    transition: color 0.2s;

    &:hover {
      color: #d1e0f3;
    }
  }

  button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      color: #d1e0f3;
    }
  }
`;
