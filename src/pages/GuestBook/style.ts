import { styled } from "styled-components"; 
import WirteGuestBookButtonImg from '../../assets/Button/WriteGuestBookButton.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    width: 304px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WirteGuestBookButton = styled.div`
    position: absolute;
    top: 241px;
    left: 257px;
    width: 24px;
    height: 24px;
    background-image: url(${WirteGuestBookButtonImg});
    background-size: 24px 24px;
    z-index: 3;
`;


export const S = {
    Container,
    WirteGuestBookButton,
    ButtonWrapper
}