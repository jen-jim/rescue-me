import { useState, useRef, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PetContext } from "../contexts/PetContext";
import { FoodModal } from "./components/FoodModal";
import { MedicineModal } from "./components/MedicineModal";
import PetStats from "./components/PetStats";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./StyleSheets/PetScreenStyles";
import { InfoPanel } from "./components/InfoPanel";
import {
  CutenessInfoModal,
  EnergyInfoModal,
  FeedInfoModal,
  GrowthInfoModal,
  HappinessInfoModal,
  HungerInfoModal,
  IntelligenceInfoModal,
  MainInfoModal,
  MedicineInfoModal,
  PettingInfoModal,
  PlayInfoModal,
  StaminaInfoModal,
  WalkInfoModal,
} from "./components/PetPageInfoModals";
import ActivityLog from "./components/ActivityLog";
import Video from "react-native-video";
import MiniGames from "./MiniGames";

const idle = require("./assets/video/idle.mp4");
const pet = require("./assets/video/pet.mp4");

export default function PetScreen() {
  const navigation = useNavigation();
  const { petData, setPetData } = useContext(PetContext);
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [medicineModalVisible, setMedicineModalVisible] = useState(false);

  const [isMainInfoModalVisible, setMainInfoModalVisible] = useState(false);
  const [isPlayModalVisible, setPlayModalVisible] = useState(false);
  const [isFeedInfoModalVisible, setFeedInfoModalVisible] = useState(false);
  const [isMedicineInfoModalVisible, setMedicineInfoModalVisible] =
    useState(false);
  const [isPettingInfoModalVisible, setPettingInfoModalVisible] =
    useState(false);
  const [isWalkInfoModalVisible, setWalkInfoModalVisible] = useState(false);
  const [isGrowthInfoModalVisible, setGrowthInfoModalVisible] = useState(false);
  const [isStaminaInfoModalVisible, setStaminaInfoModalVisible] =
    useState(false);
  const [isIntelligenceInfoModalVisible, setIntelligenceInfoModalVisible] =
    useState(false);
  const [isHungerInfoModalVisible, setHungerInfoModalVisible] = useState(false);
  const [isHappinessInfoModalVisible, setHappinessInfoModalVisible] =
    useState(false);
  const [isEnergyInfoModalVisible, setEnergyInfoModalVisible] = useState(false);
  const [isCutenessInfoModalVisible, setCutenessInfoModalVisible] =
    useState(false);

  const [message, setMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const [petVideo, setPetVideo] = useState(idle);

  const playVideoForAction = (video: any) => {
    setPetVideo(video);
    setTimeout(() => {
      setPetVideo(idle);
    }, 5000);
  };

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

  // Close modals when the screen loses focus.
  useFocusEffect(
    useCallback(() => {
      return () => {
        setFoodModalVisible(false);
        setMedicineModalVisible(false);
      };
    }, [])
  );

  // Set up an interval to refresh pet data in real time while mounted.
  useEffect(() => {
    const interval = setInterval(() => {
      refreshPetData();
    }, 60000);
    return () => clearInterval(interval);
  }, [refreshPetData]);

  const handlePet = () => {
    // increase happiness
    setPetData((prevPetData) => ({
      ...prevPetData,
      happiness: Math.min(100, prevPetData.happiness + 10),
    }));
    playVideoForAction(pet);
    showMessage("");
    setTimeout(() => {
      showMessage("That was nice!");
    }, 3000);
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

  function handleTitle() {
    setMainInfoModalVisible(true);
  }

  function handleplayClick() {
    if (petData.energy <= 0) {
      setMessage("Your Pet is Too tired");
      resetIdleTimer();
    } else {
      navigation.navigate("MiniGames");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={handleTitle}>
        <Text style={styles.title}>{petData.name || "Pet Name"}</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.petContainer}>
          <View style={styles.petBox}>
            <Video
              source={petVideo}
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
          {message === "Interact with me!" && (
            <View style={[styles.speechBubble]}>
              <Text style={styles.speechText}>{message}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={() => handleplayClick()}
            onLongPress={() => {
              setPlayModalVisible(true);
            }}
          >
            <Icon name="game-controller" size={24} color="white" />
            <Text style={styles.buttonText}>Play</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setMessage("");
              resetIdleTimer();
              setFoodModalVisible(true);
            }}
            onLongPress={() => {
              setFeedInfoModalVisible(true);
            }}
          >
            <Icon name="fast-food" size={24} color="white" />
            <Text style={styles.buttonText}>Feed</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              handlePet();
            }}
            onLongPress={() => {
              setPettingInfoModalVisible(true);
            }}
          >
            <Icon name="hand-left" size={24} color="white" />
            <Text style={styles.buttonText}>Pet</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setMessage("");
              resetIdleTimer();
              setMedicineModalVisible(true);
            }}
            onLongPress={() => {
              setMedicineInfoModalVisible(true);
            }}
          >
            <Icon name="medkit" size={24} color="white" />
            <Text style={styles.buttonText}>Medicate</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Walk")}
            onLongPress={() => {
              setWalkInfoModalVisible(true);
            }}
          >
            <Icon name="walk" size={24} color="white" />
            <Text style={styles.buttonText}>Walk</Text>
          </Pressable>
        </View>
        <FoodModal
          visible={foodModalVisible}
          onClose={() => setFoodModalVisible(false)}
          showMessage={showMessage}
          playVideoForAction={playVideoForAction}
        />
        <MedicineModal
          visible={medicineModalVisible}
          onClose={() => setMedicineModalVisible(false)}
          showMessage={showMessage}
          playVideoForAction={playVideoForAction}
        />
        <PetStats
          setGrowthInfoModalVisible={setGrowthInfoModalVisible}
          setHungerInfoModalVisible={setHungerInfoModalVisible}
          setHappinessInfoModalVisible={setHappinessInfoModalVisible}
          setEnergyInfoModalVisible={setEnergyInfoModalVisible}
          setCutenessInfoModalVisible={setCutenessInfoModalVisible}
          setStaminaInfoModalVisible={setStaminaInfoModalVisible}
          setIntelligenceInfoModalVisible={setIntelligenceInfoModalVisible}
        />
        <ActivityLog />
      </ScrollView>
      <InfoPanel />
      <MainInfoModal
        isMainInfoModalVisible={isMainInfoModalVisible}
        setMainInfoModalVisible={setMainInfoModalVisible}
      />

      <PlayInfoModal
        isPlayModalVisible={isPlayModalVisible}
        setPlayModalVisible={setPlayModalVisible}
      />

      <FeedInfoModal
        isFeedInfoModalVisible={isFeedInfoModalVisible}
        setFeedInfoModalVisible={setFeedInfoModalVisible}
      />
      <MedicineInfoModal
        isMedicineInfoModalVisible={isMedicineInfoModalVisible}
        setMedicineInfoModalVisible={setMedicineInfoModalVisible}
      />
      <PettingInfoModal
        isPettingInfoModalVisible={isPettingInfoModalVisible}
        setPettingInfoModalVisible={setPettingInfoModalVisible}
      />
      <WalkInfoModal
        isWalkInfoModalVisible={isWalkInfoModalVisible}
        setWalkInfoModalVisible={setWalkInfoModalVisible}
      />
      <GrowthInfoModal
        isGrowthInfoModalVisible={isGrowthInfoModalVisible}
        setGrowthInfoModalVisible={setGrowthInfoModalVisible}
      />
      <StaminaInfoModal
        isStaminaInfoModalVisible={isStaminaInfoModalVisible}
        setStaminaInfoModalVisible={setStaminaInfoModalVisible}
      />
      <IntelligenceInfoModal
        isIntelligenceInfoModalVisible={isIntelligenceInfoModalVisible}
        setIntelligenceInfoModalVisible={setIntelligenceInfoModalVisible}
      />
      <HungerInfoModal
        isHungerInfoModalVisible={isHungerInfoModalVisible}
        setHungerInfoModalVisible={setHungerInfoModalVisible}
      />
      <HappinessInfoModal
        isHappinessInfoModalVisible={isHappinessInfoModalVisible}
        setHappinessInfoModalVisible={setHappinessInfoModalVisible}
      />
      <EnergyInfoModal
        isEnergyInfoModalVisible={isEnergyInfoModalVisible}
        setEnergyInfoModalVisible={setEnergyInfoModalVisible}
      />
      <CutenessInfoModal
        isCutenessInfoModalVisible={isCutenessInfoModalVisible}
        setCutenessInfoModalVisible={setCutenessInfoModalVisible}
      />
    </SafeAreaView>
  );
}
