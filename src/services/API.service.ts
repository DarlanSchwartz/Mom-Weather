import axios from "axios";
import { Weather } from "../protocols/Application.types";
import { ForecastAPIResponse, WeatherAPIResponse, WeatherCondition } from "../protocols/WeatherAPI.types";
import { capitalizeFirstLetter, getWeatherColor } from "../utils/utils";
import { GeoLocationAPIResponse } from "../protocols/GeolocationAPI.types";
import { BAD_WEATHER_OBJECT, DEFAULT_ERROR_TITLE, GEOCODE_API_KEY, WEATHER_API_KEY } from "../protocols/Constants";
import { throwError } from "./Services.service";

/**
 * Gets city climate by name
 * @param city city name to get climate
* @param [darkModeEnabled] is dark mode enabled? This is used to show error message in dark mode.
 * @example
 * const { weather, forecast } = await getCityClimateByName('São Paulo', true);
 */
async function getCityClimateByName(city: string, darkModeEnabled = false) {
    const encodedCity = encodeURI(city);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedCity}&apiKey=${GEOCODE_API_KEY}`;
    const cityInformation = await axios.get<GeoLocationAPIResponse>(url);
    if (cityInformation.data.features.length === 0) {
        throwError('Não foi possivel obter o clima desta localização.', DEFAULT_ERROR_TITLE, darkModeEnabled);
        return { weather: BAD_WEATHER_OBJECT, forecast: null };
    }
    cityInformation.data.features.sort((a, b) => b.properties.rank.importance - a.properties.rank.importance);
    const weather = await getWeatherByCoords(cityInformation.data.features[0].properties.lat, cityInformation.data.features[0].properties.lon, navigator.language.toLocaleLowerCase().replace('-', '_'));
    const forecast = await getForecastByCoords(cityInformation.data.features[0].properties.lat, cityInformation.data.features[0].properties.lon, navigator.language.toLocaleLowerCase().replace('-', '_'));
    weather.city = cityInformation.data.features[0].properties.city || cityInformation.data.features[0].properties.municipality || cityInformation.data.features[0].properties.county || cityInformation.data.features[0].properties.state || cityInformation.data.features[0].properties.country;
    return { weather, forecast };
}

/**
 * Gets city climate by coords
 * @param latitude latitude number to get climate
 * @param longitude longitude number to get climate
 * @param lang language to get climate
 * @example
 * const { weather, forecast } = await getCityClimateByCoords(-23.682, -46.875, 'pt_br', true);
 */
async function getCityClimateByCoords(latitude: number, longitude: number, lang: string) {
    const weather = await getWeatherByCoords(latitude, longitude, lang);
    const forecast = await getForecastByCoords(latitude, longitude, lang);
    return { weather, forecast };
}

/**
 * Gets weather by coords
 * @param latitude latitude number to get weather
 * @param longitude longitude number to get weather
 * @param lang language to get weather
 * @param [darkModeEnabled] is dark mode enabled? This is used to show error message in dark mode.
 * @example
 * const weather = await getWeatherByCoords(-23.682, -46.875, 'pt_br', true);
 */
async function getWeatherByCoords(latitude: number, longitude: number, lang: string, darkModeEnabled = false) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=${lang}&units=metric`;
    const response = await axios.get<WeatherAPIResponse>(url);
    if (response.data.cod == 200) {
        const result: Weather = {
            name: response.data.weather[0].main,
            city: response.data.name,
            currentTemperature: Math.round(response.data.main.temp),
            min: Math.round(response.data.main.temp_min),
            max: Math.round(response.data.main.temp_max),
            humidity: Math.round(response.data.main.humidity),
            feelsLike: Math.round(response.data.main.feels_like),
            description: capitalizeFirstLetter(response.data.weather[0].description),
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            windSpeed: Math.round(response.data.wind.speed),
            longitude: Number(response.data.coord.lon.toFixed(2)),
            latitude: Number(response.data.coord.lat.toFixed(2)),
            color: getWeatherColor(response.data.weather[0].main as WeatherCondition)
        };
        return result;
    }
    else {
        throwError('Não foi possivel obter o clima desta localização.', DEFAULT_ERROR_TITLE, darkModeEnabled);
    }

    return BAD_WEATHER_OBJECT;
}

/**
 * Gets forecast by coords
 * @param latitude latitude number to get forecast
 * @param longitude longitude number to get forecast
 * @param lang language to get forecast
 * @param [darkModeEnabled] is dark mode enabled used to show error message in dark mode 
 * @example
 * const forecast = await getForecastByCoords(-23.682, -46.875, 'pt_br', true);
 */
async function getForecastByCoords(latitude: number, longitude: number, lang: string, darkModeEnabled = false) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=${lang}&units=metric`;
    const result = await axios.get<ForecastAPIResponse>(url);
    if (result.data.cod != '200') throwError('Não foi possivel obter a previsão do tempo desta localização.', DEFAULT_ERROR_TITLE, darkModeEnabled);
    return result.data as ForecastAPIResponse;
}

/** 
 * @example
 * import API from '../services/API.service';
 * const { weather, forecast } = await API.getCityClimateByName('São Paulo', true);
 */
const API = {
    getCityClimateByName,
    getWeatherByCoords,
    getForecastByCoords,
    getCityClimateByCoords
};

export default API;