import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.page";
import { ThemeProvider } from "styled-components";
import { LightColors, DarkColors } from "./styles/Colors";
import { useState, useEffect } from "react";
import ThemeContext from "./contexts/Theme.context";
import { Weather } from "./protocols/Application.types";
import ApplicationContext from "./contexts/Application.context";
import { requestUserGeolocation } from "./services/Services.service";
import API from "./services/API.service";
import { APIForecastResponse } from "./protocols/WeatherAPI.types";

export default function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  const [useFarhenheit, setUseFarhenheit] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentForecast, setCurrentForecast] = useState<APIForecastResponse[]>([]);
  const [currentWeather, setCurrentWeather] = useState<Weather>({
    currentTemperature: 0,
    description: '',
    icon: '',
    humidity: 0,
    max: 0,
    min: 0,
    windSpeed: 0,
    city: '',
    feelsLike: 0,
    name: '',
    latitude: 0,
    longitude: 0,
    color: LightColors.wclear,
  });

  function enableDarkMode() {
    setDarkModeEnabled(true);
    localStorage.setItem('darkModeEnabled', JSON.stringify({ darkModeEnabled: true }));
  }

  function disableDarkMode() {
    setDarkModeEnabled(false);
    localStorage.setItem('darkModeEnabled', JSON.stringify({ darkModeEnabled: false }));
  }

  function getCurrentColors() {
    return darkModeEnabled ? DarkColors : LightColors;
  }
  useEffect(() => {
    setLoading(true);
    const item = localStorage.getItem('darkModeEnabled');
    if (item) setDarkModeEnabled(JSON.parse(item).darkModeEnabled);
    requestUserGeolocation((weather, forecast) => {
      setCurrentWeather(weather);
      setCurrentForecast(forecast.list);
      setLoading(false);
    });
  }, []);

  async function searchWeather(city: string) {
    setLoading(true);
    const result = await API.getCityClimate(city);
    setCurrentWeather(result.weather);
    setCurrentForecast(result.forecast?.list || []);
  }

  return (
    <ApplicationContext.Provider value={{
      currentWeather,
      setCurrentWeather,
      useFarhenheit,
      setUseFarhenheit,
      searchWeather,
      currentForecast,
      loading
    }}>
      <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled, enableDarkMode, disableDarkMode }}>
        <ThemeProvider theme={{ colors: { ...getCurrentColors() } }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ApplicationContext.Provider>
  )
}