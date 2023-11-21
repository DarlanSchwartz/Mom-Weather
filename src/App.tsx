import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.page";
import { ThemeProvider } from "styled-components";
import { LightColors, DarkColors } from "./styles/Colors";
import { useState, useEffect } from "react";
import ThemeContext from "./contexts/Theme.context";
import { Weather } from "./protocols/Application.types";
import ApplicationContext from "./contexts/Application.context";
import { requestUserGeolocation } from "./services/Services.service";

export default function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  const [useFarhenheit, setUseFarhenheit] = useState(false);
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
    longitude: 0
  });

  function getCurrentColors() {
    return darkModeEnabled ? DarkColors : LightColors;
  }
  useEffect(() => {
    requestUserGeolocation((weather) => setCurrentWeather(weather));
  }, []);

  return (
    <ApplicationContext.Provider value={{ currentWeather, setCurrentWeather, useFarhenheit, setUseFarhenheit }}>
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