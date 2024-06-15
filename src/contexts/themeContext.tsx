import React, { useState, createContext, useContext } from 'react';



export interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null); // Export the SnackbarContext directly

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}


export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');

  React.useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}

    </ThemeContext.Provider>
  );
};
