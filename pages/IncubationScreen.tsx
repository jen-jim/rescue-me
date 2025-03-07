import { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { PetContext } from "../contexts/PetContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { formatTimeString } from "../utils/hatchUtils";
import PrematureHatchButton from "./components/PrematureHatchButton";
import Icon from "react-native-vector-icons/Ionicons";
import {
  CleanInfoModal,
  FeedInfoModal,
  HealthInfoModal,
  MainInfoModal,
  MedicineInfoModal,
  PettingInfoModal,
} from "./components/IncubationInfoModals";
import { InfoPanel } from "./components/InfoPanel";

export default function PetScreen() {
  const navigation = useNavigation();
  const { petData, setPetData } = useContext(PetContext);
  const [message, setMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(1));
  const [progress, setProgress] = useState(0);
  const [progressColour, setProgressColour] = useState("red");
  // const [disabled, setDisabled] = useState(true);
  // const [progressButtonStyle, setProgressButtonStyle] = useState(
  //   styles.disabledButton
  // );
  const [hatchTime, setHatchTime] = useState(0);
  const [isMainInfoModalVisible, setMainInfoModalVisible] = useState(true);
  const [isHealthModalVisible, setHealthModalVisible] = useState(false);
  const [isFeedInfoModalVisible, setFeedInfoModalVisible] = useState(false);
  const [isMedicineInfoModalVisible, setMedicineInfoModalVisible] =
    useState(false);
  const [isPettingInfoModalVisible, setPettingInfoModalVisible] =
    useState(false);
  const [isCleanInfoModalVisible, setCleanInfoModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      //calculate remaining hatch time on screen focus
      const now = Date.now();
      const beganIncubation = petData.beganIncubation || now;
      // const storedHatchTime = petData.hatchTime || 86400000;
      const extraTime = petData.extraTime || 0;
      const elapsedHatchTime = now - beganIncubation;
      const remainingHatchTime = 86400000 - elapsedHatchTime + extraTime;

      setHatchTime(remainingHatchTime);

      if (!petData.beganIncubation || extraTime) {
        const newPetData = { ...petData, beganIncubation, extraTime };
        setPetData(newPetData);
      }

      //visible countdown
      const intervalId = setInterval(() => {
        setHatchTime((currHatchTime) => Math.max(currHatchTime - 1000, 0));
      }, 1000);

      return () => clearInterval(intervalId);
    }, [petData, setPetData])
  );

  function showMessage(text: string) {
    setMessage(text);

    if (progress >= 0.9) {
      setProgress(1);
    } else {
      setProgress(progress + 0.1);
    }
    if (progress >= 0.75) {
      setProgressColour("green");
      // setDisabled(false);
    } else if (progress >= 0.15) {
      setProgressColour("orange");
    } else {
      setProgressColour("red");
    }
    // if (disabled === false) {
    //   setProgressButtonStyle(styles.buttonProgress);
    // }
    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setMessage("");
      }
    });
  }

  function handleHatch() {
    setPetData({
      ...petData,
      justHatched: true,
    });
    navigation.navigate("Pet");
    //some logic on pet page to show a congratulations message
    // when justHatched===true, after which justHatched is set
    // to false (so the congratulations only shows first time)
  }

  function handleTitle() {
    setMainInfoModalVisible(true);
  }
  function handleHealth() {
    setHealthModalVisible(true);
  }
  function handleInteractionInfo(interaction: string) {
    switch (interaction) {
      case "Feed":
        setFeedInfoModalVisible(true);
        break;

      case "Medicine":
        setMedicineInfoModalVisible(true);
        break;

      case "Pet":
        setPettingInfoModalVisible(true);
        break;

      case "Clean":
        setCleanInfoModalVisible(true);
        break;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={handleTitle}>
        <Text style={styles.title}>🌿 Nurture Chamber 🌿</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.petContainer}>
          <View style={styles.petModel}>
            <Text>[Ill pet]</Text>
          </View>

          <View>
            {hatchTime > 0 ? ( // Change > to < to view hatch me button
              <Text style={styles.hatchCountdownText}>
                ⏳ {formatTimeString(hatchTime)}
              </Text>
            ) : (
              <TouchableOpacity
                style={styles.hatchButton}
                onPress={handleHatch}
              >
                <Text style={styles.hatchButtonText}>✨ Take Me Home 🏠✨</Text>
              </TouchableOpacity>
            )}
          </View>
          {hatchTime > 0 && (
            <PrematureHatchButton
              progress={progress}
              handleHatch={handleHatch}
            />
          )}

          <TouchableOpacity
            style={[styles.healthContainer, styles.section]}
            activeOpacity={1}
            onPress={handleHealth}
          >
            <Icon name={"heart"} size={24} color="#3d3d3d" />
            <Text style={styles.healthText}> Health:</Text>
            <View
            // style={styles.progressBarContainer}💜
            >
              <Progress.Bar
                progress={progress}
                color={progressColour}
                width={Dimensions.get("window").width * 0.64}
                height={25}
                // borderColor={"#ba68c8"}
                // borderColor={"#3d3d3d"}
                borderColor={"#5a4a42"}
                borderWidth={3}
                borderRadius={10}
              />
              <Text style={styles.progressText}>
                {Math.round(progress * 100)}%
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          {message !== "" && (
            <Animated.View style={[styles.speechBubble, { opacity: fadeAnim }]}>
              <Text style={styles.message}>{message}</Text>
            </Animated.View>
          )}

          <View
            style={styles.interactionButtonsContainer}
            // style={styles.section}
          >
            {[
              { text: "Feed", icon: "fast-food", msg: "That was tasty!" },
              { text: "Medicine", icon: "eyedrop-outline", msg: "Yuck!" },
              { text: "Pet", icon: "hand-left", msg: "*Wags tail*" },
              { text: "Clean", icon: "water-outline", msg: "*wet dog shake*" },
            ].map((btn) => {
              return (
                <View key={btn.text} style={styles.interactionButtonWrapper}>
                  <TouchableOpacity
                    key={btn.text}
                    disabled={progress === 1}
                    style={[
                      styles.button,
                      progress !== 1
                        ? styles.buttonEnabled
                        : styles.buttonDisabled,
                    ]}
                    onPress={() => showMessage(btn.msg)}
                  >
                    <Icon name={btn.icon} size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      handleInteractionInfo(btn.text);
                    }}
                  >
                    <Text style={styles.interactionText}>{btn.text}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <InfoPanel />

      <MainInfoModal
        isMainInfoModalVisible={isMainInfoModalVisible}
        setMainInfoModalVisible={setMainInfoModalVisible}
      />

      <HealthInfoModal
        isHealthModalVisible={isHealthModalVisible}
        setHealthModalVisible={setHealthModalVisible}
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
      <CleanInfoModal
        isCleanInfoModalVisible={isCleanInfoModalVisible}
        setCleanInfoModalVisible={setCleanInfoModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#faf5ff", //purple theme
    // backgroundColor: "#f7d6d0",
    // backgroundColor: "#e3d6c6",
    backgroundColor: "#f9f4f0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  // title2: {
  //   // color: "#4a148c",
  //   color: "#c785a5",
  //   fontSize: 28,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   textShadowColor: "#d1c4e9",
  //   textShadowOffset: { width: 2, height: 2 },
  //   textShadowRadius: 5,
  // },
  // title3: {
  //   fontSize: 28,
  //   fontWeight: "bold",
  //   color: "#ffffff",
  //   textAlign: "center",
  //   textShadowColor: "rgba(0, 0, 0, 0.7)",
  //   textShadowOffset: { width: 2, height: 2 },
  //   textShadowRadius: 5,
  // },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5a4a42",
    textAlign: "center",
  },
  petContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  petModel: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  // section1: {
  //   backgroundColor: "#fff",
  //   padding: 15,
  //   borderRadius: 10,
  //   // marginBottom: 15,
  //   marginVertical: 15,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  //   width: "96%",
  // },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    width: "96%",
  },
  speechBubble: {
    position: "absolute",
    bottom: 300,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  message: {
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
  interactionButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 20,
    marginHorizontal: 20,
  },
  recoveryTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  healthContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-around",
    justifyContent: "space-between",
    // width: "90%",
    // paddingHorizontal: 15,
    // marginVertical: 30,
  }, //
  healthText: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#d81b60",
    // color: "#7b1fa2",
    // color: "#5a2a2a",
    // color: "#3d3d3d",
    color: "#5a4a42",
    marginEnd: 5,
  },
  progressText: {
    // color: "#4a148c", //purple
    color: "#3d3d3d",
    // color: "#5a4a42",
    position: "absolute",
    alignSelf: "center",
    fontWeight: "bold",
    top: 2,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  interactionButtonWrapper: {
    alignItems: "center",
    marginHorizontal: 5,
    // marginHorizontal: 20,
    marginBottom: 30,
    // width: "40%",
  },
  interactionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a4a42",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonEnabled: {
    //backgroundColor: "#ba68c8"
    backgroundColor: "#ff6b6b",
  },
  buttonDisabled: {
    // backgroundColor: "#d1a3e0",
    backgroundColor: "#ffb3b3",
    opacity: 0.6,
  },
  // hatchCountdownText2: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: "#7b1fa2",
  //   backgroundColor: "#f3e5f5",
  //   paddingVertical: 8,
  //   paddingHorizontal: 15,
  //   borderRadius: 15,
  //   borderWidth: 2,
  //   borderColor: "#ce93d8",
  //   textAlign: "center",
  //   marginTop: 10,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.2,
  //   shadowOffset: { width: 2, height: 2 },
  // },
  hatchCountdownText: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#ff6b6b",
    // backgroundColor: "#ffd6d6",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#ff6b6b",
    textAlign: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  hatchButton: {
    // backgroundColor: "#ffd6d6",
    backgroundColor: "#ff6b6b",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ff6b6b",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    marginVertical: 20,
  },
  hatchButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#ff6b6b",
    color: "white",
    // textShadowColor: "white",
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 5,
  },
  // hatchButton2: {
  //   backgroundColor: "#f8bbd0",
  //   paddingVertical: 15,
  //   paddingHorizontal: 30,
  //   borderRadius: 20,
  //   borderWidth: 2,
  //   borderColor: "#e91e63",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.3,
  //   shadowOffset: { width: 2, height: 2 },
  //   marginTop: 20,
  // },
  // hatchButtonText2: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: "#880e4f",
  //   textShadowColor: "white",
  //   textShadowOffset: { width: 1, height: 1 },
  //   textShadowRadius: 5,
  // },
});
