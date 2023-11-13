import * as S from './style';
import Button from '../Button';
import {ButtonProps} from '../type';
import BuildTypeButtonImg from '../../../assets/Button/BuildTypeButton.svg';

type Props = Partial<ButtonProps> & {
  title: string;
  description: string;
};

export default function BuildTypeButton(props: Props) {
  return (
    <Button width={294} height={138} background={BuildTypeButtonImg} {...props}>
      <S.Wrapper>
        <S.Title>{props.title}</S.Title>
        <S.Description>{props.description}</S.Description>
      </S.Wrapper>
    </Button>
  );
}
