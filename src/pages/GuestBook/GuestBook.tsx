import {useState} from 'react';
import {S} from './style';
import TitleContainerBox from '../../components/TitleContainerBox/TitleContainerBox';
import PageLayout from '../../components/PageLayout/PageLayout';
import ornaments from '../../components/ImportOrnaments/ImportOrnaments';
import useIsMyHouse from '../../hooks/useIsMyHouse';
import {getGuestBookInfo} from '../../apis/guestBook';
import CanSeeOnlyModal from '@/components/Modal/CanSeeOnlyModal/CanSeeOnlyModal';
import WriteGuestBook from '@/components/Modal/WriteGuestBook/WriteGuestBook';
import {useSuspenseQuery} from '@tanstack/react-query';
import {IGuestBook, IGuestBookItem} from '@/interfaces/guestBook';
import GuestBookItemModal from '@/components/Modal/GuestBookItemModal/GuestBookItemModal';
import GuestBookButton from '@/components/Buttons/GuestBookButton/GuestBookButton';
import NameTag from '@/components/NameTag/NameTag';

const STALE_TIME = 1000 * 60 * 60;
const GC_TIME = 1000 * 60 * 60;

function GuestBook() {
  const {id, isMyHouse} = useIsMyHouse();

  // 방명록 데이터
  const {data} = useSuspenseQuery<IGuestBook>({
    queryKey: ['guestBook', id],
    queryFn: () => getGuestBookInfo(+id),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

  // 방명록 작성 관련 상태
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const closeWriteModal = () => setWriteModalOpen(false);
  const openWriteModal = () => setWriteModalOpen(true);

  // 본인만 볼 수 있다고 알리는 모달 관련 상태
  const [isCanSeeOnlyModalOpen, setCanSeeOnlyModalOpen] =
    useState<boolean>(false);
  const closeCanSeeOnlyModal = () => {
    setCanSeeOnlyModalOpen(false);
  };

  // 방명록 내용 확인 모달 관련 상태
  const [guestBookItemModalOpen, setGuestBookItemModalOpen] =
    useState<null | IGuestBookItem>(null);
  const closeGuestBookItemModal = () => {
    setGuestBookItemModalOpen(null);
  };

  // 방명록 아이템 클릭 시
  const handleItemClick = (item: IGuestBookItem) => {
    if (isMyHouse) {
      setGuestBookItemModalOpen(item);
    } else {
      setCanSeeOnlyModalOpen(true);
    }
  };

  return (
    <>
      <PageLayout goBack={`/${id}/inside`}>
        <NameTag name={data?.houseName} />
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
                  onClick={() => handleItemClick(entry)}
                />
                <S.AuthorName>{entry.author}</S.AuthorName>
              </S.GuestBookEntry>
            ))}
          </S.GuestBookEntryGrid>
        )}
        {!isMyHouse && <GuestBookButton onClick={openWriteModal} />}
      </PageLayout>

      {/* 방명록 작성  */}
      {writeModalOpen && <WriteGuestBook closeWriteModal={closeWriteModal} />}

      {/* 방명록 내용 보기 모달 */}
      {guestBookItemModalOpen && (
        <GuestBookItemModal
          onClose={closeGuestBookItemModal}
          item={guestBookItemModalOpen}
        />
      )}

      {/* 본인만 볼 수 있음을 알리는 모달  */}
      {isCanSeeOnlyModalOpen && (
        <CanSeeOnlyModal
          isOpen={isCanSeeOnlyModalOpen}
          closeModal={closeCanSeeOnlyModal}
        />
      )}
    </>
  );
}

export default GuestBook;
