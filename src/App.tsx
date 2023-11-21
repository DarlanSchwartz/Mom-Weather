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

export default function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  const [useFarhenheit, setUseFarhenheit] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    color:'orange',
  });

  function getCurrentColors() {
    return darkModeEnabled ? DarkColors : LightColors;
  }
  useEffect(() => {
    setLoading(true);
    requestUserGeolocation((weather) => {
      setCurrentWeather(weather);
      setLoading(false);
    });
  }, []);

  async function searchWeather(city: string) {
    setLoading(true);
    const result = await API.getCityClimate(city);
    setCurrentWeather(result);
  }

  return (
    <ApplicationContext.Provider value={{
      currentWeather,
      setCurrentWeather,
      useFarhenheit,
      setUseFarhenheit,
      searchWeather,
      loading
    }}>
      <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled }}>
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