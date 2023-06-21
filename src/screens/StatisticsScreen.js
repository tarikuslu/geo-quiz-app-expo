import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  SegmentedButtons,
  Text,
  DataTable,
  Portal,
  Modal,
  TouchableRipple,
  Button,
} from "react-native-paper";
import { useContext } from "react";
import GameContext from "../GameContext";
import ThemeContext from "../ThemeContext";
import LocalizationContext from "../LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StatisticsScreen = ({ navigation }) => {
  const [btnValue, setBtnValue] = useState("flagQuiz");
  const [updatedArr, setUpdatedArr] = useState([]);
  const { gameHistory, setGameHistory } = useContext(GameContext);
  const [deleteCount, setDeleteCount] = useState(0);
  const { themeType, themeObj } = useContext(ThemeContext);
  const { langObj } = useContext(LocalizationContext);
  const [flagData, setFlagData] = useState([]);
  const [geoData, setGeoData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState([]);
  useEffect(() => {
    filterGameType();
  }, []);

  const textColor =
    themeType === "light" ? themeObj.textSecondary : themeObj.textPrimary;

  function filterGameType() {
    gameHistory.map((ghistory) => {
      if (ghistory.gameType === "flagQuiz" && ghistory.id) {
        setFlagData((prev) => [...prev, ghistory]);
      } else if (ghistory.gameType === "geocultureQuiz" && ghistory.id) {
        setGeoData((prev) => [...prev, ghistory]);
      }
    });
  }

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  function handleShowData(id) {
    showModal();

    if (btnValue === "flagQuiz") {
      flagData.forEach((d) => {
        if (d.id === id) {
          setSelectedModalData(d.falseAnswersDetail);
        }
      });
    } else {
      geoData.forEach((d) => {
        if (d.id === id) {
          setSelectedModalData(d.falseAnswersDetail);
        }
      });
    }
  }

  function renderDetails({ item }) {
    return btnValue === "flagQuiz" ? (
      <View style={{ backgroundColor: themeObj.resultBg, margin: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: themeObj.textPrimary }}>
            {langObj.question}
          </Text>
          <Text style={{ fontSize: 20, color: themeObj.textPrimary }}>
            {" "}
            {item.question}{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: themeObj.textPrimary }}>
            {langObj.trueAnswer}
          </Text>
          <Image
            source={{ uri: item.trueChoice }}
            style={{
              width: 200,
              height: 100,
              borderWidth: 1,
              borderColor: "black",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: themeObj.textPrimary }}>
            {langObj.falseAnswer}
          </Text>
          <Image
            source={{ uri: item.userChoice }}
            style={{
              width: 200,
              height: 100,
              borderWidth: 1,
              borderColor: "black",
            }}
          />
        </View>
      </View>
    ) : (
      <View style={{ backgroundColor: themeObj.resultBg, margin: 20 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: themeObj.textPrimary }}>
            {langObj.question}
          </Text>
          <Text style={{ fontSize: 20, color: themeObj.textPrimary }}>
            {" "}
            {item.question}{" "}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: themeObj.textPrimary }}>
            {langObj.trueAnswer}
          </Text>
          <Text style={{ fontSize: 20, color: themeObj.textPrimary }}>
            {" "}
            {item.trueChoice}{" "}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: themeObj.textPrimary }}>
            {langObj.falseAnswer}
          </Text>
          <Text style={{ fontSize: 20, color: themeObj.textPrimary }}>
            {" "}
            {item.userChoice}{" "}
          </Text>
        </View>
      </View>
    );
  }

  function showDeleteAlert() {
    Alert.alert(
      langObj.deleteTitle,
      `${langObj.deleteText}`,
      [
        {
          text: langObj.noLabel,
        },
        {
          text: langObj.yesLabel,
          onPress: () => deleteAll(),
        },
      ],
      { cancelable: true }
    );
  }

  async function deleteAll() {
    console.log(gameHistory);
    setFlagData([]);
    setGeoData([]);
    setGameHistory([]);
    await AsyncStorage.setItem("gameHistory", JSON.stringify([]));
  }

  return (
    <View
      style={[styles.container, { backgroundColor: themeObj.statisticsBg }]}
    >
      <Button
        variant="contained"
        buttonColor={themeObj.btnBgSecondary}
        textColor={themeObj.textPrimary}
        style={{ marginTop: 20 }}
        onPress={showDeleteAlert}
      >
        {langObj.deleteButtonTitle}
      </Button>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: themeObj.settingsBg,
            flex: 1 / 2,
            borderWidth: 2,
            borderColor: themeObj.textPrimary,
          }}
        >
          {selectedModalData.length > 0 && (
            <FlatList
              data={selectedModalData}
              renderItem={(item) => renderDetails(item)}
              keyExtractor={(item) => item.id}
            />
          )}
        </Modal>
      </Portal>

      <SegmentedButtons
        style={styles.segmented}
        value={btnValue}
        onValueChange={(val) => {
          setBtnValue(val);
        }}
        buttons={[
          {
            value: "flagQuiz",
            label: langObj.flagQuiz,
            uncheckedColor: textColor,
          },
          {
            value: "geoQuiz",
            label: langObj.geoQuiz,
            uncheckedColor: textColor,
          },
        ]}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            textStyle={{
              marginLeft: 65,
              fontWeight: "bold",
              fontSize: 20,
              color: textColor,
            }}
          >
            {langObj.dateLabel}
          </DataTable.Title>
          <DataTable.Title
            textStyle={{
              marginLeft: 35,
              fontWeight: "bold",
              fontSize: 20,
              color: textColor,
            }}
          >
            {langObj.statisticsTrue}
          </DataTable.Title>
          <DataTable.Title
            textStyle={{
              marginLeft: 37,
              fontWeight: "bold",
              fontSize: 20,
              color: textColor,
            }}
          >
            {langObj.statisticsFalse}
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {btnValue === "flagQuiz"
            ? flagData.map((data) => (
                <TouchableRipple
                  onPress={() => handleShowData(data.id)}
                  key={data.id}
                >
                  <DataTable.Row>
                    <DataTable.Cell numeric>
                      <Text style={{ fontSize: 20, color: textColor }}>
                        {data.date}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Text
                        style={{
                          fontSize: 20,
                          color: textColor,
                        }}
                      >
                        {data.trueAnswerCount}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Text style={{ fontSize: 20, color: textColor }}>
                        {data.falseAnswerCount}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableRipple>
              ))
            : geoData.map((data) => (
                <TouchableRipple
                  onPress={() => handleShowData(data.id)}
                  key={data.id}
                >
                  <DataTable.Row>
                    <DataTable.Cell numeric>
                      <Text style={{ fontSize: 20, color: textColor }}>
                        {data.date}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Text style={{ fontSize: 20, color: textColor }}>
                        {data.trueAnswerCount}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric style={{ color: textColor }}>
                      <Text style={{ fontSize: 20, color: textColor }}>
                        {data.falseAnswerCount}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableRipple>
              ))}
        </ScrollView>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  segmented: {
    marginTop: 20,
  },
});

export default StatisticsScreen;
