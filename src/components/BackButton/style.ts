import { styled } from 'styled-components'
import BackButtonImg from '../../assets/Button/BackButton.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
`;

const BackButton = styled.div`
    position: absolute;
    top: 121px;
    margin-right: 330px;
    width: 12.5px;
    height: 24px;
    background-image: url(${BackButtonImg});
    background-size: 12.5px 24px;
    text-align: center;
    flex-direction: column;
    display: flex;
    justify-content: center;
`;

export const S = {
    Container,
    BackButton
}