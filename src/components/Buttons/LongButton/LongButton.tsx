import {ButtonProps} from '../type';
import LongButtonImg from '../../../assets/Button/LongButton.svg';
import Button from '../Button';

type LongButtonProps = Partial<ButtonProps>;

export default function LongButton(props: LongButtonProps) {
  return (
    <Button width={237.5} height={52} background={LongButtonImg} {...props}>
      {props.children}
    </Button>
  );
}
