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
import ExitPlay from "../components/ExitPlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Countdown from "../components/Countdown";
const GeoQuiz = (props) => {
  const [question, setQuestion] = useState({});
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
  const continents = {
    Asia: Asia,
    Europe: Europe,
    Africa: Africa,
    NorthAmerica: NorthAmerica,
    SouthAmerica: SouthAmerica,
    Oceania: Oceania,
  };
  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    getQuestion();
  }, [counter]);

  useEffect(() => {
    console.log("true click");
    setBadgeValue(
      <MaterialCommunityIcons name="check-circle" size={24} color="green" />
    );
    setBadgeVisibility(true);
    checkAllQuestionsAnswered();
    setTimeout(() => {
      setBadgeVisibility(false);
    }, 500);
  }, [trueAnswerCounter]);

  useEffect(() => {
    console.log("false click");
    setBadgeValue(<MaterialIcons name="remove-circle" size={24} color="red" />);

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
      handleFinish();
    }
    setBadgeVisibility(true);
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
        break;
      }
    }
  }

  function trueFalseChecker(str) {
    str === question.correctAnswer
      ? setTrueAnswerCounter((prev) => prev + 1)
      : setFalseAnswerCounter((prev) => prev + 1);
  }

  function handleFinish() {
    props.finalizeTrueCount(trueAnswerCounter);
    props.finalizeFalseCount(falseAnswerCounter);
    props.finishTheGame();
  }

  function checkAllQuestionsAnswered() {
    if (counter > continents[props.selectedContinent].length) {
      handleFinish();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameInfo}>
        {props.selectedChallenge === "timeTrail" ? (
          <Countdown onFinish={handleFinish} duration={60} />
        ) : (
          livesComponents.map((live) => live)
        )}
        <Text variant="headlineLarge">
          {counter}/{continents[props.selectedContinent].length}
        </Text>
        <ExitPlay onPress={props.handleExit} />
      </View>

      {question.question !== "" ? (
        <Text variant="headlineMedium" style={styles.question}>
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
      ) : (
        <Badge style={{ backgroundColor: "#065a82" }}></Badge>
      )}

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
    backgroundColor: "#065a82",
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
