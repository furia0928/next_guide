import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const StyledCheckboxGroup = styled.div`
  display: flex;

  flex-direction: ${({ layout }) =>
    layout === 'horizontal' ? 'row' : 'column'};
  gap: 1.6rem;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* 그룹 제목 */
  .group-title {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    color: ${theme.colors.text};
  }

  /* 체크박스 아이템 */
  .checkbox-item {
  }
`;
