import React, { createContext, useState, useEffect, useRef } from 'react';

export const ThemeContext = createContext();

const THEME_TRANSITION_MS = 1100;

export function ThemeProvider({ children }) {
  const transitionTimerRef = useRef(null);

  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('smartai-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('smartai-theme', theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => () => clearTimeout(transitionTimerRef.current), []);

  const withThemeTransition = (applyChange) => {
    try {
      const reduceMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion) {
        const root = document.documentElement;
        root.classList.add('theme-transition');
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = setTimeout(() => {
          root.classList.remove('theme-transition');
        }, THEME_TRANSITION_MS + 100);
      }
    } catch (e) {}
    applyChange();
  };

  const toggleTheme = () => {
    withThemeTransition(() => setThemeState(prev => (prev === 'light' ? 'dark' : 'light')));
  };

  const setTheme = (t) => {
    if (t === 'light' || t === 'dark') {
      withThemeTransition(() => setThemeState(t));
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}