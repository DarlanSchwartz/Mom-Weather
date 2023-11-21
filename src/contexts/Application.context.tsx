import { createContext } from 'react';
import React from 'react';
import { Weather } from '../protocols/Application.types';

type ApplicationContextProps = {
    currentWeather: Weather;
    setCurrentWeather: React.Dispatch<React.SetStateAction<Weather>>;
}

const ApplicationContext = createContext<ApplicationContextProps>({} as ApplicationContextProps);

export default ApplicationContext;