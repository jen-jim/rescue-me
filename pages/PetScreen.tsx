import { useState, useRef, useEffect, useCallback, useContext } from "react";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PetContext } from "../contexts/PetContext";
import { FoodModal } from "./components/FoodModal";
import { MedicineModal } from "./components/MedicineModal";
import PetStats from "./components/PetStats";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./StyleSheets/PetScreenStyles";

export default function PetScreen() {
  const navigation = useNavigation();
  const { petData, setPetData } = useContext(PetContext);
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [medicineModalVisible, setMedicineModalVisible] = useState(false);
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setFoodModalVisible(true);
          }}
        >
          <Icon name="fast-food" size={24} color="white" />
          <Text style={styles.buttonText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePet}>
          <Icon name="hand-left" size={24} color="white" />
          <Text style={styles.buttonText}>Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setMedicineModalVisible(true);
          }}
        >
          <Icon name="medkit" size={24} color="white" />
          <Text style={styles.buttonText}>Medicate</Text>
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
      <MedicineModal
        visible={medicineModalVisible}
        onClose={() => setMedicineModalVisible(false)}
        showMessage={showMessage}
      />
      <PetStats />
    </SafeAreaView>
  );
}

//interactions happen in AR?
//pet (3d model) should respond/animate
