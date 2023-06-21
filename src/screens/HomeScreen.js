import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import ThemeContext from "../ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({ navigation }) => {
  const { themeType, themeObj } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: themeObj.appBg }]}>
      <Text variant="displayLarge" style={{ color: themeObj.textPrimary }}>
        {" "}
        GeoQuiz{" "}
      </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() =>
            navigation.navigate("Play", {
              screen: "ContinentSelect",
            })
          }
        >
          <MaterialIcons name="play-arrow" size={110} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statisticsBtn}
          onPress={() =>
            navigation.navigate("Statistics", {
              screen: "Statistics",
            })
          }
        >
          <MaterialIcons name="leaderboard" size={110} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() =>
            navigation.navigate("Settings", {
              screen: "Settings",
            })
          }
        >
          <MaterialIcons name="settings" size={110} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const btn = {
  width: 150,
  height: 150,
  borderRadius: 75,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const styles = StyleSheet.create({
  playBtn: {
    ...btn,
    backgroundColor: "green",
  },
  statisticsBtn: {
    ...btn,
    backgroundColor: "#EBC128",
  },
  settingsBtn: {
    ...btn,
    backgroundColor: "#F75C02",
  },

  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },

  btnContainer: {
    gap: 30,
  },
});

export default HomeScreen;
