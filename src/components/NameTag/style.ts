import styled from 'styled-components';
import NameTagImg from '@/assets/House/NameTag.webp';

export const NameTagBox = styled.div`
  display: flex;
  width: 300.636px;
  height: 55px;
  justify-content: center;
  background: url(${NameTagImg});
  background-size: cover;
  background-position: center;
  margin-top: 31px;
`;

export const Text = styled.h1`
  color: #fff4dd;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.8px;
  margin-top: 14px;
`;
