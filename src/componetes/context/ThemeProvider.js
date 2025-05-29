import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
  const [darkMode, setDarkMode] = useState(storedDarkMode ?? false);
  const storedLang = localStorage.getItem('lang');
  const [lang, setLang] = useState(storedLang || 'en');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode, lang, setLang }}>
      <div className={darkMode ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
