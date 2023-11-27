export type ButtonProps = {
  //onClick?(): void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  route?: string;
  children?: React.ReactNode;
  width: number;
  height: number;
  margin?: string;
  padding?: string;
  background?: string;
  disabled?: boolean;
  dark?: boolean;
  type?: string;
  path?: string;
};
