import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SegmentedButtons, Text, DataTable } from "react-native-paper";
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
  console.log(flagData);
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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            textStyle={{ marginLeft: 65, fontWeight: "bold", fontSize: 16 }}
          >
            Date
          </DataTable.Title>
          <DataTable.Title
            textStyle={{ marginLeft: 35, fontWeight: "bold", fontSize: 12 }}
          >
            True Answers
          </DataTable.Title>
          <DataTable.Title
            textStyle={{ marginLeft: 37, fontWeight: "bold", fontSize: 12 }}
          >
            False Answers
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {btnValue === "flagQuiz"
            ? flagData.map((data) => (
                <DataTable.Row>
                  <DataTable.Cell numeric> {data.date} </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {" "}
                    {data.trueAnswerCount}{" "}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {" "}
                    {data.falseAnswerCount}{" "}
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            : geoData.map((data) => (
                <DataTable.Row>
                  <DataTable.Cell numeric> {data.date} </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {" "}
                    {data.trueAnswerCount}{" "}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {" "}
                    {data.falseAnswerCount}{" "}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
        </ScrollView>
      </DataTable>
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
