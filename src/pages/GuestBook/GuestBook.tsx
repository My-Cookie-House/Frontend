import React, {useState, useEffect} from 'react';
import {S} from './style';
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import Modal from '../../components/Modal/Modal';
import PageLayout from '../../components/PageLayout/PageLayout';
import ModalOKButton from '../../components/ModalOKButton/ModalOKButton';
import ModalCloseButton from '../../components/ModalCloseButton/ModalCloseButton';
import useModal from '../../hooks/useModal';
import DecorationButton from '../../components/Buttons/DecorationButton/DecorationButton';
import ornaments from '../../components/ImportOrnaments/ImportOrnaments';
import useInput from '../../hooks/useInput';
import useIsMyHouse from '../../hooks/useIsMyHouse';
import { getUserInfoFromServer, sendGuestBook } from '../../apis/guestBook';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../atoms/loginStateAtom';

function GuestBook() {
  const {isHouseBuilt} = useRecoilValue(userInfoAtom);
  const {id, userId, isMyHouse} = useIsMyHouse();
  const [houseName, setHouseName] = useState<string>('코알라하우스');
  const author = useInput<HTMLInputElement>(); // 보내는 사람 이름을 관리하는 상태
  const content = useInput<HTMLTextAreaElement>(); // 편지 내용을 관리하는 상태
  const [ornamentId, setOrnamentId] = useState<number>(1);
  const [modalStep, setModalStep] = useState(1);
  const [modalTitle, setModalTitle] = useState<string>("방명록 남기기")
  const [imageType, setImageType] = useState<'SmallModal' | 'MediumModal' | 'LargeModal' | 'FurnitureSelectModal'>('MediumModal');

  const [reloadUserInfo, setReloadUserInfo] = useState(false); //편지를 보낼 때 마다 상대방 정보를 업데이트 하기 위해 생선한 상태변수, 이유는 상대방 페이지에서 2개의 편지를 쓰면 실시간으로 나무가 물들게 하기 위해.
  // 방명록 남기기 모달 상태관리
  const {
    isOpen: isModalOpen,
    openModal: openModal,
    closeModal: closeModal,
  } = useModal();

  //방명록 조회 모달 상태관리
  const {
    isOpen: isGuestBookModalOpen,
    openModal: openGuestBookModal,
    closeModal: closeGuestBookModal,
  } = useModal();

  const [readingGuestBookId, setReadingGuestBookId] = useState<number>(1);
  const [readingGuestBookAuthor, setReadingGuestBookAuthor] =
    useState<string>('김민성');
  const [readingGuestBookContent, setReadingGuestBookContent] =
    useState<string>('김민성 왔다감');

  const [guestBook, setGuestBook] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {

      const guestBookData = await getUserInfoFromServer(id);
      if (guestBookData && Array.isArray(guestBookData.guestBookResponseDtos)) {
        setGuestBook(guestBookData.guestBookResponseDtos);
        console.log(guestBookData.guestBook)
      }
      console.log(guestBookData.guestBookResponseDtos)

      setHouseName(guestBookData.houseName);
      console.log(guestBookData.houseName)

    };
    fetchUserInfo();
  }, [reloadUserInfo, id]);

  // 편지를 보내는 함수입니다.
  const handleSendGuestBook = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendGuestBook(id, author.value, ornamentId, content.value);
      // 성공 후 처리
      setReloadUserInfo(prev => !prev);
      setModalStep(3);
      setImageType('MediumModal');
      setModalTitle("방명록")
    } catch (error) {
      // 실패 시 처리
      alert('유저의 정보를 불러오지 못했어요.');
    }
  };

  const handleModalClose = () => {
    author.reset();
    content.reset();
    closeModal();
    setModalStep(1);
    setImageType('MediumModal');
    setModalTitle("방명록")
  }

  const handleCheckBlank = () => {
    // 입력값을 검사합니다.
    if (!author.value.trim() || !content.value.trim()) {
      alert('이름과 방명록 내용을 작성해주세요!');
      return;
    } else {
      setModalStep(2);
      setImageType('LargeModal');
      setModalTitle("오너먼트 고르기")
    }
  };

  // 버튼 클릭 이벤트 핸들러
  const handleOrnamentClick = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    setOrnamentId(id);
  };

  // 방명록 조회 함수, userId로 판별해 주인만 볼 수 있게 로직 추가해야 함.
  const handleShowGuestBookContent = (
    ornamentId: number,
    author: string,
    content: string,
  ) => {
    openGuestBookModal();
    setReadingGuestBookId(ornamentId);
    setReadingGuestBookAuthor(author);
    setReadingGuestBookContent(content);
  };

  const renderModalContent = () => {
    switch (modalStep) {
      case 1:
        return (
          // 방명록 작성 관련 내용
              <>
                <S.Form onSubmit={handleSendGuestBook}>
                  <S.NameInput
                    maxLength={4}
                    type="text"
                    name="guestName" // 상태와 일치하는 name 속성
                    placeholder="이름을 남겨주세요."
                    value={author.value}
                    onChange={author.handleChange}
                  />
                  <S.LetterArea
                    placeholder="방명록을 남겨주세요."
                    maxLength={500}
                    value={content.value}
                    onChange={content.handleChange}
                  />
                  <S.CheckTextLength>{content.value.length}/500자</S.CheckTextLength>
                  <ModalOKButton
                    buttonName="오너먼트 고르기"
                    onClick={() => {
                      handleCheckBlank();
                      }
                    }
                  />
                </S.Form>
              </>
        );
      case 2:
        return (
          // 오너먼트 선택 관련 내용
          <>
            {/* 오너먼트 고르기 모달 */}
              <S.ModalText>오너먼트 1개를 골라주세요</S.ModalText>
              <S.Form>
                <S.OrnamentButtonWrapper>
                  {ornaments.map((ornament) => (
                    <DecorationButton
                      key={ornament.id}
                      size={84}
                      image={ornament.image}
                      dark={ornament.id === ornamentId}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                      ) => handleOrnamentClick(ornament.id, event)}

                    />
                  ))}
                </S.OrnamentButtonWrapper>
                <ModalOKButton 
                buttonName="선택완료" 
                onClick={(event) => {
                  handleSendGuestBook(event)
                }} 
                />
              </S.Form>
          </>
        );
      case 3:
        return (
          // 방명록 전송 성공 관련 내용
          <>
          {/* 방명록 남겼다고 알림 모달 */}
              <ModalCloseButton onClick={handleModalClose} />
              <S.ModalInnerWrapper>
              {ornaments[ornamentId-1] && (
                <S.OrnamentImg
                  style={{backgroundImage: `url(${ornaments[ornamentId-1].image})`}}
                />
              )}
                <S.AuthorName>{author.value}</S.AuthorName>
                <S.ModalText>방명록을 남겼어요!</S.ModalText>
                <ModalOKButton
                  buttonName="확인하기"
                  onClick={handleModalClose}
                />
              </S.ModalInnerWrapper>
          </>
        );
      default:
        return null; // 기본값으로는 아무것도 렌더링하지 않음
    }
  };

  return (
    <>
      <S.ButtonWrapper>
        <TitleContainerBox title={houseName} />
        <S.WirteGuestBookButton onClick={openModal} />
      </S.ButtonWrapper>
      <PageLayout goBack={`/${id}/inside`}>

        
  {
    guestBook.length === 0 ? (
      <S.GuestBookNoneWrapper>
        <S.GuestBookNone>방명록이 없어요.</S.GuestBookNone>
      </S.GuestBookNoneWrapper>
        ) : (
          <S.GuestBookEntryGrid>
            {guestBook.map((entry: any) => (
              <S.GuestBookEntry key={entry.ornamentId}>
                <S.OrnamentButton
                  style={{
                    backgroundImage: `url(${ornaments[entry.ornamentId - 1].image})`,
                  }}
                  onClick={() => 
                    isMyHouse &&
                    handleShowGuestBookContent(
                      entry.ornamentId,
                      entry.author,
                      entry.content,
                    )
                  }
                />
                <S.AuthorName>{entry.author}</S.AuthorName>
              </S.GuestBookEntry>
            ))}
          </S.GuestBookEntryGrid>
        )
      }
  
      </PageLayout>

      <Modal
        modalTitle={modalTitle} // modalState에 따른 타이틀
        isOpen={isModalOpen}
        onClose={handleModalClose}
        imageType={imageType} // modalState에 따른 이미지 타입
      >
        <ModalCloseButton onClick={handleModalClose} />
        {renderModalContent()}
      </Modal>

      {/* 방명록 내용 보기 모달 */}
      <Modal
        modalTitle={'방명록'}
        isOpen={isGuestBookModalOpen}
        onClose={closeGuestBookModal}
        imageType={'MediumModal'}
      >
        <ModalCloseButton onClick={closeGuestBookModal} />
        <S.ModalInnerWrapper>
          <S.OrnamentImg
            style={{
              backgroundImage: `url(${ornaments[readingGuestBookId-1].image})`,
            }}
          />
          <S.AuthorName>{readingGuestBookAuthor}</S.AuthorName>
          <S.GuestBookContent>{readingGuestBookContent}</S.GuestBookContent>
        </S.ModalInnerWrapper>
      </Modal>
    </>
  );
}

export default GuestBook;
