import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import Main from "./Main";
import {
  configureFonts,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import fontConfig from "../utils/fontConfig";
import { GameProvider } from "./GameContext";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Kanit-Regular": require("../assets/fonts/Kanit-Regular.ttf"),
    "Kanit-Black": require("../assets/fonts/Kanit-Black.ttf"),
    "Kanit-Bold": require("../assets/fonts/Kanit-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig }),
  };

  return (
    <GameProvider>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </GameProvider>
  );
}
