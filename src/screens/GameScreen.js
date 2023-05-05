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

  const { gameHistory, setGameHistory, findHistory } = useContext(GameContext);

  function exitPlay() {
    props.navigation.goBack();
    console.log("====================================");
    console.log("pressed");
    console.log("====================================");
  }

  async function finishTheGame() {
    setIsGameFinished(true);

    const updatedHistory = [
      ...gameHistory,
      {
        trueAnswerCount: trueCount,
        falseAnswerCount: falseCount,
        selectedContinent: selectedContinent,
        gameType: gameType,
        selectedChallenge: selectedChallenge,
        date: new Date(Date.now()).toLocaleDateString(),
      },
    ];
    setGameHistory(updatedHistory);
    console.log("====================================");
    console.log(updatedHistory);
    console.log("====================================");
    await AsyncStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
  }

  function finalizeTrueCount(count) {
    setTrueCount(count);
  }

  function finalizeFalseCount(count) {
    setFalseCount(count);
  }

  function goMainMenu() {
    props.navigation.navigate("Home");
  }

  return !isGameFinished ? (
    <View style={styles.container}>
      {gameType === "flagQuiz" ? (
        <FlagQuiz
          selectedContinent={selectedContinent}
          selectedChallenge={selectedChallenge}
          handleExit={exitPlay}
          finishTheGame={finishTheGame}
          finalizeTrueCount={finalizeTrueCount}
          finalizeFalseCount={finalizeFalseCount}
        />
      ) : (
        <GeoQuiz
          selectedContinent={selectedContinent}
          selectedChallenge={selectedChallenge}
          handleExit={exitPlay}
          finishTheGame={finishTheGame}
          finalizeTrueCount={finalizeTrueCount}
          finalizeFalseCount={finalizeFalseCount}
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
