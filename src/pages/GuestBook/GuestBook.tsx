import React from 'react'
import Ornaments from '../../components/ImportOrnaments/ImportOrnaments';
import { S } from './style'
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import BackButton from '../../components/BackButton/BackButton';

function GuestBook() {
  return (
    <>
    <BackButton route='/'/>
    <TitleContainerBox title = {"방명록"}/>
        <S.Container>


        </S.Container>
    </>
    
  )
}

export default GuestBook;
