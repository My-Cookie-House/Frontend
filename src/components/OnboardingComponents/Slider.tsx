import React, {useState, useRef} from 'react';
import leftButton from '../../assets/OnboardingAssets/leftButton.svg';
import rightButton from '../../assets/OnboardingAssets/rightButton.svg';
import skipButton from '../../assets/OnboardingAssets/skipButton.svg';
import NavigatableButton from '../BackButton/NavigatableButton';
import LongButton from '../Buttons/LongButton/LongButton';

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

  const handleLeftClick = () => {
    if (index > 0) {
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
      {index !== 0 && <img src={leftButton} onClick={handleLeftClick} />}

      <p>{topTexts[index]}</p>
      <img
        src={images[index]}
        style={{
          width: '36px',
          height: '38px',
        }}
      />
      {bottomTexts[index]}
      {extraTexts[index]}
      {index !== 0 && (
        <img
          src={progresses[index]}
          style={{
            width: '56px',
            height: '12px',
          }}
        />
      )}

      {index === 0 && (
        <LongButton onClick={handleRightClick}>Start!</LongButton>
      )}

      {index !== 0 && (
        <NavigatableButton route={'/build'}>
          <img src={skipButton} />
        </NavigatableButton>
      )}
      {index !== 0 && <img src={rightButton} onClick={handleRightClick} />}
    </div>
  );
};

export default Slider;
