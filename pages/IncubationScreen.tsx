import { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPetData, savePetData } from "../utils/Local-storage";
import { useFocusEffect } from "@react-navigation/native";
import { formatTimeString } from "../utils/hatchUtils";

export default function PetScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(1));
  const [progress, setProgress] = useState(0);
  const [progressColour, setProgressColour] = useState("red");
  const [disabled, setDisabled] = useState(true);
  const [progressButtonStyle, setProgressButtonStyle] = useState(
    styles.disabledButton
  );
  const [hatchTime, setHatchTime] = useState(0);

  useFocusEffect(
    useCallback(() => {
      //calculate remaining hatch time on screen focus
      getPetData().then(
        (storedPetData = { name: "Fluffy", happiness: 80, hunger: 20 }) => {
          const now = Date.now();
          const beganIncubation = storedPetData.beganIncubation || now;
          const storedHatchTime = storedPetData.hatchTime || 86400000;

          const elapsedHatchTime = now - beganIncubation;
          const remainingHatchTime = 86400000 - elapsedHatchTime;

          setHatchTime(remainingHatchTime);

          if (!storedPetData.beganIncubation) {
            const newPetData = { ...storedPetData, beganIncubation };
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
    setProgress(progress + 0.1);
    if (progress >= 0.9) {
      setProgress(1);
    }
    if (progress >= 0.7) {
      setProgressColour("green");
      setDisabled(false);
    } else if (progress >= 0.15) {
      setProgressColour("orange");
    }
    if (disabled === false) {
      setProgressButtonStyle(styles.buttonProgress);
    }
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
      <Text style={styles.title}>Pet Recovery</Text>
      <View style={styles.petContainer}>
        <View style={styles.petModel}>
          <Text>[Ill pet]</Text>
        </View>

        <View>
          {hatchTime > 0 ? ( // Change > to < to view hatch me button
            <Text style={styles.hatchCountdownText}>
              ⏳ {formatTimeString(hatchTime)} remaining to hatch!
            </Text>
          ) : (
            <TouchableOpacity style={styles.hatchButton} onPress={handleHatch}>
              <Text style={styles.hatchButtonText}>✨ Hatch Me! 🐣 ✨</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={{ color: "black", paddingTop: 25, paddingBottom: 10 }}>
          Health
        </Text>

        <View style={styles.progressBar}>
          <Progress.Bar
            progress={progress}
            color={progressColour}
            width={300}
            height={25}
            borderColor={"pink"}
            borderWidth={2}
          />
          <Text
            style={{
              color: "black",
              position: "absolute",
              alignSelf: "center",
              top: 2,
            }}
          >
            {Math.round(progress * 100)}%
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={progressButtonStyle} disabled={disabled}>
            <Text style={styles.buttonTextProgress}>[progress btn text]</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {message !== "" && (
          <Animated.View style={[styles.speechBubble, { opacity: fadeAnim }]}>
            <Text style={styles.message}>{message}</Text>
          </Animated.View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => showMessage("That was tasty!")}
        >
          <Text style={styles.buttonText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showMessage("Yuck!")}
        >
          <Text style={styles.buttonText}>Medicine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showMessage("*Wags tail*")}
        >
          <Text style={styles.buttonText}>Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showMessage("*wet dog shake*")}
        >
          <Text style={styles.buttonText}>Clean</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingTop: 30,
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  petContainer: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
  },
  progressBar: {},
  petModel: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  speechBubble: {
    position: "absolute",
    bottom: 100,
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
  buttonText: {
    color: "white",
  },
  buttonProgress: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    gap: 10,
  },
  disabledButton: {
    backgroundColor: "#ff8c8c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    gap: 10,
  },
  buttonTextProgress: {
    textAlign: "center",
    color: "white",
  },
  hatchCountdownText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff69b4",
    backgroundColor: "#fff0f5",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ffb6c1",
    textAlign: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  hatchButton: {
    backgroundColor: "#ffccff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ff69b4",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    marginTop: 20,
  },

  hatchButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff1493",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
