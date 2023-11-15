export interface TitleContainerBoxProps {
  title: string; // title은 문자열 타입
}

export interface BackButtonNavigateProps {
  route?: string; // 경로
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalTitle: string;
  imageType?: 'SmallModal' | 'MediumModal' | 'LargeModal';
}

export interface ModalOKButtonProps {
  buttonName: string;
}

export interface ModalButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// imageType을 위한 인터페이스 정의
export interface ModalContentProps {
  imageType?: 'SmallModal' | 'MediumModal' | 'LargeModal';
}

// show 프로퍼티를 갖는 ModalWrapperProps 인터페이스를 정의
export interface ModalWrapperProps {
  show: boolean;
}

export interface ImagePreviewProps {
  src: string; // 여기서는 string 타입만 받도록 설정
}

export type LoginResponse = {
  code: number;
  message: string;
  data: {
    userId: number;
    refreshToken: string;
    accessToken: string;
    isRegistered: boolean;
  };
};
