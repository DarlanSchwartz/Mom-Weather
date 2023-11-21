import axios from "axios";
import { Weather } from "../protocols/Application.types";
import { WeatherAPIResponse } from "../protocols/WeatherAPI.types";
import { capitalizeFirstLetter } from "../utils/utils";
import { GeoLocationAPIResponse } from "../protocols/GeolocationAPI.types";
import { BAD_WEATHER_OBJECT } from "../protocols/Constants";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;
async function getCityClimate(city: string) {
    const encodedCity = encodeURI(city);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedCity}&apiKey=${GEOCODE_API_KEY}`;
    const cityInformation = await axios.get<GeoLocationAPIResponse>(url);
    if(cityInformation.data.features.length === 0) return BAD_WEATHER_OBJECT;
    cityInformation.data.features.sort((a, b) => b.properties.rank.importance - a.properties.rank.importance);
    const result = await getForecastWithCoords(cityInformation.data.features[0].properties.lat, cityInformation.data.features[0].properties.lon, navigator.language.toLocaleLowerCase().replace('-', '_'));
    result.city = cityInformation.data.features[0].properties.city;
    return result;
}

async function getForecastWithCoords(latitude: number, longitude: number, lang: string) {
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
        };
        return result;
    }

    return BAD_WEATHER_OBJECT;
}

const API = {
    getCityClimate,
    getForecastWithCoords
};

export default API;