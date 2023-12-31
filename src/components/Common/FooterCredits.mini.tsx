import styled from 'styled-components';
import { GEOAPIFY_LINK, MAP_API_LINK, OPEN_WEATHER_LINK } from '../../protocols/Constants';

export default function FooterCredits() {
    return (
        <OpenWeatherCredText>
            Dados fornecidos por <a target='_blank' href={OPEN_WEATHER_LINK}>Open Weather API</a> , <a target='_blank' href={GEOAPIFY_LINK}>Geoapify</a> e <a target='_blank' href={MAP_API_LINK}>Windy</a>
        </OpenWeatherCredText>
    );
}

const OpenWeatherCredText = styled.span`
    color: ${({ theme }) => theme.colors.textMainBlack};
    width: 100%;
    padding-right: 30px;
    text-align: left;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    padding-bottom: 20px;
    a{
        color: ${({ theme }) => theme.colors.link};
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
    @media (max-width: 660px){
        font-size: 12px;
        width: 100%;
        justify-content: center;
        gap: .5ch;
        display: flex;
        align-items: center;
        padding: 0;
        margin-top: 30px;
    }  
    @media (max-width: 1061px) and (min-width: 660px){
        font-size: 16px;
    }
    @media (min-height: 660px) and (min-width: 1366px){
        font-size: 18px;
    }

    @media (min-height: 950px) and (min-width: 1366px){
        font-size: 24px;
    }
`;