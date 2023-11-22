import { Weather } from "../protocols/Application.types";
import { ForecastAPIResponse } from "../protocols/WeatherAPI.types";
import API from "./API.service";

export function requestUserGeolocation(then: (w: Weather, f: ForecastAPIResponse) => void) {
    let lat = 0;
    let lon = 0;
    let lang = 'en';

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            lang = navigator.language.toLocaleLowerCase().replace('-', '_');
            const result = await API.getCityClimateByCoords(lat, lon, lang);
            then(result.weather, result.forecast);
        }, (err) => console.log(err));
    }
}