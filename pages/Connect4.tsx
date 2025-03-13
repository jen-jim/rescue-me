import { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import { InfoPanel } from "./components/InfoPanel";
import { PetContext } from "../contexts/PetContext";
const jump = require("./assets/video/jump.mp4");

const ROWS = 6;
const COLS = 7;

const screenWidth = Dimensions.get("window").width;
const boardPadding = 10;
const cellMargin = 4;
const boardWidth = screenWidth - 40; // Total board width you want
const totalCellMargins = (COLS + 1) * cellMargin; // if you add margin on left/right of board as well
const cellSize = (boardWidth - totalCellMargins) / COLS;

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function simulateDrop(board, col, symbol) {
  const newBoard = board.map((row) => row.slice());
  for (let row = ROWS - 1; row >= 0; row--) {
    if (newBoard[row][col] === null) {
      newBoard[row][col] = symbol;
      return newBoard;
    }
  }
  return null;
}
const checkWinner = (board) => {
  // Horizontal check
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col <= COLS - 4; col++) {
      if (
        board[row][col] &&
        board[row][col] === board[row][col + 1] &&
        board[row][col] === board[row][col + 2] &&
        board[row][col] === board[row][col + 3]
      ) {
        return board[row][col];
      }
    }
  }
  // Vertical check
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row <= ROWS - 4; row++) {
      if (
        board[row][col] &&
        board[row][col] === board[row + 1][col] &&
        board[row][col] === board[row + 2][col] &&
        board[row][col] === board[row + 3][col]
      ) {
        return board[row][col];
      }
    }
  }
  // Diagonal down-right
  for (let row = 0; row <= ROWS - 4; row++) {
    for (let col = 0; col <= COLS - 4; col++) {
      if (
        board[row][col] &&
        board[row][col] === board[row + 1][col + 1] &&
        board[row][col] === board[row + 2][col + 2] &&
        board[row][col] === board[row + 3][col + 3]
      ) {
        return board[row][col];
      }
    }
  }
  // Diagonal up-right
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col <= COLS - 4; col++) {
      if (
        board[row][col] &&
        board[row][col] === board[row - 1][col + 1] &&
        board[row][col] === board[row - 2][col + 2] &&
        board[row][col] === board[row - 3][col + 3]
      ) {
        return board[row][col];
      }
    }
  }
  return null;
};

// Check for a winning move in Connect Four for a given symbol.
function findWinningMoveConnect4(board, symbol) {
  for (let col = 0; col < COLS; col++) {
    const newBoard = simulateDrop(board, col, symbol);
    if (newBoard && checkWinner(newBoard) === symbol) {
      return col;
    }
  }
  return null;
}

export default function ConnectFour({ navigation }) {
  // Get petData from context (ensure your PetProvider includes an "intelligence" field)
  const { petData, setPetData } = useContext(PetContext);
  const [board, setBoard] = useState(createEmptyBoard());
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const idleTimer = useRef(null);
  // Track how many moves the computer has made to increase difficulty gradually.
  const [computerTurnCount, setComputerTurnCount] = useState(0);

  const user = "You";
  const computer = petData.name;

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setMessage("Play with me!");
    }, 4000);
  };

  useEffect(() => {
    resetIdleTimer();
    return () => clearTimeout(idleTimer.current);
  }, [message]);

  function updatePetStatsAfterGame() {
    // Increase the number of games played.
    setPetData((prev) => {
      const newGamesPlayed = (prev.gamesPlayed || 0) + 1;
      let newGrowth = prev.growth;
      let newEnergy = prev.energy;
      let newIntelligence = prev.intelligence || 1;
      let newHappiness = prev.happiness;
      if (newGamesPlayed % 1 === 0) {
        newHappiness += 7;
        newEnergy -= 15;
      }
      if (newGamesPlayed % 2 === 0) {
        newGrowth += 1;
        newIntelligence += 1;
      }
      return {
        ...prev,
        gamesPlayed: newGamesPlayed,
        growth: newGrowth,
        intelligence: newIntelligence,
        happiness: Math.min(100, newHappiness),
        energy: Math.max(0, newEnergy),
      };
    });
  }

  const handleColumnPress = (col) => {
    if (winner) return;
    const newBoard = simulateDrop(board, col, user);
    if (!newBoard) return;
    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      updatePetStatsAfterGame;
      setWinner(gameWinner);
      return;
    }
    // If there is still room, let computer move after a delay.
    if (newBoard[0].some((cell) => cell === null)) {
      setTimeout(() => {
        computerMove(newBoard);
      }, 500);
    }
  };

  function computerMove(currentBoard) {
    // Calculate strategic probability based on upcoming move and pet's intelligence.
    // Higher petData.intelligence means computer is more strategic.
    const strategicProbability = Math.min(
      1,
      (computerTurnCount + 1) / (3 / (petData.intelligence || 1))
    );
    // Update the computer move count.
    setComputerTurnCount((prev) => prev + 1);
    let move;
    const randomValue = Math.random();
    if (randomValue < strategicProbability) {
      // Try to win.
      move = findWinningMoveConnect4(currentBoard, computer);
      // If no winning move, try to block the user.
      if (move === null) {
        move = findWinningMoveConnect4(currentBoard, user);
      }
    }
    if (move === null) {
      // Fallback: choose a random available column.
      let availableCols = [];
      for (let col = 0; col < COLS; col++) {
        if (currentBoard[0][col] === null) availableCols.push(col);
      }
      if (availableCols.length === 0) return;
      move = availableCols[Math.floor(Math.random() * availableCols.length)];
    }
    const newBoard = simulateDrop(currentBoard, move, computer);
    if (newBoard) {
      setBoard(newBoard);
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        updatePetStatsAfterGame();
        setWinner(gameWinner);
      }
    }
  }

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setWinner(null);
    setComputerTurnCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔴🟡 Connect 4 🟡🔴</Text>
      <ScrollView>
        <View style={styles.petContainer}>
          <View style={styles.petBox}>
            <Video
              source={jump}
              style={styles.petImage}
              resizeMode="contain"
              repeat
              muted
            />
          </View>
          {message !== "" && (
            <Animated.View style={[styles.speechBubble, { opacity: fadeAnim }]}>
              <Text style={styles.speechText}>{message}</Text>
            </Animated.View>
          )}
        </View>
        {winner && <Text style={styles.winner}>Winner: {winner}</Text>}
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.cell,
                    {
                      backgroundColor: cell
                        ? cell === user
                          ? "red"
                          : "yellow"
                        : "white",
                    },
                  ]}
                  onPress={() => handleColumnPress(colIndex)}
                  disabled={winner !== null}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MiniGames")}
        >
          <Icon name="game-controller" size={24} color="white" />
          <Text style={styles.buttonText}>Back to Minigames</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Icon name="refresh" size={24} color="white" />
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
      <InfoPanel />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f4f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5a4a42",
    textAlign: "center",
    marginVertical: 20,
  },
  petContainer: { alignItems: "center" },
  petBox: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  speechBubble: {
    position: "absolute",
    top: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  speechText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  board: {
    width: boardWidth,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#333",
    backgroundColor: "blue",
    alignSelf: "center", // Center it horizontally
    // Remove padding to prevent extra width
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    width: cellSize, // Use calculated cellSize
    height: cellSize,
    margin: 2,
    borderRadius: cellSize / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  winner: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
});
