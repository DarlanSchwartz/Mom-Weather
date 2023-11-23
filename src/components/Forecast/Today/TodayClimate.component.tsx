import ClimateBox from './ClimateBox.mini';
import { TodayForecast, ForecastUnit } from '../../../protocols/Application.types';
import styled from 'styled-components';
import { useWindowSize } from "@uidotdev/usehooks";

export default function TodayClimate({ todayText, forecast, speedUnit }: TodayForecast) {
    const size = useWindowSize();
    return (
        <TodayClimateContainer>
            <ClimateBoxesContainer>
                <ClimateBox label="Mínima" value={forecast.minimumTemperature} unit={forecast.fahrenheit ? ForecastUnit.FAHRENHEIT : ForecastUnit.CELSIUS} />
                <ClimateBox label="Máxima" value={forecast.maximumTemperature} unit={forecast.fahrenheit ? ForecastUnit.FAHRENHEIT : ForecastUnit.CELSIUS} />
                <ClimateBox label="Umidade" value={forecast.humidity} unit={ForecastUnit.PERCENT} />
                <ClimateBox label={`${(size && size.width !== null && size.width < 440) ? "Vel." : "Velocidade"} do vento`} value={forecast.windSpeed} unit={speedUnit} />
            </ClimateBoxesContainer>
            <TodayText>{todayText}</TodayText>
        </TodayClimateContainer>
    )
}

const ClimateBoxesContainer = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2,1fr);
    width: 100%;
    margin-top: 30px;
    margin-bottom: 66px;
    padding-right: 10px;
    padding-left: 10px;
    max-height: 392px;
    grid-gap: 20px;
    @media (max-width: 660px){
        justify-content: center;
    }
    @media (max-width: 1140px) and (min-width: 660px){
        max-height: 340px;
    }
    @media (max-width: 1366px) and (min-width: 1140px){
        margin-bottom: 20px;
        margin-top: 0px;
    }
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

    @media (max-width: 660px){
        width: 100%;
        text-align: center;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 1366px) and (min-width: 660px){
        font-size: 18px;
    }
`;