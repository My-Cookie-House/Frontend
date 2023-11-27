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
