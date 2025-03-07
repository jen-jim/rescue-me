import { useCallback, useState } from "react";
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
import { getPetData, savePetData } from "../utils/Local-storage";
import { useFocusEffect } from "@react-navigation/native";
import { formatTimeString } from "../utils/hatchUtils";
import PrematureHatchButton from "./components/PrematureHatchButton";
import Icon from "react-native-vector-icons/Ionicons";

export default function PetScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(1));
  const [progress, setProgress] = useState(0);
  const [progressColour, setProgressColour] = useState("red");
  // const [disabled, setDisabled] = useState(true);
  // const [progressButtonStyle, setProgressButtonStyle] = useState(
  //   styles.disabledButton
  // );
  const [hatchTime, setHatchTime] = useState(0);

  useFocusEffect(
    useCallback(() => {
      //calculate remaining hatch time on screen focus
      getPetData().then(
        (storedPetData = { name: "Fluffy", happiness: 80, hunger: 20 }) => {
          // (hard code example data)
          const now = Date.now();
          const beganIncubation = storedPetData.beganIncubation || now;
          // const storedHatchTime = storedPetData.hatchTime || 86400000;
          const extraTime = storedPetData.extraTime || 0;
          const elapsedHatchTime = now - beganIncubation;
          const remainingHatchTime = 86400000 - elapsedHatchTime + extraTime;

          setHatchTime(remainingHatchTime);

          if (!storedPetData.beganIncubation || extraTime) {
            const newPetData = { ...storedPetData, beganIncubation, extraTime };
            savePetData(newPetData);
          }
        }
      );

      //visible countdown
      const intervalId = setInterval(() => {
        setHatchTime((currHatchTime) => Math.max(currHatchTime - 1000, 0));
      }, 1000);

      return () => clearInterval(intervalId);
    }, [])
  );

  function showMessage(message) {
    setMessage(message);

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
      if (finished) setMessage("");
    });
  }

  function handleHatch() {
    getPetData()
      .then((petData) => {
        return savePetData({ ...petData, justHatched: true });
      })
      .then(navigation.navigate("Pet"));
    //some logic on pet page to show a congratulations message
    // when justHatched===true, after which justHatched is set
    // to false (so the congratulations only shows first time)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🌿 Nurture Chamber 🌿</Text>
      <ScrollView>
        <View style={styles.petContainer}>
          <View style={styles.petModel}>
            <Text>[Ill pet]</Text>
          </View>

          <View>
            {hatchTime > 0 ? ( // Change > to < to view hatch me button
              <Text style={styles.hatchCountdownText}>
                ⏳ {formatTimeString(hatchTime)} remaining
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

          <PrematureHatchButton progress={progress} handleHatch={handleHatch} />

          <View style={[styles.healthContainer, styles.section]}>
            <Text style={styles.healthText}>💜 Health:</Text>
            <View
            // style={styles.progressBarContainer}
            >
              <Progress.Bar
                progress={progress}
                color={progressColour}
                width={Dimensions.get("window").width * 0.64}
                height={25}
                borderColor={"#ba68c8"}
                borderWidth={3}
                borderRadius={10}
              />
              <Text style={styles.progressText}>
                {Math.round(progress * 100)}%
              </Text>
            </View>
          </View>

          {/* <View style={styles.buttonsContainer}>
            <TouchableOpacity style={progressButtonStyle} disabled={disabled}>
              <Text style={styles.buttonTextProgress}>[progress btn text]</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.buttonsContainer}>
          {message !== "" && (
            <Animated.View style={[styles.speechBubble, { opacity: fadeAnim }]}>
              <Text style={styles.message}>{message}</Text>
            </Animated.View>
          )}
          <View
          // style={styles.section}
          >
            {[
              { text: "Feed", icon: "fast-food", msg: "That was tasty!" },
              { text: "Medicine", icon: "eyedrop-outline", msg: "Yuck!" },
              { text: "Pet", icon: "hand-left", msg: "*Wags tail*" },
              { text: "Clean", icon: "water-outline", msg: "*wet dog shake*" },
            ].map((btn) => {
              return (
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
                  <Icon name={btn.icon} size={18} color="white" />
                  <Text style={styles.buttonText}>{btn.text}</Text>
                </TouchableOpacity>
              );
            })}
            {/* <TouchableOpacity
              disabled={progress === 1}
              style={[
                styles.button,
                progress !== 1 ? styles.buttonEnabled : styles.buttonDisabled,
              ]}
              onPress={() => showMessage("That was tasty!")}
            >
              <Icon name="fast-food" size={18} color="white" />
              <Text style={styles.buttonText}>Feed</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              disabled={progress === 1}
              style={[
                styles.button,
                progress !== 1 ? styles.buttonEnabled : styles.buttonDisabled,
              ]}
              onPress={() => showMessage("Yuck!")}
            >
              <Icon name="eyedrop-outline" size={18} color="white" />
              <Text style={styles.buttonText}>Medicine</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              disabled={progress === 1}
              style={[
                styles.button,
                progress !== 1 ? styles.buttonEnabled : styles.buttonDisabled,
              ]}
              onPress={() => showMessage("*Wags tail*")}
            >
              <Icon name="hand-left" size={18} color="white" />
              <Text style={styles.buttonText}>Pet</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              disabled={progress === 1}
              style={[
                styles.button,
                progress !== 1 ? styles.buttonEnabled : styles.buttonDisabled,
              ]}
              onPress={() => showMessage("*wet dog shake*")}
            >
              <Icon name="water-outline" size={18} color="white" />
              <Text style={styles.buttonText}>Clean</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf5ff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    color: "#4a148c",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#d1c4e9",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  petContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  }, //
  petModel: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  healthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // width: "90%",
    // paddingHorizontal: 15,
    marginVertical: 30,
  }, //
  healthText: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#d81b60",
    // color: "#4a148c",
    color: "#7b1fa2",
    // marginTop: 20,
    marginEnd: 5,
  },
  // progressBarContainer: {
  //   marginVertical: 15,
  // },
  progressText: {
    color: "#4a148c",
    position: "absolute",
    alignSelf: "center",
    fontWeight: "bold",
    top: 2,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonEnabled: { backgroundColor: "#ba68c8" },
  buttonDisabled: { backgroundColor: "#d1a3e0", opacity: 0.6 }, //
  // buttonProgress: {
  //   backgroundColor: "#ff6b6b",
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   margin: 20,
  //   gap: 10,
  // },
  // disabledButton: {
  //   backgroundColor: "#ff8c8c",
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   margin: 20,
  //   gap: 10,
  // },
  // buttonTextProgress: {
  //   textAlign: "center",
  //   color: "white",
  // }, //
  hatchCountdownText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7b1fa2",
    backgroundColor: "#f3e5f5",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ce93d8",
    textAlign: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  hatchButton: {
    backgroundColor: "#f8bbd0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e91e63",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    marginTop: 20,
  },
  hatchButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#880e4f",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
