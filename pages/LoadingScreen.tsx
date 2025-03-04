import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <LottieView
          style={{ flex: 1 }}
          source={require("../assets/Loading.json")}
          autoPlay
          loop
        />
      </View>
      <Text style={styles.text}>Loading Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 100,
  },
  text: {
    fontSize: 20,
  },
  welcome: {
    height: 300,
    aspectRatio: 1,
  },
});
