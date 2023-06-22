import { View, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableRipple, Badge } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import Asia from "../geoQuizJSON/Asia";
import Europe from "../geoQuizJSON/Europe";
import Africa from "../geoQuizJSON/Africa";
import NorthAmerica from "../geoQuizJSON/NorthAmerica";
import SouthAmerica from "../geoQuizJSON/SouthAmerica";
import Oceania from "../geoQuizJSON/Oceania";
import AsiaEN from "../geoQuizJSON/AsiaEN";
import EuropeEN from "../geoQuizJSON/EuropeEN";
import AfricaEN from "../geoQuizJSON/AfricaEN";
import NorthAmericaEN from "../geoQuizJSON/NorthAmericaEN";
import SouthAmericaEN from "../geoQuizJSON/SouthAmericaEN";
import OceaniaEN from "../geoQuizJSON/OceaniaEN";
import ExitPlay from "../components/ExitPlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Countdown from "../components/Countdown";
import { useContext } from "react";
import GameContext from "../GameContext";
import LocalizationContext from "../LocalizationContext";
import ThemeContext from "../ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GeoQuiz = (props) => {
  const [question, setQuestion] = useState({});
  const [wrongAnswersDetail, setWrongAnswersDetail] = useState([]);
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

  const { gameHistory, setGameHistory, findHistory } = useContext(GameContext);
  const { questionLanguages, langObj } = useContext(LocalizationContext);
  const { themeType, themeObj } = useContext(ThemeContext);
  const textColor =
    themeType === "light" ? themeObj.textSecondary : themeObj.textPrimary;

  const continents =
    questionLanguages === "tr"
      ? {
          Asia: Asia,
          Europe: Europe,
          Africa: Africa,
          NorthAmerica: NorthAmerica,
          SouthAmerica: SouthAmerica,
          Oceania: Oceania,
        }
      : {
          Asia: AsiaEN,
          Europe: EuropeEN,
          Africa: AfricaEN,
          NorthAmerica: NorthAmericaEN,
          SouthAmerica: SouthAmericaEN,
          Oceania: OceaniaEN,
        };

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    getQuestion();
  }, [counter]);

  useEffect(() => {
    if (counter) {
      setBadgeValue(
        <MaterialCommunityIcons name="check-circle" size={24} color="green" />
      );
      setBadgeVisibility(true);
    }

    checkAllQuestionsAnswered();
    setTimeout(() => {
      setBadgeVisibility(false);
    }, 500);
  }, [trueAnswerCounter]);

  useEffect(() => {
    if (counter) {
      setBadgeValue(
        <MaterialIcons name="remove-circle" size={24} color="red" />
      );
      setBadgeVisibility(true);
    }

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

    setTimeout(() => {
      setBadgeVisibility(false);
    }, 500);
  }, [falseAnswerCounter]);

  function getQuestion() {
    setQuestion({});
    const selectedData = continents[props.selectedContinent];
    let count = 0;
    while (true) {
      let random = Math.floor(Math.random() * (selectedData.length - 1));
      if (selectedData[random].isAnswered) {
        continue;
      } else {
        setQuestion(selectedData[random]);
        selectedData[random].isAnswered = true;
        break;
      }
    }
  }

  function trueFalseChecker(str) {
    if (str !== question.correctAnswer) {
      setWrongAnswersDetail((prev) => [
        ...prev,
        {
          question: question.question,
          userChoice: str,
          trueChoice: question.correctAnswer,
        },
      ]);
    }

    str === question.correctAnswer
      ? setTrueAnswerCounter((prev) => prev + 1)
      : setFalseAnswerCounter((prev) => prev + 1);
  }

  async function finishTheGame() {
    props.toggleFinishGame();
    props.setTrue(trueAnswerCounter);
    props.setFalse(falseAnswerCounter);
    let copyArr = continents[props.selectedContinent];
    for (let i = 0; i < copyArr.length; i++) {
      copyArr[i] = { ...copyArr[i], isAnswered: false };
    }
    continents[props.selectedContinent] = copyArr;

    const updatedHistory = [
      ...gameHistory,
      {
        trueAnswerCount: trueAnswerCounter,
        falseAnswerCount: falseAnswerCounter,
        selectedContinent: props.selectedContinent,
        gameType: props.gameType,
        selectedChallenge: props.selectedChallenge,
        date: new Date(Date.now()).toLocaleDateString(),
        id: Date.now(),
        falseAnswersDetail: wrongAnswersDetail,
      },
    ];

    console.log(updatedHistory);
    setGameHistory(updatedHistory);
    await AsyncStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
  }

  function checkAllQuestionsAnswered() {
    if (counter > continents[props.selectedContinent].length) {
      finishTheGame();
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: themeObj.appBg }]}>
      <View style={styles.gameInfo}>
        {props.selectedChallenge === "timeTrail" ? (
          <Countdown
            onFinish={finishTheGame}
            duration={60}
            textColor={textColor}
          />
        ) : (
          livesComponents.map((live) => live)
        )}
        <Text variant="headlineLarge" style={{ color: textColor }}>
          {counter}/{continents[props.selectedContinent].length}
        </Text>
        <ExitPlay onPress={props.handleExit} label={langObj.exitLabel} />
      </View>

      {question.question !== "" ? (
        <Text
          variant="headlineMedium"
          style={[styles.question, { color: textColor }]}
        >
          {question.question}
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
      ) : null}

      <View style={styles.answerContainer}>
        <TouchableRipple
          onPress={() => {
            setCounter((prev) => prev + 1);
            trueFalseChecker(question.answer1);
          }}
          style={styles.btn}
          rippleColor="#f0dc59"
        >
          <Text variant="titleLarge"> {question.answer1} </Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            setCounter((prev) => prev + 1);
            trueFalseChecker(question.answer2);
          }}
          style={styles.btn}
          rippleColor="#f0dc59"
        >
          <Text variant="titleLarge"> {question.answer2}</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            setCounter((prev) => prev + 1);
            trueFalseChecker(question.answer3);
          }}
          style={styles.btn}
          rippleColor="#f0dc59"
        >
          <Text variant="titleLarge"> {question.answer3}</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    gap: 30,
  },

  gameInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 65,
  },

  question: {
    textAlign: "center",
  },

  answerContainer: {
    textAlign: "center",
    alignItems: "center",
  },

  btn: {
    backgroundColor: "#D5BE28",
    padding: 10,
    width: 300,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 2,
  },
});

export default GeoQuiz;
