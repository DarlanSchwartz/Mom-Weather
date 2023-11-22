
import styled from 'styled-components';
import TodayClimate from './TodayClimate.component';
import { useContext, useState } from 'react';
import OpenWeatherCred from './OpenWeatherCred.mini';
import ApplicationContext from '../contexts/Application.context';
import { convertCelciusToFarenheit, getTodayText, metersPerSecondToMPH } from '../utils/utils';
import { ForecastUnit } from '../protocols/Application.types';
import NextDaysClimate from './NextDaysClimate.component';

enum ForecastState {
    TODAY,
    NEXT_DAYS
}

export default function Forecast() {
    const [forecastState, setForecastState] = useState(ForecastState.TODAY);
    const { currentForecast, currentWeather, useFarhenheit } = useContext(ApplicationContext);
    return (
        <ForecastContainer>
            <MainContent>
                <ForecastHeader>
                    <ForecastHeaderItem
                        $active={forecastState == ForecastState.TODAY}
                        onClick={() => {
                            if (forecastState == ForecastState.TODAY) return;
                            setForecastState(ForecastState.TODAY);
                        }}>
                        Hoje
                    </ForecastHeaderItem>
                    <ForecastHeaderItem
                        $active={forecastState == ForecastState.NEXT_DAYS}
                        onClick={() => {
                            if (forecastState == ForecastState.NEXT_DAYS) return;
                            setForecastState(ForecastState.NEXT_DAYS);
                        }}
                    >
                        Próximos dias
                    </ForecastHeaderItem>
                </ForecastHeader>
                <>
                    <CityName>{currentWeather.city}</CityName>
                    <CoordinatesContainer>
                        <span>Lat: {currentWeather.latitude} Long: {currentWeather.longitude}</span>
                    </CoordinatesContainer>
                </>
                {
                    forecastState == ForecastState.TODAY ?

                        <TodayClimate
                            cityName={currentWeather.city}
                            latitute={currentWeather.latitude}
                            longitude={currentWeather.longitude}
                            todayText={getTodayText(currentWeather)}
                            speedUnit={useFarhenheit ? ForecastUnit.MILES_PER_HOUR : ForecastUnit.METERS_PER_SECOND}
                            forecast={{
                                minimumTemperature: useFarhenheit ? convertCelciusToFarenheit(currentWeather.min) : currentWeather.min,
                                maximumTemperature: useFarhenheit ? convertCelciusToFarenheit(currentWeather.max) : currentWeather.max,
                                humidity: currentWeather.humidity,
                                windSpeed: useFarhenheit ? metersPerSecondToMPH(currentWeather.windSpeed) : currentWeather.windSpeed,
                                fahrenheit: useFarhenheit
                            }}
                        />
                        :
                        <NextDaysClimate forecast={currentForecast} useFarheinheit={useFarhenheit} />
                }

            </MainContent>
            <OpenWeatherCred />
        </ForecastContainer>
    )
}

const CityName = styled.h1`
    color: ${({ theme }) => theme.colors.textMainBlack};
    font-size: 150px;
    font-weight: 400;
    line-height: 40%;
    width: 100%;
    margin-top: 90px;
    white-space: nowrap;

    @media (max-width: 1360px){
        font-size: 75px;
        margin-top: 40px;
    }
`;

const ForecastHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 90px;
    align-items: center;
    padding-top: 30px;
    span{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 48px;
        font-weight: 400;
        line-height: 48px;

        @media (max-width: 1060px){
            font-size: 24px;
            line-height: 24px;
        }
    }
`;
const MainContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 40px;
`;
const ForecastContainer = styled.div`
    width: 100%;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 3%;
    overflow: hidden;
`;

type ForecastHeaderItemProps = {
    $active: boolean;
}

const ForecastHeaderItem = styled.span<ForecastHeaderItemProps>`
    color: ${p => p.$active ? p.theme.colors.textMainBlack : p.theme.colors.textLowGray};
    font-size: 48px;
    font-weight: 400;
    line-height: 48px;
    cursor: pointer;
    opacity: ${p => p.$active ? 1 : 0.5};
    transition: opacity 0.2s ease-in-out;
    :hover{
        opacity: 1;
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

