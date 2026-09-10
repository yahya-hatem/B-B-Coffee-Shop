import React, {createContext, ReactNode, useCallback, useState} from 'react';

export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setDarkMode(previous => !previous);
  }, []);

  return (
    <ThemeContext.Provider value={{darkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
