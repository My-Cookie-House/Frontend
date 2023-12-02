import * as S from './style';
import ModalCloseButton from '@/components/ModalCloseButton/ModalCloseButton';
import Modal from '../../Modal';
import useInput from '@/hooks/useInput';
import ModalOKButton from '@/components/ModalOKButton/ModalOKButton';

type Props = {
  onClose: () => void;
  setNextStep: () => void;
  writeContents: (author: string, content: string) => void;
};

export default function WriteContentsModal({
  onClose,
  setNextStep,
  writeContents,
}: Props) {
  const handleGoSelectOrnament = () => {
    if (!author.value.trim() || !content.value.trim()) {
      alert('이름과 방명록 내용을 작성해주세요!');
      return;
    }
    writeContents(author.value.trim(), content.value.trim());
    setNextStep();
  };
  const author = useInput();
  const content = useInput<HTMLTextAreaElement>();
  return (
    <Modal
      modalTitle={'방명록 남기기'} // modalState에 따른 타이틀
      onClose={onClose}
      imageType={'MediumModal'} // modalState에 따른 이미지 타입
    >
      <ModalCloseButton onClick={onClose} />
      <S.Form>
        <S.NameInput
          maxLength={4}
          type="text"
          name="guestName" // 상태와 일치하는 name 속성
          placeholder="이름을 남겨주세요."
          value={author.value}
          onChange={author.handleChange}
        />
        <S.LetterArea>
          <S.LetterTextArea
            placeholder="방명록을 남겨주세요."
            maxLength={500}
            value={content.value}
            onChange={content.handleChange}
          />
        </S.LetterArea>

        <S.CheckTextLength>{content.value.length}/500자</S.CheckTextLength>
        <S.Discription>
          작성하신 방명록은 집주인만 열람이 가능해요.
        </S.Discription>
        <ModalOKButton
          onClick={handleGoSelectOrnament}
          buttonName="오너먼트 고르기"
        />
      </S.Form>
    </Modal>
  );
}
