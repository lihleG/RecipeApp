import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export function ThemeProvider( { children }) {
    const [theme, setTheme] = useState('light');

      useEffect(() => {
    AsyncStorage.getItem('@user_settings').then(json => {
      const data = json ? JSON.parse(json) : {};
      setTheme(data.darkMode ? 'dark' : Appearance.getColorScheme() || 'light');
    });
  }, []);

     const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark': 'light';
        setTheme(newTheme);
        AsyncStorage.mergeItem('@user_settings', JSON.stringify({ darkMode: newTheme === 'dark' }));
     };

     return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
     );
}