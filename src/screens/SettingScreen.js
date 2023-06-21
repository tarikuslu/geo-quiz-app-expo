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
import ThemeContext from "../ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tr, en } from "../localization";
import { lightTheme, darkTheme } from "../themeConfig";
const SettingScreen = () => {
  const { setQuestionLanguages, questionLanguages, setLangObj, langObj } =
    useContext(LocalizationContext);
  const { themeType, themeObj, setThemeType, setThemeObj } =
    useContext(ThemeContext);
  const [value, setValue] = React.useState(questionLanguages);
  const [themeValue, setThemeValue] = React.useState(themeType);
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
    } else {
      setLangObj(en);
      await AsyncStorage.setItem("langObject", JSON.stringify(en));
    }
  }

  async function handleThemeChange(choice) {
    console.log(choice);
    if (choice === "light") {
      setThemeObj(lightTheme);
      await AsyncStorage.setItem("themeObj", JSON.stringify(lightTheme));
    } else {
      setThemeObj(darkTheme);
      await AsyncStorage.setItem("themeObj", JSON.stringify(darkTheme));
    }
    await AsyncStorage.setItem("themeType", JSON.stringify(choice));
    setThemeType(choice);
  }

  return (
    <View style={[styles.container, { backgroundColor: themeObj.settingsBg }]}>
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
                Oyun Dilini Değiştir / Change Language
              </Text>
              <View style={styles.radio}>
                <Text>İngilizce / English</Text>
                <RadioButton value="en" />
              </View>
              <View style={styles.radio}>
                <Text>Türkçe / Turkish</Text>
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
            <RadioButton.Group
              onValueChange={(newValue) => {
                setThemeValue(newValue);
                handleThemeChange(newValue);
              }}
              value={themeValue}
            >
              <Text variant="bodyLarge" style={{ textAlign: "center" }}>
                {langObj.changeTheme}
              </Text>
              <View style={styles.radio}>
                <Text>{langObj.lightLabel}</Text>
                <RadioButton value="light" />
              </View>
              <View style={styles.radio}>
                <Text>{langObj.darkLabel}</Text>
                <RadioButton value="dark" />
              </View>
            </RadioButton.Group>
          </Modal>
        </Portal>
        <Button
          mode="contained"
          textColor={themeObj.textPrimary}
          style={{ marginTop: 30, backgroundColor: themeObj.btnBgSecondary }}
          onPress={showModal}
        >
          Oyun Dilini Değiştir / Change Language
        </Button>
        <Button
          mode="contained"
          textColor={themeObj.textPrimary}
          style={{ marginTop: 30, backgroundColor: themeObj.btnBgSecondary }}
          onPress={showModal1}
        >
          {langObj.changeTheme}
        </Button>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },

  radio: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingScreen;
