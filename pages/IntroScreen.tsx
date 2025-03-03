import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";

export default function IntroScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require("./assets/video/puppy_test.mp4")}
        style={styles.video}
        resizeMode="cover"
        repeat
      />

      <View style={styles.overlay}>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>Rescue Me</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("NamePet")}
          >
            <Text style={styles.buttonText}>Start Your Journey</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "95%",
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});