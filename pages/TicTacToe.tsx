import { useState, useRef, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import { InfoPanel } from "./components/InfoPanel";
import { PetContext } from "../contexts/PetContext";
const play = require("./assets/video/play.mp4");

export default function TicTacToe({ navigation }) {
  const { petData, setPetData } = useContext(PetContext);
  const [message, setMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const idleTimer = useRef(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [playsLeft, setPlays] = useState(3);
  const [computerTurnCount, setComputerTurnCount] = useState(0);

  const user = "X";
  const computer = "O";

  const resetIdleTimer = () => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }
    idleTimer.current = setTimeout(() => {
      setMessage("Tic Tac Toe");
    }, 4000);
  };

  useEffect(() => {
    resetIdleTimer();
    return () => clearTimeout(idleTimer.current);
  }, [message]);

  function checkWinner(newBoard) {
    const winningCombos = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  }

  function findWinningMove(board, symbol) {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = symbol;
        if (checkWinner(newBoard) === symbol) {
          return i;
        }
      }
    }
    return null;
  }

  function computerMove(currentBoard) {
    // Calculate a probability that increases with each move.
    // after 3 moves, the probability is 1 (always strategic).
    const strategicProbability = Math.min(
      1,
      (computerTurnCount + 1) / (3 / petData.intelligence || 1)
    );
    setComputerTurnCount((prev) => prev + 1);

    let move;

    const randomValue = Math.random();

    if (randomValue < strategicProbability) {
      move = findWinningMove(currentBoard, computer);
      if (move === null) {
        move = findWinningMove(currentBoard, user);
      }
    }

    if (move === null) {
      let emptyIndices = currentBoard
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null);
      move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    const newBoard = [...currentBoard];
    newBoard[move] = computer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  }
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

  function handleCellClick(index) {
    if (petData.energy === 0) {
      setMessage("Your pet is too tired to play.");
      return;
    }
    if (board[index] || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = user;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      updatePetStatsAfterGame();

      setWinner(gameWinner);
      return;
    }

    if (newBoard.includes(null)) {
      setTimeout(() => {
        computerMove(newBoard);
      }, 250);
    }
  }

  function reward() {}

  function resetGame() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setMessage("");
  }
  function handlePlayAgain() {
    if (playsLeft > 0) {
      reward();
      setPlays((prev) => prev - 1);
    } else {
      console.log("no reward plays left");
    }
    resetGame();
  }

  const boardIsFull = !board.includes(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>❌⭕️ Tic Tac Toe ⭕️❌</Text>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.petContainer}>
            <View style={styles.petBox}>
              <Video
                source={play}
                style={styles.petImage}
                resizeMode="contain"
                repeat
                muted
              />
            </View>

            {message !== "" && (
              <Animated.View
                style={[styles.speechBubble, { opacity: fadeAnim }]}
              >
                <Text style={styles.speechText}>{message}</Text>
              </Animated.View>
            )}
          </View>
          {winner && (
            <Text style={styles.winner}>
              🏆 {winner === "X" ? "You Win" : "Your pet Wins"} 🏆
            </Text>
          )}

          <View style={styles.container}>
            <View style={styles.grid}>
              {board.map((square, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.square}
                  onPress={() => handleCellClick(index)}
                  disabled={winner !== null}
                >
                  <Animated.View style={[styles.cellContent]}>
                    <Text style={styles.squareText}>{square}</Text>
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {winner || boardIsFull ? (
            <TouchableOpacity
              style={styles.playAgainButton}
              onPress={handlePlayAgain}
            >
              <Text style={styles.playAgainButtonText}>
                Play Again (Rewards left: {playsLeft})
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.currentPlayer}>Your Turn (X)</Text>
          )}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Pet")}
        >
          <Icon name="game-controller" size={20} color="white" />
          <Text style={styles.buttonText}>Back to Your Pet</Text>
        </TouchableOpacity>
      </View>

      <InfoPanel />
    </SafeAreaView>
  );
}

//interactions happen in AR?
//pet (3d model) should respond/animate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f4f0",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5a4a42",
    textAlign: "center",
    marginVertical: 20,
  },
  currentPlayer: { fontSize: 20, margin: 0, color: "purple" },
  // winner: { fontSize: 24, marginBottom: 10, color: "pink", fontWeight: "bold" },
  winner2: {
    fontSize: 28, // Make the text larger
    fontWeight: "bold", // Make the font bold for emphasis
    color: "#ffcc00", // A gold color for the winner
    marginBottom: 20, // Add some space below
    padding: 10, // Add padding for a more comfortable feel
    backgroundColor: "#ff6b6b", // Use a contrasting background to highlight the message
    borderRadius: 10, // Rounded corners for a smooth look
    textAlign: "center", // Center the text
    shadowColor: "#000", // Add a shadow effect
    shadowOpacity: 0.3, // Slight opacity for the shadow
    shadowOffset: { width: 2, height: 2 }, // Offset for a soft shadow
    shadowRadius: 5, // Blur the shadow slightly for a soft effect
  },
  winner3: {
    fontSize: 32, // Larger font size for better visibility
    fontWeight: "bold", // Bold for emphasis
    color: "#ffd700", // Gold color, bright and readable
    marginBottom: 20, // Space below the text
    textAlign: "center", // Centered text
  },
  winner4: {
    fontSize: 32, // Larger font size for better visibility
    fontWeight: "bold", // Bold for emphasis
    color: "#333", // Dark text color (charcoal or dark gray)
    marginBottom: 20, // Space below the text
    textAlign: "center", // Centered text
    textShadowColor: "#ffcc00", // Brighter gold color for the glow
    textShadowOffset: { width: 0, height: 0 }, // No offset, centered glow
    textShadowRadius: 20, // Larger radius for a bold glow
  },
  winner: {
    fontSize: 32, // Larger font size for better visibility
    fontWeight: "bold", // Bold for emphasis
    color: "#fff", // White text color for contrast
    // backgroundColor: "#ffd700", // Bright gold background
    backgroundColor: "#4CAF50",
    paddingVertical: 15, // Vertical padding to make it look like a banner
    paddingHorizontal: 30, // Horizontal padding for spacing
    // borderRadius: 25, // Rounded corners for a banner-like shape
    marginBottom: 20, // Space below the text
    textAlign: "center", // Center the text
    overflow: "hidden", // Ensures no overflow outside the rounded corners
    textShadowColor: "#d49b00", // Slight darker shadow for text
    textShadowOffset: { width: 0, height: 2 }, // Soft shadow below the text for depth
    textShadowRadius: 8, // Shadow radius for depth effect
    elevation: 5, // Adds some shadow depth for a floating effect (Android)
  },
  grid: {
    margin: 0,
    padding: 0,
    marginTop: 0,
    paddingTop: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    height: 300,
    width: 300,
    marginBottom: 10,
  },
  square: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 1,
    // borderColor: "#444",
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
  },
  cellContent: {
    transform: [{ scale: 1 }],
  },
  squareText: { fontSize: 36, color: "pink" },

  petContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    margin: 0,
    padding: 0,
  },
  canvas: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.5,
  },
  speechBubble: {
    position: "absolute",
    top: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  speechText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    gap: 8,
  },
  toggleButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  petStats: {
    padding: 10,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  statsText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  petBox: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
  },
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  playAgainButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  playAgainButtonText: {
    color: "white",
    fontSize: 18,
  },
});
