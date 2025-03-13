import styled from '@emotion/styled';

export const StyledCheckboxGroup = styled.div`
  display: flex;

  flex-direction: ${({ layout }) =>
    layout === 'horizontal' ? 'row' : 'column'};
  gap: 16px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 그룹 제목 */
  .group-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.text || '#333333'};
  }

  /* 체크박스 아이템 */
  .checkbox-item {
  }
`;
