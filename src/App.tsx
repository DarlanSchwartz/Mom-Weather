import { useState, useEffect } from "react";
import ThemeContext from "./contexts/Theme.context";
import { ThemeProvider } from "styled-components";
import { LightColors, DarkColors } from "./styles/Colors";
import ApplicationContext from "./contexts/Application.context";
import { DEFAULT_USER_DATA, DEFAULT_WEATHER } from "./protocols/Constants";
import { APP_ROUTES } from "./routes/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserNavigatorData } from "./protocols/Application.types";
import { requestUserGeolocation } from "./services/Services.service";
import API from "./services/API.service";
import { useMutation } from "react-query";
import PageHome from "./pages/Home.page";
import PageNotFound from "./pages/NotFound.page";

export default function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  const [useFarhenheit, setUseFarhenheit] = useState(false);
  const [cityName, setCityName] = useState<string>("");
  const [userNavigatorData, setUserNavigatorData] = useState<UserNavigatorData | null>(DEFAULT_USER_DATA);

  const { data: currentWeatherData, isLoading: loading, mutateAsync: searchWeather } = useMutation({
    mutationKey: `weather`,
    mutationFn: () => cityName === "" ?
      API.getCityClimateByCoords(userNavigatorData?.lat || 0, userNavigatorData?.lon || 0, userNavigatorData?.lang || 'en')
      : API.getCityClimateByName(cityName),
  });

  useEffect(() => {
    const item = localStorage.getItem('darkModeEnabled');
    if (item) setDarkModeEnabled(JSON.parse(item).darkModeEnabled);
    if(localStorage.getItem("rejected-geolocation")) return;
    requestUserGeolocation(setUserNavigatorData, darkModeEnabled);
  }, []);

  useEffect(() => {
    if (userNavigatorData) searchWeather();
  }, [userNavigatorData]);

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

  //save farhenheit
  // readme
  //favorites
  return (

    <ApplicationContext.Provider value={{
      cityName,
      setCityName,
      currentWeather: currentWeatherData?.weather || DEFAULT_WEATHER,
      useFarhenheit,
      setUseFarhenheit,
      searchWeather,
      currentForecast: currentWeatherData?.forecast?.list || [],
      loading,
      // userRejectedGeolocation: userNavigatorData?.rejected || false,
    }}>
      <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled, enableDarkMode, disableDarkMode }}>
        <ThemeProvider theme={{ colors: { ...getCurrentColors() } }}>
          <BrowserRouter>
            <Routes>
              <Route path={APP_ROUTES.HOME} element={<PageHome />} />
              <Route path={APP_ROUTES.NOT_FOUND} element={<PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ApplicationContext.Provider>
  )
}