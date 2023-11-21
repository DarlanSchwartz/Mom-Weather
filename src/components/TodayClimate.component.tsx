import ClimateBox from './ClimateBox.mini';
import { TodayForecast, ForecastUnit } from '../protocols/Application.types';
import styled from 'styled-components';

export default function TodayClimate({ cityName, latitute, longitude, todayText, forecast }: TodayForecast) {
    return (
        <TodayClimateContainer>
            <h1>{cityName}</h1>
            <CoordinatesContainer>
                <span>Lat: {latitute} Long: {longitude}</span>
            </CoordinatesContainer>
            <ClimateBoxesContainer>
                <ClimateBox label="Mínima" value={forecast.minimumTemperature} unit={forecast.farenheit ? ForecastUnit.FARENHEIT : ForecastUnit.CELSIUS} />
                <ClimateBox label="Máxima" value={forecast.maximumTemperature} unit={forecast.farenheit ? ForecastUnit.FARENHEIT : ForecastUnit.CELSIUS} />
                <ClimateBox label="Umidade" value={forecast.humidity} unit={ForecastUnit.PERCENT} />
                <ClimateBox label="Velocidade do vento" value={forecast.windSpeed} unit={ForecastUnit.METERS_PER_SECOND} />
            </ClimateBoxesContainer>
            <TodayText>{todayText}</TodayText>
        </TodayClimateContainer>
    )
}

const ClimateBoxesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 40px;
    margin-top: 30px;
    margin-bottom: 66px;
`;

const TodayClimateContainer = styled.div`
    width: 100%;
    box-sizing: content-box;
    h1{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 150px;
        font-weight: 400;
        line-height: 100%;

        @media (max-width: 1360px){
            font-size: 75px;
        }
    }
`;

const CoordinatesContainer = styled.div`
    width: 100%;
    padding: 10px;
    span{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
    }

    @media (max-width: 1360px){
        span{
            font-size: 10px;
            line-height: 10px;
        }
        padding: 5px;
    }

`;

const TodayText = styled.span`
    color: ${({ theme }) => theme.colors.textToday};
    font-size: 24px;
    font-style: italic;
    font-weight: 400;
    line-height: 100%;

    @media (max-width: 1360px){
        font-size: 18px;
    }
`;
