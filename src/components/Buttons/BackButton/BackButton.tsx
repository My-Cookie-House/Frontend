import {S} from './style';
import {BackButtonNavigateProps} from '../../../type/type';
import NavigatableButton from '../NavigatableButton/NavigatableButton';

function BackButton(props: BackButtonNavigateProps) {
  const {route} = props;

  return (
    <S.Container>
      <NavigatableButton route={route}>
        <S.BackButton />
      </NavigatableButton>
    </S.Container>
  );
}

export default BackButton;
