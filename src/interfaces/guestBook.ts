export interface IGuestBookItem {
  userId: number;
  ornamentId: number;
  author: string;
  content: string;
}

export interface IGuestBook {
  guestBookResponseDtos: IGuestBookItem[];
  houseName: string;
}

export interface ButtonProps {
  img: string; 
}


export interface GuestBookButtonProps {
  onClick: () => void;
}