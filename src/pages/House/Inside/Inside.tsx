import * as S from './style';
import Share from '../../../assets/Button/Share.svg';
import ShareIcon from '../../../assets/Icons/ShareIcon.svg';
import Button from '../../../components/Buttons/Button';
import useIsMyHouse from '../../../hooks/useIsMyHouse';

export default function Inside() {
  const {isMyHouse} = useIsMyHouse();
  const handleShare = () => {};
  return (
    <>
      <img
        alt="쿠키하우스 내부"
        src=""
        style={{
          width: '295px',
          height: '364px',
          border: '1px solid black',
          marginTop: '43px',
        }}
      />
      {isMyHouse && (
        <Button
          width={50}
          height={50}
          background={Share}
          margin="50px 0 0 0"
          onClick={handleShare}
        >
          <S.ShareImg src={ShareIcon} />
        </Button>
      )}
    </>
  );
}
