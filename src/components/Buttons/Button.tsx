import {ButtonProps} from './type';
import {Button as SButton} from './style';
import {useNavigate} from 'react-router-dom';

export default function Button(props: ButtonProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(props.route!);
  };

  return (
    <SButton
      width={props.width}
      height={props.height}
      margin={props.margin}
      padding={props.padding}
      onClick={props.route ? handleNavigate : props.onClick}
      background={props.background}
    >
      {props.children}
    </SButton>
  );
}
