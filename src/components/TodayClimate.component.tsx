import ClimateBox from './ClimateBox.mini';
import { TodayForecast, ForecastUnit } from '../protocols/Application.types';
import styled from 'styled-components';

export default function TodayClimate({ todayText, forecast, speedUnit }: TodayForecast) {
    return (
        <TodayClimateContainer>
            
            <ClimateBoxesContainer>
                <ClimateBox label="Mínima" value={forecast.minimumTemperature} unit={forecast.fahrenheit ? ForecastUnit.FAHRENHEIT : ForecastUnit.CELSIUS} />
                <ClimateBox label="Máxima" value={forecast.maximumTemperature} unit={forecast.fahrenheit ? ForecastUnit.FAHRENHEIT : ForecastUnit.CELSIUS} />
                <ClimateBox label="Umidade" value={forecast.humidity} unit={ForecastUnit.PERCENT} />
                <ClimateBox label="Velocidade do vento" value={forecast.windSpeed} unit={speedUnit} />
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