import * as S from './style';

type Props = {
  width: number;
  height: number;
  imgs: string[]; // 반드시 위로 올라가야 하는 이미지를 배열 내에 뒤쪽 순서로 배치!!!
  margin?: string;
};

export default function Preview({width, height, imgs, margin}: Props) {
  console.log(imgs);
  return (
    <S.Frame width={width} height={height} margin={margin}>
      {imgs.map((img, idx) => (
        <S.Img key={idx} src={img} />
      ))}
    </S.Frame>
  );
}
