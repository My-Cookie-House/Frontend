import {styled} from 'styled-components';
import OrnamentAuthorBoxImg from '@/assets/ContainerBox/OrnamentAuthorBox.svg';

export const ModalText = styled.div`
  color: ${(props) => props.theme.colors.textBrown};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-top: 54.01px;
  margin-bottom: 29px;
`;
export const OrnamentImg = styled.div`
  background-size: 90px 90px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  width: 90px; // 이미지 크기에 따라 조정
  height: 90px; // 이미지 크기에 따라 조정
  border: none;
  cursor: pointer;
`;

export const ModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 68px;
`;

export const AuthorName = styled.div`
  background-image: url(${OrnamentAuthorBoxImg});
  background-size: 60px 25.2px;
  width: 60px;
  height: 25.2px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 14px;
`;
