import { Weather } from "./Application.types";

export const MIN_TEMP_TO_FREEZE = 17;
export const OPEN_WEATHER_LINK = "https://openweathermap.org/";
export const GEOAPIFY_LINK = "https://www.geoapify.com/";
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;
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