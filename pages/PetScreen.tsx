import { useState, useRef, useEffect, useCallback, useContext } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PetContext } from "../contexts/PetContext";
import { FoodModal } from "./components/FoodModal";
import PetStats from "./components/PetStats";
import Icon from "react-native-vector-icons/Ionicons";

export default function PetScreen() {
  const navigation = useNavigation();
  const { petData, setPetData } = useContext(PetContext);
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  // Combined refresh function that applies decay based on elapsed time.
  const refreshPetData = useCallback(async () => {
    setPetData((prevPet) => {
      if (!prevPet) {
        return prevPet;
      }
      const now = Date.now();
      const lastUpdated = prevPet.lastUpdated;
      const elapsedMilliseconds = now - lastUpdated;
      const elapsedMinutes = elapsedMilliseconds / 60000;
      const decayAmount = Math.floor(elapsedMinutes * 1);

      const hunger =
        prevPet.remainingSlowReleaseTime > 0
          ? prevPet.hunger
          : Math.min(100, prevPet.hunger + decayAmount);
      const happiness = Math.max(0, prevPet.happiness - decayAmount);
      const remainingSlowReleaseTime = Math.max(
        0,
        prevPet.remainingSlowReleaseTime - elapsedMilliseconds
      );

      return {
        ...prevPet,
        hunger,
        happiness,
        lastUpdated: now,
        remainingSlowReleaseTime,
      };
    });
  }, [setPetData]);

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

  const showFood = () => {
    setFoodModalVisible(true);
  };

  const handlePet = async () => {
    // increase happiness
    setPetData({
      ...petData,
      happiness: petData.happiness + 10,
    });
    showMessage("That was nice!");
  };

  const showMessage = (text: string) => {
    fadeAnim.setValue(1);
    setMessage(text);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setMessage("");
      }
    });
    resetIdleTimer();
  };

  const resetIdleTimer = () => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }
    idleTimer.current = setTimeout(() => {
      setMessage("Interact with me!");
    }, 4000);
  };

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
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
        <TouchableOpacity style={styles.button} onPress={showFood}>
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
      <FoodModal
        visible={foodModalVisible}
        onClose={() => setFoodModalVisible(false)}
        showMessage={showMessage}
      />
      <PetStats />
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
    paddingVertical: 5,
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
