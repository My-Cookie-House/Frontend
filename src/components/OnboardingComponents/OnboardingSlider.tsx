import React, { useState } from 'react';
import Slider, {Settings} from 'react-slick';
import * as S from './style';
import { OnboardingSliderObject } from '@/assets/OnboardingSlider';
import BuildStartButton from '../Buttons/BuildStartButton/BuildStartButton';
import SkipButton from '../Buttons/SkipButton/SkipButton';

export default function OnboardingSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        customPaging: (i) => (
            <S.Dot isActive={i === currentSlide} /> // 현재 슬라이드와 i를 비교
            ),
        dotsClass: "slick-dots custom-dots", // 커스텀 클래스 추가
        afterChange: (current) => setCurrentSlide(current) // 현재 슬라이드 상태 업데이트
    };

    return (
        <>
            <S.Wrapper>
                <Slider {...settings}>
                    {OnboardingSliderObject.map((object, index) => (
                        <S.SliderWrapper key={index}>
                        <S.Title>{object.title}</S.Title>
                        <S.Image src={object.imgSrc} />
                        <S.Discription>{object.discription}</S.Discription>
                        </S.SliderWrapper>
                    ))}
                </Slider>
            </S.Wrapper>
            {currentSlide === 2 && <BuildStartButton /> }
            {(currentSlide === 0 || currentSlide === 1) && <SkipButton /> }
        </>
    );
}