import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const ChallengeSelectScreen = (props) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const { gameType, selectedContinent } = props.route.params;

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
        Lastly select your challenge!
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
        Time Trail
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
        Survival
      </Button>
      {selectedChallenge && (
        <Button
          variant="contained"
          buttonColor="#3d0814"
          textColor="#ffff"
          style={{ marginTop: 20 }}
          onPress={handleNextScreen}
        >
          Start the game
        </Button>
      )}
      <Button
        variant="contained"
        buttonColor="#3d0814"
        textColor="#ffff"
        style={{ marginTop: 20 }}
        onPress={handlePreviousScreen}
      >
        Back
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
