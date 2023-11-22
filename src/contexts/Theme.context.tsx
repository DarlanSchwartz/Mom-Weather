import { createContext } from 'react';
import React from 'react';

type ThemeContextProps = {
    darkModeEnabled: boolean;
    setDarkModeEnabled:  React.Dispatch<React.SetStateAction<boolean>>;
    enableDarkMode: () => void;
    disableDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);
export default ThemeContext;