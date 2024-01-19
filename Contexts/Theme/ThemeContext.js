import React, {createContext, useEffect, useState} from 'react';
import {Appearance} from 'react-native';

export const ThemeContext = createContext({
  theme: '',
  updateTheme: () => {},
});

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const updateTheme = newTheme => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, updateTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
