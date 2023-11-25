import GuestBookImg from '@/assets/GuestBook/GuestBook.webp';
import * as S from './styled';

type Props = {
  onClick(): void;
};

export default function GuestBookButton({onClick}: Props) {
  return <S.Button onClick={onClick} />;
}
