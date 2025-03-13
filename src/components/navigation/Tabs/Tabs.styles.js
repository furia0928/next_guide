import styled from '@emotion/styled';

export const StyledTabs = styled.div`
  font-family: sans-serif;
  width: 100%;

  .tab-header {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
  }

  .tab-button {
    padding: 8px 16px;
    background: ${({ theme }) => theme?.colors?.background || 'transparent'};
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-weight: normal;
    margin-right: 8px;
    transition: all 0.3s;

    &:hover {
      background: #f0f0f0;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.3);
    }

    &.active {
      background: #f0f0f0;
      font-weight: bold;
      border-bottom: 2px solid
        ${({ theme }) => theme?.colors?.primary || '#2196f3'};
    }
  }

  .tab-content {
    padding: 8px;
  }
`;
