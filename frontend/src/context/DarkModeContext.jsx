// context/DarkModeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // Start with light mode

  useEffect(() => {
    // 1. Add/remove 'dark' class to HTML element
    document.documentElement.classList.toggle('dark', isDark);
    // 2. Force color scheme
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);