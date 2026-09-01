import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

const getInitialTheme = (initialTheme?: string) => {
  if (typeof window === 'undefined') {
    return initialTheme || 'light';
  }

  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  } catch {
    // Ignore storage access issues in restricted browser states.
  }

  return initialTheme || 'light';
};

export const ThemeProvider = ({ children, initialTheme }: { children: React.ReactNode; initialTheme?: string }) => {
  const [theme, setThemeState] = useState(getInitialTheme(initialTheme));

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // Ignore protected storage errors.
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useLayoutEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore protected storage errors.
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
