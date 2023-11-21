import { Weather } from "../protocols/Application.types";
import { MIN_TEMP_TO_FREEZE } from "../protocols/Constants";

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
    if (weather.currentTemperature <= MIN_TEMP_TO_FREEZE ||
        weather.min <= MIN_TEMP_TO_FREEZE ||
        weather.max <= MIN_TEMP_TO_FREEZE) {
        return 'Sim, você deve levar um casaquinho!'
    }
    return 'Não, você não deve levar um casaquinho!';
}

export function addLeadingZero(number: number) {
    return number < 10 ? `0${number}` : number;
}