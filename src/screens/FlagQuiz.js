import { View, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableRipple, Badge } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import Asia from "../continentsJSON/Asia";
import Europe from "../continentsJSON/Europe";
import Africa from "../continentsJSON/Africa";
import NorthAmerica from "../continentsJSON/NorthAmerica";
import SouthAmerica from "../continentsJSON/SouthAmerica";
import Oceania from "../continentsJSON/Oceania";
import ExitPlay from "../components/ExitPlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Countdown from "../components/Countdown";
import { useContext } from "react";
import GameContext from "../GameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LocalizationContext from "../LocalizationContext";
const FlagQuiz = (props) => {
  const [question, setQuestion] = useState("");
  const [threeFlag, setThreeFlag] = useState([]);
  const [counter, setCounter] = useState(0);
  const [trueAnswerCounter, setTrueAnswerCounter] = useState(0);
  const [falseAnswerCounter, setFalseAnswerCounter] = useState(0);
  const [badgeValue, setBadgeValue] = useState();
  const [badgeVisibility, setBadgeVisibility] = useState(false);
  const [lives, setLives] = useState(3);
  const [livesComponents, setLivesComponents] = useState([
    <MaterialCommunityIcons name="cards-heart" size={24} color="red" />,
    <MaterialCommunityIcons name="cards-heart" size={24} color="red" />,
    <MaterialCommunityIcons name="cards-heart" size={24} color="red" />,
  ]);

  const { langObj } = useContext(LocalizationContext);

  const { gameHistory, setGameHistory, findHistory } = useContext(GameContext);
  const continents = {
    Asia: Asia,
    Europe: Europe,
    Africa: Africa,
    NorthAmerica: NorthAmerica,
    SouthAmerica: SouthAmerica,
    Oceania: Oceania,
  };
  useEffect(() => {
    getThreeFlag();
  }, []);

  useEffect(() => {
    getThreeFlag();
  }, [counter]);

  useEffect(() => {
    setBadgeValue(
      <MaterialCommunityIcons name="check-circle" size={24} color="green" />
    );
    console.log("====================================");
    console.log("true click");
    console.log("====================================");
    setBadgeVisibility(true);
    checkAllQuestionsAnswered();
    setTimeout(() => {
      setBadgeVisibility(false);
    }, 500);
  }, [trueAnswerCounter]);

  useEffect(() => {
    setBadgeValue(<MaterialIcons name="remove-circle" size={24} color="red" />);
    console.log("====================================");
    console.log("true click");
    console.log("====================================");
    setLives((prev) => prev - 1);
    setLivesComponents([]);
    for (let i = lives; i >= 1; i--) {
      setLivesComponents((prev) => [
        ...prev,
        <MaterialCommunityIcons name="cards-heart" size={24} color="red" />,
      ]);
    }
    checkAllQuestionsAnswered();
    if (lives === 0 && props.selectedChallenge === "survival") {
      finishTheGame();
    }
    setBadgeVisibility(true);
    setTimeout(() => {
      setBadgeVisibility(false);
    }, 500);
  }, [falseAnswerCounter]);

  function getThreeFlag() {
    setThreeFlag([]);
    const selectedData = continents[props.selectedContinent];
    let count = 0;
    let firstNum;
    let secondNum;
    let thirdNum;
    while (count < 3) {
      let random = Math.floor(Math.random() * (selectedData.length - 1));

      if (count === 0) {
        firstNum = random;
        setThreeFlag((prev) => [...prev, selectedData[random]]);
        count++;
      } else if (count === 1) {
        if (random === firstNum) {
          continue;
        } else {
          secondNum = random;
          setThreeFlag((prev) => [...prev, selectedData[random]]);
          count++;
        }
      } else if (count === 2) {
        if (random === firstNum || random === secondNum) {
          continue;
        } else {
          thirdNum = random;
          setThreeFlag((prev) => [...prev, selectedData[random]]);
          count++;
        }
      }
    }

    handleQuestionName(firstNum, secondNum, thirdNum, selectedData);
  }

  function handleQuestionName(firstNum, secondNum, thirdNum, selectedData) {
    const randomNum = Math.floor(Math.random() * 3);

    switch (randomNum) {
      case 0:
        setQuestion(selectedData[firstNum].name.common);
        break;
      case 1:
        setQuestion(selectedData[secondNum].name.common);
      case 2:
        setQuestion(selectedData[thirdNum].name.common);
      default:
        break;
    }
  }

  function trueFalseChecker(arr) {
    arr.name.common === question
      ? setTrueAnswerCounter((prev) => prev + 1)
      : setFalseAnswerCounter((prev) => prev + 1);
  }

  function checkAllQuestionsAnswered() {
    if (counter > continents[props.selectedContinent].length) {
      finishTheGame();
    }
  }

  async function finishTheGame() {
    props.toggleFinishGame();
    props.setTrue(trueAnswerCounter);
    props.setFalse(falseAnswerCounter);

    const updatedHistory = [
      ...gameHistory,
      {
        trueAnswerCount: trueAnswerCounter,
        falseAnswerCount: falseAnswerCounter,
        selectedContinent: props.selectedContinent,
        gameType: props.gameType,
        selectedChallenge: props.selectedChallenge,
        date: new Date(Date.now()).toLocaleDateString(),
      },
    ];
    setGameHistory(updatedHistory);
    console.log("====================================");
    console.log(updatedHistory);
    console.log("====================================");
    await AsyncStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameInfo}>
        {props.selectedChallenge === "timeTrail" ? (
          <Countdown onFinish={finishTheGame} duration={30} />
        ) : (
          livesComponents.map((live) => live)
        )}
        <Text variant="headlineLarge">
          {counter}/{continents[props.selectedContinent].length}
        </Text>
        <ExitPlay onPress={props.handleExit} label={langObj.exitLabel} />
      </View>

      {question !== "" ? (
        <Text variant="displayMedium" style={styles.question}>
          {question}
        </Text>
      ) : null}
      {badgeVisibility ? (
        <Badge
          style={{
            backgroundColor: "white",
            padding: 5,
            width: 30,
            height: 30,
            alignSelf: "center",
          }}
        >
          {badgeValue}
        </Badge>
      ) : (
        <Badge style={{ backgroundColor: "#065a82" }}></Badge>
      )}

      {threeFlag.length > 1 ? (
        <View style={styles.flags}>
          <TouchableRipple
            onPress={() => {
              setCounter((prev) => prev + 1);
              trueFalseChecker(threeFlag[0]);
            }}
          >
            <Image
              source={{ uri: threeFlag[0].flags.png }}
              style={{
                width: 300,
                height: 150,
                marginTop: 20,
                alignSelf: "center",
              }}
            />
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              setCounter((prev) => prev + 1);
              trueFalseChecker(threeFlag[1]);
            }}
          >
            <Image
              source={{ uri: threeFlag[1].flags.png }}
              style={{
                width: 300,
                height: 150,
                marginTop: 20,
                alignSelf: "center",
              }}
            />
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              setCounter((prev) => prev + 1);
              trueFalseChecker(threeFlag[2]);
            }}
          >
            <Image
              source={{ uri: threeFlag[2].flags.png }}
              style={{
                width: 300,
                height: 150,
                marginTop: 20,
                alignSelf: "center",
              }}
            />
          </TouchableRipple>
        </View>
      ) : (
        <Text>AAA</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#065a82",
    height: Dimensions.get("window").height,
    justifyContent: "space-evenly",
  },

  gameInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },

  question: {
    textAlign: "center",
  },
});

export default FlagQuiz;
