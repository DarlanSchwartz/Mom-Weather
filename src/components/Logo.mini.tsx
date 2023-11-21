
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
    }

    h1{
        width: 100%;
        font-size: 2rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2rem; /* 77.419% */
    }
`;
