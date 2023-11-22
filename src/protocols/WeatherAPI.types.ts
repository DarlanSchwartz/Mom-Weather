type Coordinates = {
  lon: number;
  lat: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Clouds = {
  all: number;
};

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

type Coord = {
  lon: number;
  lat: number;
};

export type APIForecastResponse = {
  dt: number;
  main: MainWeatherData & { temp_kf: number };
  weather: Weather[];
  clouds: { all: number };
  wind: Wind;
  visibility: number;
  pop: number;
  rain: { "3h": number };
  sys: { pod: string };
  dt_txt: string;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
};

export type ForecastAPIResponse = {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: APIForecastResponse[];
};


export type WeatherAPIResponse = {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export enum WeatherCondition {
  THUNDERSTORM = "Thunderstorm",
  DRIZZLE = "Drizzle",
  RAIN = "Rain",
  SNOW = "Snow",
  MIST= "Mist",
  CLEAR = "Clear",
  CLOUDS = "Clouds",
}