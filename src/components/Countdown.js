import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useCountdown } from "react-native-countdown-circle-timer";

const Countdown = (props) => {
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: true, duration: 30, colors: "#abc" });
  return (
    <CountdownCircleTimer
      isPlaying
      duration={props.duration}
      colors={["#1ed44b", "#db9512", "#d40d06"]}
      colorsTime={[30, 20, 10]}
      onComplete={props.onFinish}
      size={70}
    >
      {({ remainingTime }) => (
        <Text variant="headlineSmall"> {remainingTime} </Text>
      )}
    </CountdownCircleTimer>
  );
};

export default Countdown;
