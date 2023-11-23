import { createContext } from 'react';
import React from 'react';
import { Weather } from '../protocols/Application.types';
import { APIForecastResponse } from '../protocols/WeatherAPI.types';

type ApplicationContextProps = {
    currentWeather: Weather;
    useFarhenheit: boolean;
    setUseFarhenheit: React.Dispatch<React.SetStateAction<boolean>>;
    searchWeather: () => void;
    loading: boolean;
    currentForecast: APIForecastResponse[];
    cityName: string;
    setCityName: React.Dispatch<React.SetStateAction<string>>;
}

const ApplicationContext = createContext<ApplicationContextProps>({} as ApplicationContextProps);
export default ApplicationContext;