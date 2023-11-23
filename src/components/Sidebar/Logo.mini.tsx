
import styled from 'styled-components';
import LogoIcon from '/images/coat.png';

export default function Logo() {
    return (
        <LogoContainer>
            <img src={LogoIcon} alt="" />
            <h1>Levo um casaquinho?</h1>
        </LogoContainer>
    )
}

const LogoContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    color: ${({ theme }) => theme.colors.textMainBlack};
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;

    img{
        max-width: 5.5em;
        max-height: 5.5em;
        width: 100%;
        @media (max-width: 660px){
            flex-shrink: 0;
            width: 50px;
            height: 50px;
        }
    }

    h1{
        display: flex;
        font-size: 40px;
        max-width: 300px;
        font-style: normal;
        font-weight: 600;
        line-height: 80%; /* 77.419% */

        @media (max-width: 1140px){
            display: none;
        }

        @media (max-width: 1200px){
            font-size: 36px;
        }

        @media (max-height: 660px){
            font-size: 28px;
        }
    }

    @media (max-width: 660px){
        width: fit-content;
    }

    @media (min-height: 950px) and (min-width: 1360px){
        h1{
            font-size: 62px;
            max-width: 416px;
        }
        padding-top: 20px;
        padding-bottom: 20px;
    }
`;
