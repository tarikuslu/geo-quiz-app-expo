import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import LocalizationContext from "../LocalizationContext";
const ChallengeSelectScreen = (props) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const { gameType, selectedContinent } = props.route.params;
  const { langObj } = useContext(LocalizationContext);
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
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        {langObj.challengePlaceHolder}
      </Text>
      <Button
        mode="contained"
        icon={"timer-sand"}
        buttonColor="#ebc026"
        textColor="black"
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
        icon={"heart-outline"}
        buttonColor="#ebc026"
        textColor="black"
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
          buttonColor="#3d0814"
          textColor="#ffff"
          style={{ marginTop: 20 }}
          onPress={handleNextScreen}
        >
          {langObj.startGameLabel}
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

export default ChallengeSelectScreen;
