import axios from "axios";
import { Weather } from "../protocols/Application.types";
import { ForecastAPIResponse, WeatherAPIResponse, WeatherCondition } from "../protocols/WeatherAPI.types";
import { capitalizeFirstLetter, getWeatherColor } from "../utils/utils";
import { GeoLocationAPIResponse } from "../protocols/GeolocationAPI.types";
import { BAD_WEATHER_OBJECT, GEOCODE_API_KEY , WEATHER_API_KEY } from "../protocols/Constants";

async function getCityClimateByName(city: string) {
    const encodedCity = encodeURI(city);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedCity}&apiKey=${GEOCODE_API_KEY}`;
    const cityInformation = await axios.get<GeoLocationAPIResponse>(url);
    if (cityInformation.data.features.length === 0) return { weather: BAD_WEATHER_OBJECT, forecast: null };
    cityInformation.data.features.sort((a, b) => b.properties.rank.importance - a.properties.rank.importance);
    const weather = await getWeatherByCoords(cityInformation.data.features[0].properties.lat, cityInformation.data.features[0].properties.lon, navigator.language.toLocaleLowerCase().replace('-', '_'));
    const forecast = await getForecastByCoords(cityInformation.data.features[0].properties.lat, cityInformation.data.features[0].properties.lon, navigator.language.toLocaleLowerCase().replace('-', '_'));
    weather.city = cityInformation.data.features[0].properties.city || cityInformation.data.features[0].properties.municipality || cityInformation.data.features[0].properties.county || cityInformation.data.features[0].properties.state || cityInformation.data.features[0].properties.country;
    return { weather, forecast };
}

async function getCityClimateByCoords(latitude: number, longitude: number, lang: string) {
    const weather = await getWeatherByCoords(latitude, longitude, lang);
    const forecast = await getForecastByCoords(latitude, longitude, lang);
    return { weather, forecast };
}

async function getWeatherByCoords(latitude: number, longitude: number, lang: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=${lang}&units=metric`;
    const response = await axios.get<WeatherAPIResponse>(url);
    if (response.data.cod === 200) {
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
        console.log(response.data);
    }

    return BAD_WEATHER_OBJECT;
}

async function getForecastByCoords(latitude: number, longitude: number, lang: string) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=${lang}&units=metric`;
    const result = await axios.get<ForecastAPIResponse>(url);
    return result.data as ForecastAPIResponse;
}

const API = {
    getCityClimateByName,
    getWeatherByCoords,
    getForecastByCoords,
    getCityClimateByCoords
};

export default API;