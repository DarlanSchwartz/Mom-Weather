import styled from "styled-components";
import "animate.css";
import Rain from "../components/Effects/RainDrops.component";

export default function PageNotFound() {
    return (
        <PageContainer>
            <Rain dropCount={500} />
            <img className="animate__animated animate__fadeInLeft" src="https://cdn.pixabay.com/photo/2014/03/25/15/24/cloud-296722_960_720.png" alt="" />
            <h1 className="animate__animated animate__fadeInLeft">404</h1>
            <h2 className="animate__animated animate__fadeInRight">Página não encontrada</h2>
        </PageContainer>
    );
}

const PageContainer = styled.main`
    width: 100%;
    height: 100svh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.background};
    h1{
        font-size: 100px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-weight: 300;
        user-select: none;
        -webkit-user-drag: none;
        white-space: nowrap;
        @media (max-width: 660px){
            font-size: 60px;
        }
    }
    h2{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        user-select: none;
        -webkit-user-drag: none;
        white-space: nowrap;
        @media (max-width: 660px){
            font-size: 24px;
        }
    }
    img{
        max-width: 400px;
        max-height: 400px;
        opacity: 0.5 !important;
        user-select: none;
        -webkit-user-drag: none;
        white-space: nowrap;
        @media (max-width: 660px){
            max-width: 300px;
            max-height: 300px;
        }
    }
`;