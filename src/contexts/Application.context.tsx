import { createContext } from 'react';
import React from 'react';
import { Weather } from '../protocols/Application.types';
import { APIForecastResponse } from '../protocols/WeatherAPI.types';

type ApplicationContextProps = {
    currentWeather: Weather;
    setCurrentWeather: React.Dispatch<React.SetStateAction<Weather>>;
    useFarhenheit: boolean;
    setUseFarhenheit: React.Dispatch<React.SetStateAction<boolean>>;
    searchWeather: (city: string) => void;
    loading: boolean;
    currentForecast: APIForecastResponse[];
}

const ApplicationContext = createContext<ApplicationContextProps>({} as ApplicationContextProps);
export default ApplicationContext;