import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameHistory, setGameHistory] = useState([]);

  /* async function removeItemValue() {
    try {
      await AsyncStorage.removeItem("gameHistory");
      return true;
    } catch (exception) {
      return false;
    }
  }

  removeItemValue();
*/
  useEffect(() => {
    findHistory();
  }, []);

  const findHistory = async () => {
    const history = await AsyncStorage.getItem("gameHistory");

    if (history !== null) {
      setGameHistory(JSON.parse(history));
    }
  };

  return (
    <GameContext.Provider value={{ gameHistory, setGameHistory, findHistory }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
