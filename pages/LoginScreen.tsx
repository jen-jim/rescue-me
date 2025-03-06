import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { Dimensions } from "react-native";

export default function LoginScreen() {
  const [username, onSubmitEditingUsername] = useState("");
  const [password, onSubmitEditingPassword] = useState("");

  const createAccountInFirbase = () => {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then((res) => {
        console.log("User account created & signed in!");
        console.log("====================================");
        console.log(res, "Created Res");
        console.log("====================================");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

  const loginWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then((res) => {
        console.log("====================================");
        console.log(res, "Login Res");
        console.log("====================================");
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error, "Error Res");
        console.log("====================================");
      });
  };

  /* ===================================================

    **THIS IS HERE AS AN EXAMPLE ON HOW TO LOG OUT**

    **EXAMPLE**

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

    **END OF EXAMPLE**

  ===================================================== */

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.loginDetails}>
          <Text style={styles.title}>Login Page</Text>
          <TextInput
            style={styles.input}
            onSubmitEditing={(newText) => onSubmitEditingUsername(newText)}
            placeholder="Username/Email"
            defaultValue={username}
            inputMode="email"
          />
          <TextInput
            style={styles.input}
            onSubmitEditing={(newText) => onSubmitEditingPassword(newText)}
            placeholder="Password"
            defaultValue={password}
            secureTextEntry={true}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => createAccountInFirbase()}
            >
              <Text style={{ color: "white" }}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => loginWithEmailAndPassword()}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={() => signOut()}>
              <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  loginDetails: {
    minWidth: 250,
    minHeight: 300,
    width: Dimensions.get("window").width * 0.65,
    height: Dimensions.get("window").height * 0.7,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 20,
    marginTop: 75,
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
  input: {
    backgroundColor: "grey",
    minHeight: 25,
    minWidth: 200,
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.05,
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    paddingBottom: 50,
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
