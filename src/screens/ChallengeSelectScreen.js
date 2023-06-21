import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import LocalizationContext from "../LocalizationContext";
import ThemeContext from "../ThemeContext";
const ChallengeSelectScreen = (props) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const { gameType, selectedContinent } = props.route.params;
  const { langObj } = useContext(LocalizationContext);
  const { themeType, themeObj } = useContext(ThemeContext);
  function handleNextScreen() {
    props.navigation.navigate("Game", {
      gameType: gameType,
      selectedContinent: selectedContinent,
      selectedChallenge: selectedChallenge,
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
        {langObj.challengePlaceHolder}
      </Text>
      <Button
        mode="contained"
        icon={
          selectedChallenge === "timeTrail"
            ? "check-circle-outline"
            : "timer-sand"
        }
        buttonColor={themeObj.choiceBtnBg}
        textColor={themeObj.textSecondary}
        style={{ padding: 5 }}
        labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
        onPress={() => {
          setSelectedChallenge("timeTrail");
        }}
      >
        {langObj.timeTrail}
      </Button>

      <Button
        mode="contained"
        icon={
          selectedChallenge === "survival"
            ? "check-circle-outline"
            : "heart-outline"
        }
        buttonColor={themeObj.choiceBtnBg}
        textColor={themeObj.textSecondary}
        style={{ padding: 5 }}
        labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
        onPress={() => {
          setSelectedChallenge("survival");
        }}
      >
        {langObj.liveGame}
      </Button>
      {selectedChallenge && (
        <Button
          variant="contained"
          buttonColor={themeObj.btnBgPrimary}
          textColor={themeObj.textSecondary}
          style={{ marginTop: 20, borderWidth: 1, borderColor: "#2d3047" }}
          onPress={handleNextScreen}
        >
          {langObj.startGameLabel}
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
    color: "#fff",
  },
});

export default ChallengeSelectScreen;
