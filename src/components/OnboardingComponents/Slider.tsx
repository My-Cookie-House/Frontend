import React, {useState, useRef} from 'react';
import LongButton from '../Buttons/LongButton/LongButton';
import {S} from './style';
import SkipButton from '../Buttons/SkipButton/SkipButton';
import BuildStartButton from '../Buttons/BuildStartButton/BuildStartButton';
import {useRecoilState} from 'recoil';
import {indexAtom} from '../../atoms/sideButtonAtom';

interface SliderProps {
  images: string[];
  topTexts: string[];
  bottomTexts: React.ReactNode[];
  extraTexts: string[];
  progresses: string[];
}

export const handleRightClick = (index, setIndex, images) => {
  if (index < images.length - 1) {
    setIndex(index + 1);
  }
};

export const handleLeftClick = (index, setIndex, images) => {
  if (0 < index) {
    setIndex(index - 1);
  }
};

const Slider: React.FC<SliderProps> = ({
  images,
  topTexts,
  bottomTexts,
  extraTexts,
  progresses,
}) => {
  const [index, setIndex] = useRecoilState<number>(indexAtom);
  const [startX, setStartX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const touchRef = useRef(null);

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setDragging(true);
  };

  const handleEnd = (clientX: number) => {
    if (!dragging) return;
    setDragging(false);
    const endX = clientX;
    const diffX = endX - startX;

    if (diffX < -5 && index < images.length - 1) {
      setIndex(index + 1);
    } else if (diffX > 5 && index > 0) {
      setIndex(index - 1);
    }
  };

  const handleRightClick = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div style={{paddingTop: '43px'}}>
      <S.Title>{topTexts[index]}</S.Title>
      <div
        ref={touchRef}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
      >
        {index === 0 ? (
          <img
            src={images[index]}
            style={{
              width: '330px',
              height: '440px',
              marginBottom: '70px',
              marginTop: '26px',
            }}
          />
        ) : (
          <img
            src={images[index]}
            style={{
              width: '282.253px',
              height: '301.443px',
              marginTop: '39px',
              marginBottom: '50.85px',
            }}
          />
        )}
      </div>
      <div
        style={{
          height: '149.05px',
        }}
      >
        {index === 0 && (
          <S.Centering>
            <LongButton onClick={handleRightClick}>
              <S.StartText>START!</S.StartText>
            </LongButton>
          </S.Centering>
        )}
        <S.BottomText>{bottomTexts[index]}</S.BottomText>
        <S.ExtraText>{extraTexts[index]}</S.ExtraText>
      </div>

      {index === images.length - 1 && (
        <S.Centering>
          <BuildStartButton />
        </S.Centering>
      )}

      {index !== 0 && index !== images.length - 1 && (
        <>
          <S.Centering>
            <img
              src={progresses[index]}
              style={{
                width: '56px',
                height: '12px',
                marginBottom: '13.71px',
              }}
            />
          </S.Centering>
          <S.Centering>
            <SkipButton />
          </S.Centering>
        </>
      )}
    </div>
  );
};

export default Slider;
