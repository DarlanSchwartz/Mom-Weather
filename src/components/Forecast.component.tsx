
import styled from 'styled-components';
import TodayClimate from './TodayClimate.component';
import { useState } from 'react';
import OpenWeatherCred from './OpenWeatherCred.mini';

enum ForecastState {
    TODAY,
    NEXT_DAYS
}

export default function Forecast() {
    const [forecastState, setForecastState] = useState(ForecastState.TODAY);
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
            {
                forecastState == ForecastState.TODAY ?

                    <TodayClimate
                        cityName='São Paulo'
                        latitute={-23.5489}
                        longitude={-46.6388}
                        todayText='Não, você não deve levar um casaquinho!'
                        forecast={{
                            minimumTemperature: 20,
                            maximumTemperature: 30,
                            humidity: 80,
                            windSpeed: 10,
                            farenheit: false
                        }}
                    />
                    : null
            }

            </MainContent>
           <OpenWeatherCred/>
        </ForecastContainer>
    )
}
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

