import {styled, css} from 'styled-components';
import theme from '../../theme';

export const Title = styled.h1`
  color: #f9f1e1;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 43px;
`;

export const Discription = styled.h2`
  color: #f9f1e1;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 50px;
  white-space: pre-line;
`;

interface ImagesProps {
  src : string;
}

export const Image = styled.img<ImagesProps>`
  width: 340px;
  height: 340px;
  margin-bottom: 23px;
`;

export const SliderWrapper = styled.div`
  width: 350px;
  height: 450px;
  margin-top: 55px;
  position: relative; 
  background-size: 350px 450px;
`;


export const Wrapper = styled.div`
  width: 350px;
  height: 450px;
`;


export const Dot = styled.div<{isActive: boolean}>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #BA998B ;
  margin: 0 5px;
  margin-top: 115px;
  ${({ isActive }) => isActive && css`
    background-color: #F9F1E1;
  `}
`;
