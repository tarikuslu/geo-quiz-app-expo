import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Text, Button } from "react-native-paper";
import FlagQuiz from "./FlagQuiz";
import GeoQuiz from "./GeoQuiz";
import { useContext } from "react";
import GameContext from "../GameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GameScreen = (props) => {
  const { selectedContinent, gameType, selectedChallenge } = props.route.params;
  console.log(selectedContinent, gameType, selectedChallenge);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [trueCount, setTrueCount] = useState(0);
  const [falseCount, setFalseCount] = useState(0);

  function exitPlay() {
    props.navigation.goBack();
    console.log("====================================");
    console.log("pressed");
    console.log("====================================");
  }

  function toggleFinishGame() {
    setIsGameFinished(true);
  }

  function goMainMenu() {
    props.navigation.navigate("Home");
  }

  function setTrue(num) {
    setTrueCount(num);
  }

  function setFalse(num) {
    setFalseCount(num);
  }
  return !isGameFinished ? (
    <View style={styles.container}>
      {gameType === "flagQuiz" ? (
        <FlagQuiz
          selectedContinent={selectedContinent}
          selectedChallenge={selectedChallenge}
          gameType={gameType}
          handleExit={exitPlay}
          toggleFinishGame={toggleFinishGame}
          setTrue={setTrue}
          setFalse={setFalse}
        />
      ) : (
        <GeoQuiz
          selectedContinent={selectedContinent}
          selectedChallenge={selectedChallenge}
          gameType={gameType}
          handleExit={exitPlay}
          toggleFinishGame={toggleFinishGame}
          setTrue={setTrue}
          setFalse={setFalse}
        />
      )}
    </View>
  ) : (
    <View style={styles.results}>
      <Text variant="headlineLarge" style={styles.header}>
        The game has finished!
      </Text>
      <Text variant="headlineSmall" style={styles.count}>
        You got {trueCount} true answer
      </Text>
      <Text variant="headlineSmall" style={styles.count}>
        You got {falseCount} false answer
      </Text>
      <Button
        mode="contained"
        buttonColor="#fff"
        textColor="#000"
        icon={"home-circle-outline"}
        onPress={goMainMenu}
      >
        Go back to main menu
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  results: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    color: "#fff",
    marginBottom: 20,
  },

  count: {
    backgroundColor: "blue",
    color: "#fff",
    padding: 10,
    marginBottom: 30,
  },
});

export default GameScreen;
