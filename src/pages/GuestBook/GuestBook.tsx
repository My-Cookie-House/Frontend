import React, { useState, useEffect } from 'react'
import Ornaments from '../../components/ImportOrnaments/ImportOrnaments';
import { S } from './style'
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import BackButton from '../../components/BackButton/BackButton';
import Modal from '../../components/Modal/Modal';
import axios, {AxiosError} from 'axios'
import ModalOKButton from '../../components/ModalOKButton/ModalOKButton';
function GuestBook() {
    const userId = "default"; //userId 이거 수정해야함. 어떻게 저장할지 아직 모름
    const [isWirteGuestBookModalOpen, setWirteGuestBookModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] =
    useState<React.ReactNode>(null); // 모달에 표시될 내용을 저장
    const [guestName, setGuestName] = useState('');  // 보내는 사람 이름을 관리하는 상태
    const [guestBookContent, setGuestBookContent] = useState('');  // 편지 내용을 관리하는 상태
    const [reloadUserInfo, setReloadUserInfo] = useState(false);//편지를 보낼 때 마다 상대방 정보를 업데이트 하기 위해 생선한 상태변수, 이유는 상대방 페이지에서 2개의 편지를 쓰면 실시간으로 나무가 물들게 하기 위해.

    // 사용자의 방명록 정보를 가져오는 함수
    const getUserInfoFromServer = async (userId: string) => {
    
        try {
        
        const response = await axios.get(`~/guest-book/${userId}`);
    
        const userInfo = response.data;
    
        return {
            guestBook: userInfo.guestBook
        };
        
        } catch (error: unknown) { //에러 일 경우
        if (error instanceof AxiosError) {
            const status = error?.response?.status;
                alert("유저의 정보를 불러오지 못했어요.")
            if (status === 404) {
                // 리소스를 찾을 수 없음
            } else if (status === 500) {
                // 서버 내부 오류
            } else {
                // 기타 상태 코드 처리
            }
        } 
        return null;
        }
    };

     // 컴포넌트가 마운트될 때 사용자 정보를 가져옵니다.
    useEffect(() => {  
        const fetchUserInfo = async () => {
            if (userId) {
                const userInfo = await getUserInfoFromServer(userId);
        
                setGuestBookContent(userInfo?.guestBook);
            }
        };
        fetchUserInfo();
    }, [reloadUserInfo]);

    // 이름을 작성하는 함수입니다.
    const writeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        // 이름의 길이가 5자 이하인 경우에만 값을 업데이트
        if (value.length <= 5) {
            setGuestName(value);
        }
    }    

    // 편지를 작성하는 함수입니다.
    const WirteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // letterContent의 길이가 500자를 넘지 않는 경우에만 상태 업데이트
        if (value.length <= 500) {
            setGuestBookContent(value);
        }
    }

    // 방명록을 남기는 함수입니다.
    const handleWirteGuestBook = async (event: React.FormEvent) => {
        event.preventDefault();

        // 입력값을 검사합니다.
        if (!guestName.trim() || !guestBookContent.trim()) {
        // 이름이나 편지 내용이 비어있으면 경고 메시지를 표시하고 함수를 종료합니다.
            alert("이름 혹은 편지를 입력해주세요!")
        return;
        }

        // 백엔드로 보낼 데이터를 정의합니다.
        const guestBookData = {
            guestName,
            guestBookContent,
        };

        try {
            // 백엔드로 방명록 데이터를 보냅니다.
            //수정 필요.
            const response = await axios.post(`~/guest-book`, guestBookData, {
                headers: {
                'authorization': ``
                }
            });
            if(response.status===200) {
                // 입력 필드를 초기화합니다.
                setGuestName('');
                setGuestBookContent('');

                // 모달을 닫습니다.
                setWirteGuestBookModalOpen(false);
            }
            setReloadUserInfo(prevState => !prevState);  // 상태를 반대로 토글합니다.

            
        } catch (error: unknown) { //에러 일 경우
            if (error instanceof AxiosError) {
                const status = error?.response?.status;
                    alert('방명록을 남기는 데에 실패했어요.')
                if (status === 404) {
                    // 리소스를 찾을 수 없음
                } else if (status === 500) {
                    // 서버 내부 오류
                } else {
                    // 기타 상태 코드 처리
                }
            } 
            return null;
        }
    };

    const handleWirteGuestBookModalOpen = () => {
        setWirteGuestBookModalOpen(true);
        setModalContent(
            <>
                <S.Form onSubmit={handleWirteGuestBook}>
                    <S.NameInput
                        name="guestName"
                        placeholder="이름을 남겨주세요."
                        value={guestName}
                        onChange={writeName}
                    />
                    <S.LetterArea
                        name="guestBookContent"
                        placeholder="방명록을 남겨주세요."
                        value={guestBookContent}
                        onChange={WirteContent}
                    />
                    <S.CheckTextLength>{guestBookContent.length}/500자</S.CheckTextLength>
                    <ModalOKButton buttonName='물들이기' />
                </S.Form>
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

            <Modal modalTitle = {"방명록 남기기"} isOpen={isWirteGuestBookModalOpen} onClose={() => setWirteGuestBookModalOpen(false)}>
                {modalContent}
            </Modal>
        </>
        
    )
}

export default GuestBook;
