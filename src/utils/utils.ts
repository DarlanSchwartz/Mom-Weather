import { Weather } from "../protocols/Application.types";
import { MIN_TEMP_TO_FREEZE } from "../protocols/Constants";
import { WeatherCondition } from "../protocols/WeatherAPI.types";
import { LightColors } from "../styles/Colors";

export function capitalizeWords(sentence: string): string {
    if (sentence.length === 0) return sentence;

    const words = sentence.split(/\s|-/);

    const capitalizedWords = words.map((word) => {
        if (word.length === 0) return word;

        const firstLetter = word.charAt(0).toUpperCase();
        const restOfString = word.slice(1);

        return `${firstLetter}${restOfString}`;
    });

    return capitalizedWords.join(" ");
}

export function capitalizeFirstLetter(input: string): string {
    if (input.length === 0) return input;
    const firstLetter = input.charAt(0).toUpperCase();
    const restOfString = input.slice(1);
    return `${firstLetter}${restOfString}`;
}

export function convertCelciusToFarenheit(celcius: number): number {
    return Math.round(((celcius * 9) / 5 + 32));
}

export function metersPerSecondToMPH(metersPerSecond: number): number {
    return Math.round(metersPerSecond * 2.23694);
}

export function getTodayText(weather: Weather) {
    if (weather.currentTemperature < MIN_TEMP_TO_FREEZE ||
        weather.min < MIN_TEMP_TO_FREEZE ||
        weather.max < MIN_TEMP_TO_FREEZE) {
        return 'Sim, você deve levar um casaquinho!';
    }
    return 'Não, você não deve levar um casaquinho!';
}

export function addLeadingZero(number: number) {
    return number < 10 ? `0${number}` : number;
}

export function formatDateString(input: string, locale?: string, dateOptions?: Intl.DateTimeFormatOptions): string {
    const inputDate = new Date(input);
    const formatter = new Intl.DateTimeFormat(locale, dateOptions);
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const dayOfWeek = formatter.format(inputDate).slice(0, 3);
    const formattedDate = `${day}/${month} (${dayOfWeek})`;
    return formattedDate;
}

export function getWeatherColor(weatherName: WeatherCondition) {
    switch (weatherName) {
        case WeatherCondition.THUNDERSTORM:
            return LightColors.wthunderstorm;
        case WeatherCondition.DRIZZLE:
            return LightColors.wdrizzle;
        case WeatherCondition.RAIN:
            return LightColors.wrain;
        case WeatherCondition.SNOW:
            return LightColors.wsnow;
        case WeatherCondition.CLEAR:
            return LightColors.wclear;
        case WeatherCondition.CLOUDS:
            return LightColors.wclouds;
        case WeatherCondition.MIST:
            return LightColors.wmist;
        default:
            return LightColors.wclear;
    }
}


export function randomRange(minNum: number, maxNum: number) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}