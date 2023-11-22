import * as S from './style';

type Props = {
  width: number;
  height: number;
  imgs: (string | undefined)[]; // 겹쳐질 때 위로 올라가야 하는 이미지를 배열 내에 뒤쪽 순서로 배치!!!
  margin?: string;
};

export default function Overlap({width, height, imgs, margin}: Props) {
  // imgs가 배열인 경우에만 map 함수 사용
  return (
    <S.Frame width={width} height={height} margin={margin}>
      {Array.isArray(imgs) && imgs.length > 0 ? (
        imgs.map((img, idx) => img && <S.Img key={idx} src={img} />)
      ) : (
        // 예외 처리: imgs 배열이 비어있을 때
        <></>
      )}
    </S.Frame>
  );
}
