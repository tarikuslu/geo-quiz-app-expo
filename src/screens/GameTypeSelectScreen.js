import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useState } from "react";
import { useContext } from "react";
import LocalizationContext from "../LocalizationContext";
const GameTypeSelectScreen = (props) => {
  const [gameType, setGameType] = useState(null);
  const { selectedContinent } = props.route.params;
  const { langObj } = useContext(LocalizationContext);
  function handleNextScreen() {
    props.navigation.navigate("ChallengeSelect", {
      gameType: gameType,
      selectedContinent: selectedContinent,
    });
  }

  function handlePreviousScreen() {
    props.navigation.goBack();
  }

  console.log(selectedContinent);

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        {langObj.gameTypePlaceHolder}
      </Text>
      <Button
        mode="contained"
        buttonColor="#ebc026"
        textColor="black"
        style={{ padding: 5 }}
        labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
        onPress={() => {
          setGameType("flagQuiz");
        }}
      >
        {langObj.flagQuiz}
      </Button>
      <Button
        mode="contained"
        buttonColor="#ebc026"
        textColor="black"
        style={{ padding: 5 }}
        labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
        onPress={() => {
          setGameType("geocultureQuiz");
        }}
      >
        {langObj.geoQuiz}
      </Button>
      {gameType && (
        <Button
          variant="contained"
          buttonColor="#3d0814"
          textColor="#ffff"
          style={{ marginTop: 20 }}
          onPress={handleNextScreen}
        >
          {langObj.nextLabel}
        </Button>
      )}
      <Button
        variant="contained"
        buttonColor="#3d0814"
        textColor="#ffff"
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
    backgroundColor: "#065a82",
  },

  title: {
    textAlign: "center",
    color: "#fff",
  },
});

export default GameTypeSelectScreen;
