import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.page";
import { ThemeProvider } from "styled-components";
import { LightColors, DarkColors } from "./styles/Colors";
import { useState } from "react";
import ThemeContext from "./contexts/Theme.context";

export default function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  function getCurrentColors() {
    return darkModeEnabled ? DarkColors : LightColors;
  }
  return (
    <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled }}>
      <ThemeProvider theme={{ colors: { ...getCurrentColors() } }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}