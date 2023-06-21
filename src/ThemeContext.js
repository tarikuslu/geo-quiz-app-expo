import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "./themeConfig";
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeType, setThemeType] = useState();
  const [themeObj, setThemeObj] = useState(lightTheme);

  useEffect(() => {
    handleThemeDetect();
  }, []);

  async function handleThemeDetect() {
    const themeObject = await AsyncStorage.getItem("themeObj");
    const themeTip = await AsyncStorage.getItem("themeType");
    if (themeObject !== null) {
      setThemeObj(JSON.parse(themeObject));
    }

    if (themeTip !== null) {
      setThemeType(JSON.parse(themeTip));
    }
  }

  return (
    <ThemeContext.Provider
      value={{ themeType, setThemeType, themeObj, setThemeObj }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
