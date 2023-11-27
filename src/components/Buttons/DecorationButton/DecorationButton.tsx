import * as S from './style';
import Button from '../Button';
import {ButtonProps} from '../type';
import DecorationButtonImage from '../../../assets/Button/DecorationButton.svg';

type DecorationButtonProps = Partial<ButtonProps> & {
  size: number;
  image: string;
};

export default function DecorationButton(props: DecorationButtonProps) {
  return (
    <Button
      type="button"
      width={props.size}
      height={props.size}
      background={DecorationButtonImage}
      {...props}
    >
      <S.Image src={props.image} />
    </Button>
  );
}
