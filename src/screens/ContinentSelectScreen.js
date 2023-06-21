import { View, ScrollView, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";
import Asia from "../../assets/svgs/asia.svg";
import Europe from "../../assets/svgs/europe.svg";
import Africa from "../../assets/svgs/africa.svg";
import NorthAmerica from "../../assets/svgs/north-america.svg";
import SouthAmerica from "../../assets/svgs/south-america.svg";
import Oceania from "../../assets/svgs/oceania.svg";
import { Button, Text } from "react-native-paper";
import { useContext } from "react";
import LocalizationContext from "../LocalizationContext";
import ThemeContext from "../ThemeContext";

const ContinentSelectScreen = (props) => {
  const [selected, onSelect] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedContinentComponent, setSelectedContinentComponent] =
    useState(null);

  const { langObj } = useContext(LocalizationContext);
  const { themeType, themeObj } = useContext(ThemeContext);
  const continentComponents = {
    Asia: <Asia width={325} height={325} />,
    Europe: <Europe width={325} height={325} />,
    Africa: <Africa width={325} height={325} />,
    NorthAmerica: <NorthAmerica width={325} height={325} />,
    SouthAmerica: <SouthAmerica width={325} height={325} />,
    Oceania: <Oceania width={325} height={325} />,
  };

  useEffect(() => {
    switch (selectedContinent) {
      case "Asia":
        setSelectedContinentComponent(continentComponents.Asia);
        break;
      case "Europe":
        setSelectedContinentComponent(continentComponents.Europe);
        break;
      case "Africa":
        setSelectedContinentComponent(continentComponents.Africa);
        break;
      case "NorthAmerica":
        setSelectedContinentComponent(continentComponents.NorthAmerica);
        break;
      case "SouthAmerica":
        setSelectedContinentComponent(continentComponents.SouthAmerica);
        break;
      case "Oceania":
        setSelectedContinentComponent(continentComponents.Oceania);
        break;

      default:
        break;
    }
  }, [selectedContinent]);

  function handleNextScreen() {
    props.navigation.navigate("GameTypeSelect", {
      selectedContinent: selectedContinent,
    });
  }

  function handlePreviousScreen() {
    props.navigation.goBack();
  }

  function handleContinentComponent() {}

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeObj.appBg }]}>
      <View style={styles.continent}>
        {selectedContinentComponent || (
          <Text
            variant="displayLarge"
            style={[
              styles.continentPlaceHolder,
              { color: themeObj.textPrimary },
            ]}
          >
            {langObj.continentPlaceHolder}
          </Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          buttonColor={themeObj.choiceBtnBg}
          textColor={themeObj.textSecondary}
          style={{ padding: 5 }}
          labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
          onPress={() => {
            setSelectedContinent("Asia");
            handleContinentComponent();
          }}
        >
          {langObj.continentAsia}
        </Button>
        <Button
          mode="contained"
          buttonColor={themeObj.choiceBtnBg}
          textColor={themeObj.textSecondary}
          style={{ padding: 5 }}
          labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
          onPress={() => {
            setSelectedContinent("Europe");
            handleContinentComponent();
          }}
        >
          {langObj.continentEurope}
        </Button>
        <Button
          mode="contained"
          buttonColor={themeObj.choiceBtnBg}
          textColor={themeObj.textSecondary}
          style={{ padding: 5 }}
          labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
          onPress={() => {
            setSelectedContinent("Africa");
            handleContinentComponent();
          }}
        >
          {langObj.continentAfrica}
        </Button>
        <Button
          mode="contained"
          buttonColor={themeObj.choiceBtnBg}
          textColor={themeObj.textSecondary}
          style={{ padding: 5 }}
          labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
          onPress={() => {
            setSelectedContinent("NorthAmerica");
            handleContinentComponent();
          }}
        >
          {langObj.continentNorthAmerica}
        </Button>
        <Button
          mode="contained"
          buttonColor={themeObj.choiceBtnBg}
          textColor={themeObj.textSecondary}
          style={{ padding: 5 }}
          labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
          onPress={() => {
            setSelectedContinent("SouthAmerica");
            handleContinentComponent();
          }}
        >
          {langObj.continentSouthAmerica}
        </Button>
        <Button
          mode="contained"
          buttonColor={themeObj.choiceBtnBg}
          textColor={themeObj.textSecondary}
          style={{ padding: 5 }}
          labelStyle={{ fontSize: 22, lineHeight: 22, paddingTop: 5 }}
          onPress={() => {
            setSelectedContinent("Oceania");
            handleContinentComponent();
          }}
        >
          {langObj.continentOceania}
        </Button>
      </View>
      {selectedContinentComponent && (
        <Button
          variant="contained"
          buttonColor={themeObj.btnBgPrimary}
          textColor={themeObj.textSecondary}
          style={{ marginTop: 20, borderWidth: 1, borderColor: "#2d3047" }}
          onPress={handleNextScreen}
        >
          {langObj.nextLabel}
        </Button>
      )}
      <Button
        variant="contained"
        buttonColor={themeObj.btnBgSecondary}
        textColor={themeObj.textPrimary}
        style={{ marginVertical: 20 }}
        onPress={handlePreviousScreen}
      >
        {langObj.backLabel}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `black`,
  },
  continent: {
    alignItems: "center",
    marginTop: 15,
  },

  continentPlaceHolder: {
    textAlign: "center",
    margin: 10,
    marginTop: 45,
  },

  buttonsContainer: {
    gap: 6,
  },
});

export default ContinentSelectScreen;
