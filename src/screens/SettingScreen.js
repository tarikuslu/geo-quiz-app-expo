import { View } from "react-native";
import React from "react";
import {
  Button,
  RadioButton,
  Text,
  Provider,
  Portal,
  Modal,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import LocalizationContext from "../LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tr, en } from "../localization";

const SettingScreen = () => {
  const { setQuestionLanguages, questionLanguages, setLangObj } =
    useContext(LocalizationContext);
  const [value, setValue] = React.useState(questionLanguages);
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showModal1 = () => setVisible1(true);
  const hideModal1 = () => setVisible1(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  async function handleLanguage(choice) {
    await AsyncStorage.setItem("questionLanguage", JSON.stringify(choice));
    if (choice === "tr") {
      setLangObj(tr);
      await AsyncStorage.setItem("langObject", JSON.stringify(tr));
      console.log("TR GECTIM");
    } else {
      setLangObj(en);
      await AsyncStorage.setItem("langObject", JSON.stringify(en));
      console.log("EN GECTIM");
    }
  }

  console.log(questionLanguages);

  return (
    <View style={styles.container}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <RadioButton.Group
              onValueChange={(newValue) => {
                setQuestionLanguages(newValue);
                handleLanguage(newValue);
                setValue(newValue);
              }}
              value={value}
            >
              <Text variant="bodyLarge" style={{ textAlign: "center" }}>
                Oyun Dilini Degistir
              </Text>
              <View style={styles.radio}>
                <Text>English</Text>
                <RadioButton value="en" />
              </View>
              <View style={styles.radio}>
                <Text>Turkish</Text>
                <RadioButton value="tr" />
              </View>
            </RadioButton.Group>
          </Modal>
        </Portal>
        <Portal>
          <Modal
            visible={visible1}
            onDismiss={hideModal1}
            contentContainerStyle={containerStyle}
          >
            <RadioButton.Group onValueChange={(newValue) => {}} value={value}>
              <Text variant="bodyLarge" style={{ textAlign: "center" }}>
                Tema Degistir
              </Text>
              <View style={styles.radio}>
                <Text>Aydinlik</Text>
                <RadioButton value="en" />
              </View>
              <View style={styles.radio}>
                <Text>Karanlik</Text>
                <RadioButton value="tr" />
              </View>
            </RadioButton.Group>
          </Modal>
        </Portal>
        <Button mode="contained" style={{ marginTop: 30 }} onPress={showModal}>
          Dili Degistir
        </Button>
        <Button mode="contained" style={{ marginTop: 30 }} onPress={showModal1}>
          Tema Degistir
        </Button>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    gap: 30,
  },

  radio: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingScreen;
