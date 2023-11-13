import React, {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';

interface NavigatableButtonProps {
  route: string;
  children?: ReactNode;
}

const NavigatableButton: React.FC<NavigatableButtonProps> = ({
  route,
  children,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(route);
  };

  return <button onClick={handleNavigate}>{children}</button>;
};

export default NavigatableButton;
