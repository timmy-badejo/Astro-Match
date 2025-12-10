import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, navLightTheme, navDarkTheme } from '../color/themes';

const STORAGE_KEY = '@astromatch:theme';

const ThemeContext = createContext({
  mode: 'system',
  theme: darkTheme,
  navTheme: navDarkTheme,
  setMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemScheme = Appearance.getColorScheme() || 'dark';
  const [mode, setMode] = useState('system');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setMode(stored);
      setLoaded(true);
    };
    load();
  }, []);

  const appliedMode = mode === 'system' ? systemScheme : mode;
  const theme = appliedMode === 'light' ? lightTheme : darkTheme;
  const navTheme = appliedMode === 'light' ? navLightTheme : navDarkTheme;

  const value = useMemo(
    () => ({
      mode,
      theme,
      navTheme,
      setMode: async (next) => {
        setMode(next);
        await AsyncStorage.setItem(STORAGE_KEY, next);
      },
    }),
    [mode, theme, navTheme],
  );

  if (!loaded) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => useContext(ThemeContext);
