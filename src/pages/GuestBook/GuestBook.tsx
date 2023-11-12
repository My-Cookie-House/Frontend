import React, { useState } from 'react'
import Ornaments from '../../components/ImportOrnaments/ImportOrnaments';
import { S } from './style'
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import BackButton from '../../components/BackButton/BackButton';
import Modal from '../../components/Modal/Modal';

function GuestBook() {
    const [isWirteGuestBookModalOpen, setWirteGuestBookModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] =
    useState<React.ReactNode>(null); // 모달에 표시될 내용을 저장
    
    const handleWirteGuestBookModalOpen = () => {
        setWirteGuestBookModalOpen(true);
        setModalContent(
            <>
            
            </>
        );
    }

    return (
        <>
        <BackButton route='/'/>
            <S.Container>
                <S.ButtonWrapper>
                    <TitleContainerBox title = {"방명록"}/>
                    <S.WirteGuestBookButton onClick={handleWirteGuestBookModalOpen}/>
                </S.ButtonWrapper>

            </S.Container>

            <Modal isOpen={isWirteGuestBookModalOpen} onClose={() => setWirteGuestBookModalOpen(false)}>
                {modalContent}
            </Modal>
        </>
        
    )
}

export default GuestBook;
