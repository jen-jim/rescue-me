import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function PetScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const idleTimer = useRef(null);

  const showMessage = (text) => {
    fadeAnim.setValue(1);
    setMessage(text);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setMessage("");
    });
    resetIdleTimer();
  };

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setMessage("Interact with me!");
    }, 4000);
  };

  useEffect(() => {
    resetIdleTimer();
    return () => clearTimeout(idleTimer.current);
  }, [message]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.petContainer}>
        {message !== "" && (
          <Animated.View style={[styles.speechBubble, { opacity: fadeAnim }]}>
            <Text style={styles.speechText}>{message}</Text>
          </Animated.View>
        )}
        {message === "Interact with me!" && (
          <View style={[styles.speechBubble]}>
            <Text style={styles.speechText}>{message}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showMessage("That was fun!", 1)}
        >
          <Icon name="game-controller" size={24} color="white" />
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showMessage("That was tasty!", 2)}
        >
          <Icon name="fast-food" size={24} color="white" />
          <Text style={styles.buttonText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showMessage("That was nice!", 3)}
        >
          <Icon name="hand-left" size={24} color="white" />
          <Text style={styles.buttonText}>Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Walk")}
        >
          <Icon name="walk" size={24} color="white" />
          <Text style={styles.buttonText}>Walk</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

//interactions happen in AR?
//pet (3d model) should respond/animate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  petContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
