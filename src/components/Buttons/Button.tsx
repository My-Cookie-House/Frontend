import {ButtonProps} from './type';
import {Button as SButton} from './style';
import {useNavigate} from 'react-router-dom';

export default function Button(props: ButtonProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(props.route!);
  };
  console.log(props.disabled);
  return (
    <SButton
      width={props.width}
      height={props.height}
      margin={props.margin}
      padding={props.padding}
      onClick={props.route ? handleNavigate : props.onClick}
      background={props.background}
      disabled={props.disabled}
    >
      {props.children}
    </SButton>
  );
}
