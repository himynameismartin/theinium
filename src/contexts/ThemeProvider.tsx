import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider, Theme as EmotionTheme, useTheme } from '@emotion/react';
import { defaultsDeep } from 'lodash';

const THEME_SEPARATOR = '.'

type Theme = EmotionTheme & {
  name?: string;
}

type ThemeContextType = Record<string, Theme>;

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

type ThemeContextProviderProps = {
  themes: ThemeContextType;
  children: React.ReactNode;
};

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = (
  { themes, children },
) => {
  return <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>;
};

const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

type ThemeProviderProps = {
  name: string;
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ name, children }) => {
  const themes = useThemeContext();
  const currentTheme = useTheme() as Theme;
  const currentThemeName = currentTheme?.name || '';
  const selectedTheme = themes[name];

  if (!selectedTheme) {
    throw new Error(`Theme with name "${name}" does not exist.`);
  }

  const themeNames = currentThemeName.split(THEME_SEPARATOR) || [];
  const firstTheme = themes[themeNames[0]] || {};

  const mergedTheme = defaultsDeep({}, selectedTheme, firstTheme);

  const fullName = currentThemeName ? `${currentThemeName}${THEME_SEPARATOR}${name}` : name;
  const finalTheme = { ...mergedTheme, name: fullName };

  return <EmotionThemeProvider theme={finalTheme}>{children}</EmotionThemeProvider>;
};
