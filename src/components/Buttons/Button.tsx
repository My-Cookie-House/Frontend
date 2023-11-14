import {ButtonProps} from './type';
import * as S from './style';
import {useNavigate} from 'react-router-dom';

export default function Button(props: ButtonProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(props.route!);
  };
  return (
    <S.Button
      width={props.width}
      height={props.height}
      margin={props.margin}
      padding={props.padding}
      onClick={props.route ? handleNavigate : props.onClick}
      background={props.background}
      disabled={props.disabled}
      dark={props.dark ? props.dark : false}
    >
      {props.children}
    </S.Button>
  );
}
