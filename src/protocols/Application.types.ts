export enum ForecastUnit {
    FAHRENHEIT = ' F',
    CELSIUS = ' C',
    PERCENT = '%',
    METERS_PER_SECOND = ' m/s',
    MILES_PER_HOUR = ' mph',
}

export type ForecastInformation = {
    minimumTemperature:number;
    maximumTemperature: number;
    humidity: number;
    windSpeed: number;
    fahrenheit: boolean;
}

export type TodayForecast = {
    cityName: string;
    latitute: number;
    longitude: number;
    todayText: string;
    forecast : ForecastInformation;
    speedUnit: ForecastUnit;
}

export type Weather = {
    city:string;
    name: string;
    description:string;
    currentTemperature:number;
    min:number;
    max:number;
    humidity:number;
    feelsLike:number;
    icon: string;
    windSpeed: number;
    longitude: number;
    latitude: number;
}