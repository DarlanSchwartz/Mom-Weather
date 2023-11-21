import { createContext } from 'react';
import React from 'react';

type ThemeContextProps = {
    darkModeEnabled: boolean;
    setDarkModeEnabled:  React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export default ThemeContext;
