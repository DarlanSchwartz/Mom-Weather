import axios from "axios";
import { Weather } from "../protocols/Application.types";
import { WeatherData } from "../protocols/API.types";
import { capitalizeFirstLetter } from "../utils/utils";

const API_KEY = import.meta.env.VITE_API_KEY;

async function getCityClimate(city:string) {
    console.log(city);
}

async function getForecastWithCoords(latitude : number, longitude: number, lang: string, units: string) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=${lang}&units=${units}`;
    const response = await axios.get<WeatherData>(url);
    console.log(response.data);
    if(response.data.cod === 200){
        const result : Weather = {
            name: response.data.weather[0].main,
            city: response.data.name,
            currentTemperature: Math.round(response.data.main.temp),
            min: Math.round(response.data.main.temp_min),
            max: Math.round(response.data.main.temp_max),
            humidity: Math.round(response.data.main.humidity),
            feelsLike: Math.round(response.data.main.feels_like),
            description:  capitalizeFirstLetter(response.data.weather[0].description),
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            windSpeed: Math.round(response.data.wind.speed),
            longitude: Number(response.data.coord.lon.toFixed(2)),
            latitude: Number(response.data.coord.lat.toFixed(2)),
        };
        return result;
    }

    return {
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
  }

const API = {
    getCityClimate,
    getForecastWithCoords
};

export default API;