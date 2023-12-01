import React from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './styled';
import GoGuesrBookButtonImg from '@/assets/GuestBook/Button.webp';
import WriteGuestBookButtonImg from '@/assets/Button/WriteGuestBookButton.png'; //TODO: 새로운 이미지로 바꿔야함.
import useIsMyHouse from '@/hooks/useIsMyHouse';
import { GuestBookButtonProps } from '@/interfaces/guestBook';


function GuestBookButton({ onClick }: GuestBookButtonProps) {
  const location = useLocation();
  const {id, userId, isMyHouse} = useIsMyHouse();

  // 현재 URL에 따라 이미지 결정
  const getImageForPath = (path: string) => {
    if (path === `/${id}/guests` && !isMyHouse) {
      return WriteGuestBookButtonImg;
    } else {
      return GoGuesrBookButtonImg;
    };
  }
    

  const currentImg = getImageForPath(location.pathname);

  return <S.Button onClick={onClick} img={currentImg} />;
}

export default GuestBookButton;
