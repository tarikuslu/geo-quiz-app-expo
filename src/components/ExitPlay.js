import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import React from "react";

const ExitPlay = (props) => {
  return (
    <Button
      icon={"exit-to-app"}
      variant={"elevated"}
      labelStyle={{ color: "white" }}
      onPress={props.onPress}
    >
      Exit
    </Button>
  );
};

export default ExitPlay;
