export enum ForecastUnit {
    FARENHEIT = 'F',
    CELSIUS = 'C',
    PERCENT = '%',
    METERS_PER_SECOND = 'm/s',
}

export type ForecastInformation = {
    minimumTemperature: number;
    maximumTemperature: number;
    humidity: number;
    windSpeed: number;
    farenheit: boolean;
}

export type TodayForecast = {
    cityName: string;
    latitute: number;
    longitude: number;
    todayText: string;
    forecast : ForecastInformation;
}