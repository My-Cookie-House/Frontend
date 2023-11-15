import React, {useState, useRef} from 'react';
import LongButton from '../Buttons/LongButton/LongButton';
import {S} from './style';
import SkipButton from '../Buttons/SkipButton/SkipButton';
import BuildStartButton from '../Buttons/BuildStartButton/BuildStartButton';

interface SliderProps {
  images: string[];
  topTexts: string[];
  bottomTexts: React.ReactNode[];
  extraTexts: string[];
  progresses: string[];
}

const Slider: React.FC<SliderProps> = ({
  images,
  topTexts,
  bottomTexts,
  extraTexts,
  progresses,
}) => {
  const [index, setIndex] = useState(0);
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
    <div
      ref={touchRef}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
    >
      <S.Title>{topTexts[index]}</S.Title>
      {index === 0 ? (
        <img
          src={images[index]}
          style={{
            width: '280px',
            height: '374px',
          }}
        />
      ) : (
        <img
          src={images[index]}
          style={{
            width: '282px',
            height: '302px',
          }}
        />
      )}

      <S.BottomText>{bottomTexts[index]}</S.BottomText>
      <S.ExtraText>{extraTexts[index]}</S.ExtraText>

      {index === 0 && (
        <S.Centering>
          <LongButton onClick={handleRightClick}>Start!</LongButton>
        </S.Centering>
      )}
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
