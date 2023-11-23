import { LightColors } from "../styles/Colors";
import { UserData, Weather } from "./Application.types";

export const MIN_TEMP_TO_FREEZE = import.meta.env.VITE_MIN_TEMP_TO_FREEZE as number;
export const OPEN_WEATHER_LINK = import.meta.env.VITE_WEATHER_API_LINK as string;
export const GEOAPIFY_LINK = import.meta.env.VITE_GEOCODE_API_LINK as string;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
export const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY as string;
export const DEFAULT_ERROR_TITLE = 'Error';


export const BAD_WEATHER_OBJECT = {
    name: 'Error',
    city: 'Error',
    currentTemperature: 0,
    min: 0,
    max: 0,
    humidity: 0,
    feelsLike: 0,
    description: 'Error',
    icon: '',
    windSpeed: 0,
    longitude: 0,
    latitude: 0,
} as Weather;


export const DEFAULT_WEATHER = {
    currentTemperature: 0,
    description: '',
    icon: '',
    humidity: 0,
    max: 0,
    min: 0,
    windSpeed: 0,
    city: '',
    feelsLike: 0,
    name: '',
    latitude: 0,
    longitude: 0,
    color: LightColors.wclear,
} as Weather;

export const DEFAULT_USER_DATA = {
    lat: -23.5489,
    lon: -46.6388,
    lang: 'pt_br',
} as UserData;