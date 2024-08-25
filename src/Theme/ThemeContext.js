// ThemeContext.js
import React, {createContext, useContext, useState} from 'react';
import {DARK_THEME, LIGHT_THEME} from '../constants/Colors';

const ThemeContext = createContext();

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState(LIGHT_THEME);

  const toggleTheme = manualTheme => {
    if (manualTheme) {
      setTheme(manualTheme);
    } else {
      setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
    }
  };

  return (
    <ThemeContext.Provider value={{COLORS: theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
