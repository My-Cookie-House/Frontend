import {useState} from 'react';
import {S} from './style';
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import Modal from '../../components/Modal/Modal';
import PageLayout from '../../components/PageLayout/PageLayout';
import ModalOKButton from '../../components/ModalOKButton/ModalOKButton';
import ModalCloseButton from '../../components/ModalCloseButton/ModalCloseButton';
import useModal from '../../hooks/useModal';
import ornaments from '../../components/ImportOrnaments/ImportOrnaments';
import useInput from '../../hooks/useInput';
import useIsMyHouse from '../../hooks/useIsMyHouse';
import {getGuestBookInfo} from '../../apis/guestBook';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '../../atoms/loginStateAtom';
import CanSeeOnlyModal from '@/components/Modal/CanSeeOnlyModal/CanSeeOnlyModal';
import WriteGuestBookModal from '@/components/Modal/WriteGuestBook/WriteContentsModal/WriteContentsModal';
import WriteGuestBook from '@/components/Modal/WriteGuestBook/WriteGuestBook';
import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {IGuestBook, IGuestBookItem} from '@/interfaces/guestBook';

const STALE_TIME = 1000 * 60 * 60;
const GC_TIME = 1000 * 60 * 60;

function GuestBook() {
  // 방명록 페이지 진입 -> 작성 버튼 클릭->작성 모달 on -> 작성 내용 입력 -> 오나먼트 선택 모달 -> 방명록을 남겼어요 모달 -> 모달 꺼짐
  const {id, userId, isMyHouse} = useIsMyHouse();
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const closeWriteModal = () => setWriteModalOpen(false);

  const openWriteModal = () => setWriteModalOpen(true);

  const {data, isFetching} = useSuspenseQuery<IGuestBook>({
    queryKey: ['guestBook', id],
    queryFn: () => getGuestBookInfo(+id),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
  //////////////////////////
  const {isHouseBuilt} = useRecoilValue(userInfoAtom);

  const [houseName, setHouseName] = useState<string>('코알라하우스');
  const author = useInput<HTMLInputElement>(); // 보내는 사람 이름을 관리하는 상태
  const content = useInput<HTMLTextAreaElement>(); // 편지 내용을 관리하는 상태
  const [ornamentId, setOrnamentId] = useState<number>(1);
  const [modalStep, setModalStep] = useState(1);
  const [modalTitle, setModalTitle] = useState<string>('방명록 남기기');
  const [imageType, setImageType] = useState<
    'SmallModal' | 'MediumModal' | 'LargeModal' | 'FurnitureSelectModal'
  >('MediumModal');

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

  const [isCanSeeOnlyModalOpen, setCanSeeOnlyModalOpen] =
    useState<boolean>(false);

  // useEffect(() => {}, [reloadUserInfo, id]);

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

  return (
    <>
      <S.ButtonWrapper>
        <TitleContainerBox title={data?.houseName} />
        {isMyHouse ? (
          <></>
        ) : (
          <S.WirteGuestBookButton onClick={openWriteModal} />
        )}
      </S.ButtonWrapper>
      <PageLayout goBack={`/${id}/inside`}>
        {data?.guestBookResponseDtos.length === 0 ? (
          <S.GuestBookNoneWrapper>
            <S.GuestBookNone>방명록이 없어요.</S.GuestBookNone>
          </S.GuestBookNoneWrapper>
        ) : (
          <S.GuestBookEntryGrid>
            {data?.guestBookResponseDtos.map((entry: IGuestBookItem) => (
              <S.GuestBookEntry key={entry.ornamentId}>
                <S.OrnamentButton
                  style={{
                    backgroundImage: `url(${
                      ornaments[entry.ornamentId - 1].image
                    })`,
                  }}
                  onClick={() => {
                    if (isMyHouse) {
                      handleShowGuestBookContent(
                        entry.ornamentId,
                        entry.author,
                        entry.content,
                      );
                    } else {
                      // isMyHouse가 false일 때 모달 열기 상태를 true로 변경합니다.
                      setCanSeeOnlyModalOpen(true);
                    }
                  }}
                />
                <S.AuthorName>{entry.author}</S.AuthorName>
              </S.GuestBookEntry>
            ))}
          </S.GuestBookEntryGrid>
        )}
      </PageLayout>

      {writeModalOpen && <WriteGuestBook closeWriteModal={closeWriteModal} />}

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
              backgroundImage: `url(${
                ornaments[readingGuestBookId - 1].image
              })`,
            }}
          />
          <S.AuthorName>{readingGuestBookAuthor}</S.AuthorName>
          <S.GuestBookContent>{readingGuestBookContent}</S.GuestBookContent>
        </S.ModalInnerWrapper>
      </Modal>

      {isCanSeeOnlyModalOpen && (
        <CanSeeOnlyModal
          isOpen={isCanSeeOnlyModalOpen}
          closeModal={() => setCanSeeOnlyModalOpen(false)}
        />
      )}
    </>
  );
}

export default GuestBook;
