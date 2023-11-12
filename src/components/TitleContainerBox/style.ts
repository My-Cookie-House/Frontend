import { styled } from 'styled-components'
import TitleContainerBoxImg from '../../assets/ContainerBox/TitleContainerBox.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
`;

const TitleContainerBox = styled.div`
    position: absolute;
    top: 234px;
    width: 304px;
    height: 62px;
    background-image: url(${TitleContainerBoxImg});
    background-size: 304px 62px;
    color: #572E16;
    font-size: 20px;
    text-align: center;
    flex-direction: column;
    display: flex;
    justify-content: center;
`;

export const S = {
    Container,
    TitleContainerBox
}