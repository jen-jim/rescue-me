import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TitleScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.bigBlue}>RESCUE ME</Text>
          {/* returning user logic here */}
          <Text style={styles.welcome}>Welcome to our app</Text>
          <Text style={styles.red}>
            Urgent: you are needed at the labs immediately
          </Text>
          <Button
            title="Click to enter labs"
            onPress={() => navigation.navigate("Intro")}
          />
          <Text style={styles.bigBlue}>OR</Text>
          <ReturningUser navigation={navigation} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  welcome: {
    color: "grey",
  },
  red: {
    color: "red",
    fontStyle: "italic",
  },
});

function ReturningUser({ navigation }) {
  return (
    <>
      <Text style={styles.welcome}>Welcome back</Text>
      {/* notifications */}
      <Text style={styles.red}>
        Urgent: your pet has done cool stuff while you have been away!
      </Text>
      <Button title="View Pet" onPress={() => navigation.navigate("Pet")} />
    </>
  );
}

//accessing local storage:
//isReturningUser &&  <ReturningUser navigation = {navigation}/>
