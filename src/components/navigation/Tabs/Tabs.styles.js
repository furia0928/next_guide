import styled from '@emotion/styled';

export const StyledTabs = styled.div`
  font-family: sans-serif;
  width: 100%;
`;

export const StyledTabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
`;

export const StyledTabButton = styled.button`
  padding: 8px 16px;
  background: ${({ active }) => (active ? '#f0f0f0' : 'transparent')};
  border: none;
  border-bottom: 2px solid
    ${({ active, theme }) =>
      active ? theme?.colors?.primary || '#2196f3' : 'transparent'};
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  margin-right: 8px;
  transition: all 0.3s;

  &:hover {
    background: #f0f0f0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.3);
  }
`;

export const StyledTabContent = styled.div`
  padding: 8px;
`;
