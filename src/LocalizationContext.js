import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import I18n from "i18n-js";
import { tr, en } from "./localization";
const LocalizationContext = createContext();

export function LocalizationProvider({ children }) {
  const [questionLanguages, setQuestionLanguages] = useState("tr");
  const [langObj, setLangObj] = useState();
  useEffect(() => {
    handleQuestionLanguage();
  }, []);

  async function handleQuestionLanguage() {
    const lanHistory = await AsyncStorage.getItem("questionLanguage");
    const lanObjHistory = await AsyncStorage.getItem("langObject");
    console.log("====================================");
    console.log(lanObjHistory);
    console.log("====================================");
    if (lanHistory !== null) {
      setQuestionLanguages(JSON.parse(lanHistory));
    }

    if (lanObjHistory !== null) {
      console.log("HEYOOOO");
      setLangObj(JSON.parse(lanObjHistory));
    }
  }

  return (
    <LocalizationContext.Provider
      value={{ questionLanguages, setQuestionLanguages, langObj, setLangObj }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

export default LocalizationContext;
