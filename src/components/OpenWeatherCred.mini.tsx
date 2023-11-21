import styled from 'styled-components';
import { OPEN_WEATHER_LINK } from '../protocols/Constants';

export default function OpenWeatherCred() {
    return <OpenWeatherCredText>Dados fornecidos pela <a href={OPEN_WEATHER_LINK}>Open Weather API</a></OpenWeatherCredText>
}

const OpenWeatherCredText = styled.span`
    color: ${({ theme }) => theme.colors.textMainBlack};
    font-size: 24px;
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

    @media (max-width: 1360px){
        font-size: 18px;
    }
`;