import { View, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({ navigation }) => {
  clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };

  clearAsyncStorage();

  return (
    <View style={styles.container}>
      <Text variant="displayLarge"> GeoQuiz </Text>
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
        <TouchableOpacity style={styles.settingsBtn}>
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
    backgroundColor: "#D5BE28",
  },
  settingsBtn: {
    ...btn,
    backgroundColor: "blue",
  },

  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    backgroundColor: "#065a82",
  },

  btnContainer: {
    gap: 30,
  },
});

export default HomeScreen;
