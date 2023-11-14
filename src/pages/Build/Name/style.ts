import styled from 'styled-components';
import Background from '../../../assets/Button/LongButton.svg';

export const Input = styled.input`
  background: url(${Background});
  background-size: cover;
  width: 237.5px;
  height: 50px;
  margin-top: 30px;
  padding: 10px 37px;
  text-align: center;
  outline: none;
  border: none;

  color: #572e16;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.8px;

  ::placeholder {
    color: rgba(87, 46, 22, 0.6);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.7px;
  }
  :focus::placeholder {
    color: transparent;
  }
`;
