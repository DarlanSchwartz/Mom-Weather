import styled from 'styled-components';
import { OPEN_WEATHER_LINK } from '../protocols/Constants';

export default function OpenWeatherCred() {
    return <OpenWeatherCredText>Dados fornecidos pela <a href={OPEN_WEATHER_LINK}>Open Weather API</a> e <a href='https://www.geoapify.com/'>Geoapify</a></OpenWeatherCredText>
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
    @media (max-width: 1061px){
        font-size: 16px;
    }
    @media (min-height: 660px) and (min-width: 1360px){
        font-size: 18px;
    }

    @media (min-height: 950px) and (min-width: 1360px){
        font-size: 24px;
    }
`;