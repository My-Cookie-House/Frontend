export interface TitleContainerBoxProps {
    title: string; // title은 문자열 타입
}

export interface BackButtonNavigateProps {
    route: string; // 경로
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    modalTitle: string;
  }