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
    top: 169.88px;
    width: 239.822px;
    height: 50.489px;
    background-image: url(${TitleContainerBoxImg});
    background-size: 239.822px 50.489px;
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