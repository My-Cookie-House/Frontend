import React from 'react'
import Ornaments from '../../components/ImportOrnaments/ImportOrnaments';
import { S } from './style'
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import BackButton from '../../components/BackButton/BackButton';

function GuestBook() {
    return (
        <>
        <BackButton route='/'/>
            <S.Container>
            <S.ButtonWrapper>
                <TitleContainerBox title = {"방명록"}/>
                <S.WirteGuestBookButton />
            </S.ButtonWrapper>

            </S.Container>
        </>
        
    )
}

export default GuestBook;
