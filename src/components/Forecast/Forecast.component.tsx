
import styled from 'styled-components';
import TodayClimate from './Today/TodayClimate.component';
import { useContext, useState } from 'react';
import OpenWeatherCred from '../OpenWeatherCred.mini';
import ApplicationContext from '../../contexts/Application.context';
import { convertCelciusToFarenheit, getTodayText, metersPerSecondToMPH } from '../../utils/utils';
import { ForecastUnit } from '../../protocols/Application.types';
import NextDaysClimate from './Next Days/NextDaysClimate.component';
import LoadingClimate from '../LoadingClimate.mini';
import Rain from '../RainDrops.component';
import { WeatherCondition } from '../../protocols/WeatherAPI.types';
import ForecastMap from './Map.component';
import { FaMapLocationDot } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { IoToday } from "react-icons/io5";
import { useWindowSize } from "@uidotdev/usehooks";
import SnowDrops from '../SnowDrops.component';
enum ForecastState {
    TODAY,
    NEXT_DAYS,
    MAP
}
export default function Forecast() {
    const [forecastState, setForecastState] = useState(ForecastState.TODAY);
    const { currentForecast, currentWeather, useFarhenheit, loading } = useContext(ApplicationContext);
    const errorOcurred = currentWeather.name === "Não encontrado";
    const size = useWindowSize();

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
                        {size && size.width !== null && size.width < 660 ? <IoToday className="icon"/> : "Hoje"}
                    </ForecastHeaderItem>
                    <ForecastHeaderItem
                        $active={forecastState == ForecastState.NEXT_DAYS}
                        onClick={() => {
                            if (forecastState == ForecastState.NEXT_DAYS) return;
                            setForecastState(ForecastState.NEXT_DAYS);
                        }}
                    >
                        {size && size.width !== null && size.width < 660 ? <GoGraph className="icon"/> : 
                        size && size.width !== null && size.width < 862 ? "Próx. dias" : "Próximos dias"
                        }
                    </ForecastHeaderItem>
                    <ForecastHeaderItem
                        $active={forecastState == ForecastState.MAP}
                        onClick={() => {
                            if (forecastState == ForecastState.MAP) return;
                            setForecastState(ForecastState.MAP);
                        }}
                    >
                       {size && size.width !== null && size.width < 660 ? <FaMapLocationDot className="icon"/> : "Mapa"}
                    </ForecastHeaderItem>
                </ForecastHeader>

                {
                    (currentWeather.name === WeatherCondition.RAIN
                        || currentWeather.name === WeatherCondition.THUNDERSTORM
                        || currentWeather.name === WeatherCondition.DRIZZLE) &&
                    <Rain dropCount={
                        currentWeather.name === WeatherCondition.RAIN ? 100 :
                            currentWeather.name === WeatherCondition.THUNDERSTORM ? 500 :
                                currentWeather.name === WeatherCondition.DRIZZLE ? 50 : 0
                    } />
                }
                {
                    currentWeather.name === WeatherCondition.SNOW &&
                    <SnowDrops dropCount={130} />
                }
                <>
                    {
                        loading ?
                            <LoadingClimate />
                            :
                            <>
                                <CityName>
                                    <div className='texts'>
                                    <h1>{currentWeather.city}</h1>
                                    <Coord>Lat: {currentWeather.latitude} Long: {currentWeather.longitude}</Coord>
                                    </div>
                                </CityName>

                                {
                                    forecastState == ForecastState.TODAY ?
                                        <>
                                            {
                                                !errorOcurred &&

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
                                            }
                                        </>
                                        : forecastState == ForecastState.NEXT_DAYS ?
                                            <>
                                                {
                                                    !errorOcurred &&
                                                    <NextDaysClimate forecast={currentForecast} useFarheinheit={useFarhenheit} />
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    !errorOcurred &&
                                                    <ForecastMap
                                                        heigth={"500"}
                                                        width={"100%"}
                                                        weather={currentWeather}
                                                        useFarhenheit={useFarhenheit}
                                                    />
                                                }
                                            </>
                                }
                            </>
                    }
                </>

            </MainContent>
            <OpenWeatherCred />
        </ForecastContainer>
    )
}

const CityName = styled.div`
    color: ${({ theme }) => theme.colors.textMainBlack};
   
    width: 100%;
    margin-top: 90px;
    margin-bottom: 20px;
    
    padding-right: 20px;

    h1{
        font-size: 130px;
        font-weight: 400;
        line-height: 40%;
        white-space: nowrap;
    }
    .texts{
        display: flex;
        flex-direction: column;
        width: fit-content;
    }
    
    @media (max-width: 400px){
       h1{
            font-size: 40px;
            line-height: 100%;
       }
        margin-top: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;
    }

    @media (max-width: 660px) and (min-width: 400px){
        h1{
            font-size: 50px;
            line-height: 100%;
        }
        
        margin-top: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 1366px) and (min-width: 660px){
        h1{
            font-size: 75px;
        }
        margin-top: 30px;
        margin-bottom: 0;
    }
`;

const ForecastHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 90px;
    align-items: center;
    padding-top: 30px;

    @media (max-width: 660px){
       justify-content: space-between;
       gap: 0;
       padding-right: 20px;
       padding-left: 20px;
       border-bottom: 2px solid rgba(164, 164, 164, 0.1);
       padding-bottom: 10px;
       padding-top: 10px;
    }
    @media (max-width: 862px) and (min-width: 660px){
       gap: 45px;
    }
    @media (max-width: 1366px) and (min-width: 862px){
       gap: 60px;
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
    @media (max-width: 660px){
        min-height: calc(100svh - 80px);
        padding: 0;
    }
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
    &:hover{
        opacity: 1;
    }

    @media (max-width: 660px){
        font-size: 30px;
    }

    .icon{
        font-size: 25px;
        color : ${p => p.$active ? p.theme.colors.textMainBlack : p.theme.colors.textLowGray};
       
    }
`;

const Coord = styled.span`
    width: 100%;
    text-align: left;
    color: ${({ theme }) => theme.colors.textMainBlack};
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    top:160%;
    margin-top: 50px;
    padding-left: 5px;
    @media (max-width: 660px){
        font-size: 10px;
        line-height: 10px;
        width: calc(100% -20px);
        margin-top: 10px;
    }

    @media (max-width: 1366px) and (min-width: 660px){
       
        font-size: 14px;
        line-height: 14px;
    }
`;

