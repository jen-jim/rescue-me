import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Video from "react-native-video";
import { styles } from "./StyleSheets/TitleScreenStyles";
import { getPetData } from "../utils/Local-storage";

export default function IntroScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const [isFirstTimeUser, setIsFirstTimeU] = useState(true);

  useEffect(() => {
    async function checkPet() {
      const data = await getPetData();
      if (data) {
        setIsFirstTimeU(false);
      }
    }
    checkPet();
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("./assets/video/puppy_test.mp4")}
        style={styles.video}
        resizeMode="cover"
        repeat
      />

      <Text style={[styles.title, { top: insets.top + 20 }]}>Rescue Me</Text>
      <Text style={[styles.subtitle, { top: insets.top + 60 }]}>Welcome</Text>

      <View style={[styles.overlay, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(isFirstTimeUser ? "Intro" : "Pet")
            }
          >
            <Text style={styles.buttonText}>
              {isFirstTimeUser ? "Start Rescue Mission" : "See Your Pet"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
