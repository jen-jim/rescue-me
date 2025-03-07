import { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { getPetData, savePetData } from "../utils/Local-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function PetScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const [petData, setPetData] = useState({});
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const idleTimer = useRef(null);

  // Combined refresh function that applies decay based on elapsed time.
  const refreshPetData = useCallback(async () => {
    const storedPet = await getPetData();
    if (storedPet) {
      const now = Date.now();
      const lastUpdated = storedPet.lastUpdated || now;
      // Calculate elapsed time in minutes.
      const elapsedMinutes = (now - lastUpdated) / 60000;
      const decayRate = 1; // 1 happiness point per minute.
      const decayAmount = Math.floor(elapsedMinutes * decayRate);
      const updatedHappiness = Math.max(0, storedPet.happiness - decayAmount);
      const updatedHunger = Math.min(100, storedPet.hunger + decayAmount);
      const updatedPet = {
        ...storedPet,
        hunger: updatedHunger,
        happiness: updatedHappiness,
        lastUpdated: now, // Reset timestamp after applying decay.
      };
      setPetData(updatedPet);
      await savePetData(updatedPet);
    }
  }, []);

  // Refresh pet data when the screen regains focus.
  useFocusEffect(
    useCallback(() => {
      refreshPetData();
    }, [refreshPetData])
  );

  // Set up an interval to refresh pet data in real time while mounted.
  useEffect(() => {
    const interval = setInterval(() => {
      refreshPetData();
    }, 60000);
    return () => clearInterval(interval);
  }, [refreshPetData]);

  const updatePetData = async (newData) => {
    setPetData(newData);
    await savePetData(newData);
  };

  const handleFeed = async () => {
    // Decrease hunger and increase happiness
    const hungerValue = Math.max(0, petData.hunger - 10);
    const happinessValue = petData.happiness + 5;
    const updatedPet = {
      ...petData,
      hunger: hungerValue,
      happiness: happinessValue,
    };

    await updatePetData(updatedPet);
    showMessage("That was tasty!");
  };

  const handlePet = async () => {
    // increase happiness
    const happinessValue = petData.happiness + 10;
    const updatedPet = {
      ...petData,
      happiness: happinessValue,
    };

    await updatePetData(updatedPet);
    showMessage("That was nice!");
  };

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
        <View style={styles.petBox}>
          <Image
            source={require("./assets/video/placeholder_img.png")}
            style={styles.petImage}
          />
        </View>

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
          onPress={() => navigation.navigate("MiniGames")}
        >
          <Icon name="game-controller" size={24} color="white" />
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFeed}>
          <Icon name="fast-food" size={24} color="white" />
          <Text style={styles.buttonText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePet}>
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
      <View style={styles.petStats}>
        <Text style={styles.statsText}>Name: {petData.name}</Text>
        <Text style={styles.statsText}>Happiness: {petData.happiness}</Text>
        <Text style={styles.statsText}>Hunger: {petData.hunger}</Text>
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
});
