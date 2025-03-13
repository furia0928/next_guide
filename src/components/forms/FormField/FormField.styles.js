import styled from '@emotion/styled';

export const StyledFormField = styled.div`
  margin-bottom: 16px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;
