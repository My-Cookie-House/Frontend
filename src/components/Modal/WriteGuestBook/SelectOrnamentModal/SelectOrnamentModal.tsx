import * as S from './style';
import ModalOKButton from '@/components/ModalOKButton/ModalOKButton';
import Modal from '../../Modal';
import {Contents} from '../WriteGuestBook';
import Ornaments from '@/components/ImportOrnaments/ImportOrnaments';
import DecorationButton from '@/components/Buttons/DecorationButton/DecorationButton';
import React from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {sendGuestBook} from '@/apis/guestBook';

type Props = {
  onClose: () => void;
  setNextStep: () => void;
  contents: Contents;
  selectedOrnament: null | number;
  setSelectedOrnament: React.Dispatch<React.SetStateAction<number>>;
};

export default function SelectOrnamentModal({
  onClose,
  setNextStep,
  contents,
  selectedOrnament,
  setSelectedOrnament,
}: Props) {
  const {id} = useParams();

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: () =>
      sendGuestBook(id, contents.author, selectedOrnament, contents.content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['guestBook', id]});
      setNextStep();
    },
  });

  const handleOKClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate();
  };

  const handleOrnamentClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault();
    setSelectedOrnament(id);
  };
  return (
    <Modal
      modalTitle={'오너먼트 고르기'} // modalState에 따른 타이틀
      onClose={onClose}
      imageType={'LargeModal'} // modalState에 따른 이미지 타입
    >
      <S.ModalText>오너먼트 1개를 골라주세요</S.ModalText>
      <S.Form>
        <S.OrnamentButtonWrapper>
          {Ornaments.map((ornament) => (
            <DecorationButton
              key={ornament.id}
              size={84}
              image={ornament.image}
              dark={ornament.id === selectedOrnament}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleOrnamentClick(e, ornament.id)
              }
            />
          ))}
        </S.OrnamentButtonWrapper>
        <ModalOKButton
          buttonName="선택완료"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOKClick(e)}
        />
      </S.Form>
    </Modal>
  );
}
