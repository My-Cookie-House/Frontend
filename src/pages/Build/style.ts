import styled from 'styled-components';
import theme from '../../theme';

export const Title = styled.h1<{marginTop?: string}>`
  color: ${theme.colors.textMain};
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '43px')};
  white-space: pre-wrap;
`;

export const Description = styled.h3`
  color: ${theme.colors.textMain};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 33px;
  white-space: pre;
`;

export const NextStepText = styled.span`
  color: #572e16;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1px;
  font-family: inherit;
`;
