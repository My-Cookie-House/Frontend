import React, {useState, useEffect} from 'react';
import {S} from './style';
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import BackButton from '../../components/BackButton/BackButton';
import Modal from '../../components/Modal/Modal';
import axios, {AxiosError} from 'axios';
import PageLayout from '../../components/PageLayout/PageLayout';
import ModalOKButton from '../../components/ModalOKButton/ModalOKButton';
import ModalCloseButton from '../../components/ModalCloseButton/ModalCloseButton';
import useModal from '../../hooks/UseModal/UseModal';

function GuestBook() {
  const userId = 'default'; //userId 이거 수정해야함. 어떻게 저장할지 아직 모름

  const [senderName, setSenderName] = useState('');  // 보내는 사람 이름을 관리하는 상태
  const [letterContent, setLetterContent] = useState('');  // 편지 내용을 관리하는 상태
  const [reloadUserInfo, setReloadUserInfo] = useState(false); //편지를 보낼 때 마다 상대방 정보를 업데이트 하기 위해 생선한 상태변수, 이유는 상대방 페이지에서 2개의 편지를 쓰면 실시간으로 나무가 물들게 하기 위해.
  const { isOpen, openModal, closeModal } = useModal();

  // 사용자의 방명록 정보를 가져오는 함수
  const getUserInfoFromServer = async (userId: string) => {
    try {
      const response = await axios.get(`~/guest-book/${userId}`);

      const userInfo = response.data;

      return {
        guestBook: userInfo.guestBook,
      };
    } catch (error: unknown) {
      //에러 일 경우
      if (error instanceof AxiosError) {
        const status = error?.response?.status;
        alert('유저의 정보를 불러오지 못했어요.');
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

        //setGuestBookContent(userInfo?.guestBook);
      }
    };
    fetchUserInfo();
    
  }, [reloadUserInfo]);

  // 이름을 작성하는 함수입니다.
  const writeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // senderName의 길이가 10자를 넘지 않는 경우에만 상태 업데이트
    if (value.length <= 10) {
      setSenderName(value);
    }
  }

  // 편지를 작성하는 함수입니다.
  const writeLetter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // letterContent의 길이가 200자를 넘지 않는 경우에만 상태 업데이트
    if (value.length <= 200) {
      setLetterContent(value);
    }
  }

 // 편지를 보내는 함수입니다.
 const handleSendLetter = async (event: React.FormEvent) => {
  event.preventDefault();

  // 입력값을 검사합니다.
  if (!senderName.trim() || !letterContent.trim()) {

    return;
  }

  // 백엔드로 보낼 데이터를 정의합니다.
  const letterData = {
    senderName,
    letterContent,
  };

  try {
    // 백엔드로 편지 데이터를 보냅니다.
    // 엔드포인트 맞춰야 함
    const response = await axios.post(`~/guest-book/${userId}`, letterData, {
      headers: {
        'authorization': ``
      }
    });
    if(response.status===200) {
      // 입력 필드를 초기화합니다.
      setSenderName('');
      setLetterContent('');

    }
    setReloadUserInfo(prevState => !prevState);  // 상태를 반대로 토글합니다.

    
  } catch (error: unknown) { //에러 일 경우
    if (error instanceof AxiosError) {
        const status = error?.response?.status;
       
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




    return (
      <>
        <BackButton route="/" />
        <S.ButtonWrapper>
          <TitleContainerBox title={'방명록'} />
            <S.WirteGuestBookButton onClick={openModal} />
        </S.ButtonWrapper>
        <PageLayout>
          
        </PageLayout>

        <Modal
          modalTitle={'방명록 남기기'}
          isOpen={isOpen} onClose={closeModal}
          imageType={"MediumModal"}
        >
          <ModalCloseButton onClick={closeModal} />
          <>
            <S.Form onSubmit={handleSendLetter}>
              <S.NameInput
                type="text"
                name="guestName" // 상태와 일치하는 name 속성
                placeholder="이름을 남겨주세요."
                value={senderName}
                onChange={writeName}
              />
              <S.LetterArea
                placeholder="방명록을 남겨주세요."
                value={letterContent}
                onChange={writeLetter}
              />
              <S.CheckTextLength>{letterContent?.length}/500자</S.CheckTextLength>
              <ModalOKButton buttonName="오너먼트 고르기" onClick={openModal}/>
            </S.Form>
          </>
        </Modal>
      </>
    );
  };

export default GuestBook;
