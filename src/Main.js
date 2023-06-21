import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Text, Button } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ContinentSelectScreen from "./screens/ContinentSelectScreen";
import GameTypeSelectScreen from "./screens/GameTypeSelectScreen";
import GameScreen from "./screens/GameScreen";
import SettingScreen from "./screens/SettingScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import ChallengeSelectScreen from "./screens/ChallengeSelectScreen";
import LocalizationContext from "./LocalizationContext";
const Main = () => {
  const Stack = createNativeStackNavigator();
  const { langObj } = useContext(LocalizationContext);
  const PlayStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="ContinentSelect"
      >
        <Stack.Screen
          name="ContinentSelect"
          component={ContinentSelectScreen}
        />
        <Stack.Screen name="GameTypeSelect" component={GameTypeSelectScreen} />
        <Stack.Screen
          name="ChallengeSelect"
          component={ChallengeSelectScreen}
        />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Play" component={PlayStack} />
        <Stack.Screen
          options={{
            headerShown: true,
            title: langObj.settingsTitle,
            headerStyle: {
              backgroundColor: "#161925",
            },
            headerTitleStyle: {
              color: "#e1f2fe",
            },
            headerTintColor: "#e1f2fe",
          }}
          name="Settings"
          component={SettingScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: langObj.gameHistoryTitle,
            headerStyle: {
              backgroundColor: "#161925",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "#e1f2fe",
          }}
          name="Statistics"
          component={StatisticsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
