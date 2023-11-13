import React, {useState, useEffect} from 'react';
import {S} from './style';
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import BackButton from '../../components/BackButton/BackButton';
import Modal from '../../components/Modal/Modal';
import axios, {AxiosError} from 'axios';
import PageLayout from '../../components/PageLayout/PageLayout';

export default function GuestBook() {
  const userId = 'default';
  const [isWirteGuestBookModalOpen, setWirteGuestBookModalOpen] =
    useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [guestName, setGuestName] = useState('');
  const [guestBookContent, setGuestBookContent] = useState('');
  const [reloadUserInfo, setReloadUserInfo] = useState(false);

  const getUserInfoFromServer = async (userId: string) => {
    try {
      const response = await axios.get(`~/guest-book/${userId}`);
      const userInfo = response.data;

      return {
        guestBook: userInfo.guestBook,
      };
    } catch (error: unknown) {
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        const userInfo = await getUserInfoFromServer(userId);

        setGuestBookContent(userInfo?.guestBook);
      }
    };
    fetchUserInfo();
  }, [reloadUserInfo]);

  const writeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 5) {
      setGuestName(value);
    }
  };

  const WirteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length <= 500) {
      setGuestBookContent(value);
    }
  };

  const handleWirteGuestBook = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!guestName.trim() || !guestBookContent.trim()) {
      alert('이름 혹은 편지를 입력해주세요!');
      return;
    }

    const guestBookData = {
      guestName,
      guestBookContent,
    };

    try {
      const response = await axios.post(`~/guest-book`, guestBookData, {
        headers: {
          authorization: ``,
        },
      });

      if (response.status === 200) {
        setGuestName('');
        setGuestBookContent('');
        setWirteGuestBookModalOpen(false);
      }
      setReloadUserInfo((prevState) => !prevState);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error?.response?.status;
        alert('방명록을 남기는 데에 실패했어요.');
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
            type="text"
            placeholder="이름을 남겨주세요."
            value={guestName}
            onChange={writeName}
          />
          <S.LetterArea
            placeholder="방명록을 남겨주세요."
            value={guestBookContent}
            onChange={WirteContent}
          />
          <S.CheckTextLength>{guestName.length}/500자</S.CheckTextLength>
          <button type="submit">물들이기</button>
        </S.Form>
      </>,
    );
  };

  return (
    <>
      <BackButton route="/" />
      <PageLayout>
        <S.ButtonWrapper>
          <TitleContainerBox title={'방명록'} />
          <S.WirteGuestBookButton onClick={handleWirteGuestBookModalOpen} />
        </S.ButtonWrapper>
      </PageLayout>

      <Modal
        modalTitle={'방명록 남기기'}
        isOpen={isWirteGuestBookModalOpen}
        onClose={() => setWirteGuestBookModalOpen(false)}
      >
        {modalContent}
      </Modal>
    </>
  );
}
