import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SegmentedButtons, Text } from "react-native-paper";
import { useContext } from "react";
import GameContext from "../GameContext";
const StatisticsScreen = () => {
  const [btnValue, setBtnValue] = useState("flagQuiz");
  const { gameHistory } = useContext(GameContext);
  const [flagData, setFlagData] = useState([]);
  const [geoData, setGeoData] = useState([]);
  console.log(gameHistory);

  useEffect(() => {
    gameHistory.map((ghistory) => {
      ghistory.gameType === "flagQuiz"
        ? setFlagData((prev) => [...prev, ghistory])
        : setGeoData((prev) => [...prev, ghistory]);
    });
  }, []);

  console.log("====================================");
  console.log(geoData);
  console.log("====================================");

  return (
    <View style={styles.container}>
      <SegmentedButtons
        style={styles.segmented}
        value={btnValue}
        onValueChange={setBtnValue}
        buttons={[
          {
            value: "flagQuiz",
            label: "Flag Quiz",
          },
          {
            value: "geoQuiz",
            label: "Geo Quiz",
          },
        ]}
      />

      <ScrollView>
        {btnValue === "flagQuiz" ? <Text>FLAG</Text> : <Text>GEO</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5BE28",
  },

  segmented: {
    marginTop: 20,
  },
});

export default StatisticsScreen;
