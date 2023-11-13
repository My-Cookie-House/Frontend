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
import DecorationButton from '../../components/Buttons/DecorationButton/DecorationButton';
import ornaments from '../../components/ImportOrnaments/ImportOrnaments';
import { useParams } from 'react-router-dom';

function GuestBook() {
  const { userId } = useParams();
  const [author, setAuthor] = useState('');  // 보내는 사람 이름을 관리하는 상태
  const [content, setContent] = useState('');  // 편지 내용을 관리하는 상태
  const [ornamentId, setOrnamentId] = useState<number>(1);

  const [reloadUserInfo, setReloadUserInfo] = useState(false); //편지를 보낼 때 마다 상대방 정보를 업데이트 하기 위해 생선한 상태변수, 이유는 상대방 페이지에서 2개의 편지를 쓰면 실시간으로 나무가 물들게 하기 위해.
  const { 
    isOpen: isMediumModalOpen, 
    openModal: openMediumModal, 
    closeModal: closeMediumModal } = useModal();
 // 첫 번째 모달 상태 (방명록 남기기)
  // 두 번째 모달 상태 (오너먼트 고르기)
  const {
    isOpen: isOrnamentModalOpen,
    openModal: openOrnamentModal,
    closeModal: closeOrnamentModal
  } = useModal();
  //방명록 조회 모달
  const {
    isOpen: isGuestBookModalOpen,
    openModal: openGuestBookModal,
    closeModal: closeGuestBookModal
  } = useModal();
  const [readingGuestBookId, setReadingGuestBookId] = useState<number>(1);
  const [readingGuestBookAuthor, setReadingGuestBookAuthor] = useState<string>("김민성");
  const [readingGuestBookContent, setReadingGuestBookContent] = useState<string>("김민성 왔다감");

  
  const [guestBook, setGuestBook] = useState([
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "2"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "3"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "4"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "5"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "6"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "7"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "2"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "3"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "4"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "5"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "6"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "7"
    },
    {
      "author": "홍길동",
      "content": "adsfkjalksj~",
      "ornamentId": "2"
    },

  ]);  const [houseName, setHouseName] = useState<string>("코알라하우스");

  // 사용자의 방명록 정보를 가져오는 함수
  const getUserInfoFromServer = async (userId: string) => {
    try {
      // 서버로부터 데이터 요청
      const response = await axios.get(`~/guest-book/${userId}`);
  
      // 응답 데이터에서 guestBook 추출
      const guestBook = response.data?.guestBook;
      if (guestBook) {
        setGuestBook(guestBook); // 상태 업데이트
      }

      // 응답 데이터에서 houseName 추출
      const houseName = response.data?.houseName;
      if (houseName) {
        setHouseName(houseName); // 상태 업데이트
      }
      // guestBook 데이터 반환
      return guestBook;
    } catch (error) {
      // 에러 처리
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        alert('유저의 정보를 불러오지 못했어요.');
        if (status === 404) {
          // 리소스를 찾을 수 없음
        } else if (status === 500) {
          // 서버 내부 오류
        } else {
          // 기타 상태 코드 처리
        }
      } else {
        console.error('An unexpected error occurred:', error);
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
      setAuthor(value);
    }
  }

  // 편지를 작성하는 함수입니다.
  const writeLetter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // letterContent의 길이가 200자를 넘지 않는 경우에만 상태 업데이트
    if (value.length <= 200) {
      setContent(value);
    }
  }

 // 편지를 보내는 함수입니다.
 const handleSendGuestBook = async (event: React.FormEvent) => {
  event.preventDefault();

  // 백엔드로 보낼 데이터를 정의합니다.
  const letterData = {
    author,
    content,
    ornamentId
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
      setAuthor('');
      setContent('');

    }
    setReloadUserInfo(prevState => !prevState);  // 상태를 반대로 토글합니다.
    closeMediumModal();
    closeOrnamentModal();
    
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

  // 버튼 클릭 이벤트 핸들러
  const handleOrnamentClick = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 기본 동작 방지
    setOrnamentId(id);
  };

  const handleOpenOrnamentModal = () => {
    // 입력값을 검사합니다.
    if (!author.trim() || !content.trim()) {
      alert("이름과 방명록 내용을 작성해주세요!")
      return;
    } else {
      openOrnamentModal();
    }
    openOrnamentModal(); //테스트용 나중에 지워야 함//////////////////////////////////
  };

    // 방명록 조회 함수, userId로 판별해 주인만 볼 수 있게 로직 추가해야 함.
    const handleShowGuestBookContent = (ornamentId: number, author: string, content: string) => {
      openGuestBookModal();
      setReadingGuestBookId(ornamentId);
      setReadingGuestBookAuthor(author);
      setReadingGuestBookContent(content);
    };

    return (
      <>
        <BackButton route="/" />
        <S.ButtonWrapper>
          <TitleContainerBox title={houseName} />
            <S.WirteGuestBookButton onClick={openMediumModal} />
        </S.ButtonWrapper>
        <PageLayout>
          <S.GuestBookEntryGrid>
            {guestBook.map((entry : any) => (
              <S.GuestBookEntry key={entry.ornamentId}>
              <S.OrnamentButton 
              style={{ backgroundImage: `url(${ornaments[entry.ornamentId - 1].image})` }} 
              onClick={() => handleShowGuestBookContent(entry.ornamentId - 1, entry.author, entry.content)}
              />
                <S.AuthorName>{entry.author}</S.AuthorName>
              </S.GuestBookEntry>
            ))}
          </S.GuestBookEntryGrid>
        </PageLayout>

        <Modal
          modalTitle={'방명록 남기기'}
          isOpen={isMediumModalOpen} onClose={closeMediumModal}
          imageType={"MediumModal"}
        >
          <ModalCloseButton onClick={closeMediumModal} />
          <>
            <S.Form onSubmit={handleSendGuestBook}>
              <S.NameInput
                type="text"
                name="guestName" // 상태와 일치하는 name 속성
                placeholder="이름을 남겨주세요."
                value={author}
                onChange={writeName}
              />
              <S.LetterArea
                placeholder="방명록을 남겨주세요."
                value={content}
                onChange={writeLetter}
              />
              <S.CheckTextLength>{content?.length}/500자</S.CheckTextLength>
              <ModalOKButton buttonName="오너먼트 고르기" onClick={handleOpenOrnamentModal}/>
            </S.Form>
          </>
        </Modal>

        {/* 오너먼트 고르기 모달 */}
        <Modal 
          modalTitle={'오너먼트 고르기'}
          isOpen={isOrnamentModalOpen}
          onClose={closeOrnamentModal}
          imageType={"LargeModal"}
        >
          <S.ModalText>
            오너먼트 1개를 골라주세요
          </S.ModalText>
          <ModalCloseButton onClick={closeOrnamentModal} />
          <S.Form>
            <S.OrnamentButtonWrapper>
              {ornaments.map((ornament) => (
                <DecorationButton
                  key={ornament.id}
                  size={84}
                  image={ornament.image}
                  dark={ornament.id === ornamentId}
                  onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleOrnamentClick(ornament.id, event)}
                  />
              ))}
            </S.OrnamentButtonWrapper>
            <ModalOKButton buttonName="선택완료" onClick={handleSendGuestBook}/>
          </S.Form>
          
        </Modal>

        {/* 방명록 남겼다고 알림 모달 */}
        <Modal 
          modalTitle={'방명록'}
          isOpen={isGuestBookModalOpen}
          onClose={closeGuestBookModal}
          imageType={"MediumModal"}
        >
          <ModalCloseButton onClick={closeGuestBookModal} />
          <S.ModalInnerWrapper>
            <S.OrnamentImg style={{ backgroundImage: `url(${ornaments[ornamentId].image})` }} />
            <S.AuthorName>{author}</S.AuthorName>
            <S.ModalText>방명록을 남겼어요!</S.ModalText>
            <ModalOKButton buttonName="확인하기" onClick={closeGuestBookModal}/>
          </S.ModalInnerWrapper>
          
        </Modal>
      
        
        {/* 방명록 내용 보기 모달 */}
        <Modal 
          modalTitle={'방명록'}
          isOpen={isGuestBookModalOpen}
          onClose={closeGuestBookModal}
          imageType={"MediumModal"}
        >
          <ModalCloseButton onClick={closeGuestBookModal} />
          <S.ModalInnerWrapper>
            <S.OrnamentImg style={{ backgroundImage: `url(${ornaments[readingGuestBookId].image})` }} />
            <S.AuthorName>{readingGuestBookAuthor}</S.AuthorName>
            <S.GuestBookContent>{readingGuestBookContent}</S.GuestBookContent>
          </S.ModalInnerWrapper>
          
        </Modal>
      </>
    );
  };

export default GuestBook;