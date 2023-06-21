import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useState } from "react";
import { useContext } from "react";
import LocalizationContext from "../LocalizationContext";
import ThemeContext from "../ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
const GameTypeSelectScreen = (props) => {
  const [gameType, setGameType] = useState(null);
  const { selectedContinent } = props.route.params;
  const { langObj } = useContext(LocalizationContext);
  const { themeType, themeObj } = useContext(ThemeContext);
  function handleNextScreen() {
    props.navigation.navigate("ChallengeSelect", {
      gameType: gameType,
      selectedContinent: selectedContinent,
    });
  }

  function handlePreviousScreen() {
    props.navigation.goBack();
  }

  return (
    <View style={[styles.container, { backgroundColor: themeObj.appBg }]}>
      <Text
        variant="displaySmall"
        style={[styles.title, { color: themeObj.textPrimary }]}
      >
        {langObj.gameTypePlaceHolder}
      </Text>
      <Button
        mode="contained"
        icon={gameType === "flagQuiz" && "check-circle-outline"}
        buttonColor={themeObj.choiceBtnBg}
        textColor={themeObj.textSecondary}
        style={{ padding: 5 }}
        labelStyle={{
          fontSize: 22,
          lineHeight: 25,
          paddingTop: 5,
        }}
        onPress={() => {
          setGameType("flagQuiz");
        }}
      >
        {langObj.flagQuiz}
      </Button>
      <Button
        mode="contained"
        icon={gameType === "geocultureQuiz" && "check-circle-outline"}
        buttonColor={themeObj.choiceBtnBg}
        textColor={themeObj.textSecondary}
        style={{ padding: 5 }}
        labelStyle={{ fontSize: 22, lineHeight: 25, paddingTop: 5 }}
        onPress={() => {
          setGameType("geocultureQuiz");
        }}
      >
        {langObj.geoQuiz}
      </Button>
      {gameType && (
        <Button
          variant="contained"
          buttonColor={themeObj.btnBgPrimary}
          textColor={themeObj.textSecondary}
          style={{ marginTop: 20, borderWidth: 1, borderColor: "#2d3047" }}
          onPress={handleNextScreen}
        >
          {langObj.nextLabel}
        </Button>
      )}
      <Button
        variant="contained"
        buttonColor={themeObj.btnBgSecondary}
        textColor={themeObj.textPrimary}
        style={{ marginTop: 20 }}
        onPress={handlePreviousScreen}
      >
        {langObj.backLabel}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },

  title: {
    textAlign: "center",
  },
});

export default GameTypeSelectScreen;
