import { styled } from "styled-components"; 

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //max-width: 390px;
    //max-height: 844px;
    margin: 0 auto;
    width: 100%;
    //height: 130vh; //스크롤 테스트용
    @media (min-width: 768px) {
    }
`;

export const S = {
    Container

}