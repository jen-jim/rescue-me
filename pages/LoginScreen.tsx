import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { useState } from "react";
import CreateNewUser from "./components/CreateNewUser";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, onSubmitEditingUsername] = useState("");
  const [password, onSubmitEditingPassword] = useState("");
  const [onNewUserPage, setOnNewUserPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createAccount = () => {
    onSubmitEditingPassword("");
    onSubmitEditingUsername("");
    setOnNewUserPage(true);
  };

  const auth = getAuth();

  const loginWithEmailAndPassword = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((res) => {
        setErrorMessage("Succsefull login");
        return navigation.navigate("Title");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Email or Password are incorrect");
        }
        console.log("====================================");
        console.log(error, "Error Res");
        console.log("====================================");
      });
  };

  /* ===================================================

    **THIS HERE IS AS AN EXAMPLE ON HOW TO LOG OUT**

    **EXAMPLE**

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

    **END OF EXAMPLE**

    **WHEN THE SIGNOUT FUNCTION IS CALLED, THE CURRENT
      USER WILL BE LOGGED OUT, PLEASE NOTE THAT THIS 
      CURRENTLY, TO THE BEST OF MY KNOWLEDGE, DOES 
      NOT EFFECT THE APP IN ANY NOTICABLE WAY**

  ===================================================== */

  const changeStateHandeler = (bool) => {
    return setOnNewUserPage(bool);
  };

  if (onNewUserPage === true) {
    return <CreateNewUser changeStateHandeler={setOnNewUserPage} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.loginDetails}>
          <Text style={styles.title}>Login Page</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => onSubmitEditingUsername(String(newText))}
            placeholder="Username/Email"
            defaultValue={username}
            inputMode="email"
          />
          <TextInput
            style={styles.input}
            onChangeText={(newText) => onSubmitEditingPassword(String(newText))}
            placeholder="Password"
            defaultValue={password}
            secureTextEntry={true}
          />
          <Text style={{ color: "red" }}>{errorMessage}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => loginWithEmailAndPassword()}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
            {/* ===================================
            
              **USED FOR TESTING THE SIGNOUT FUNCTION**

            <TouchableOpacity style={styles.button} onPress={() => signOut()}>
              <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity> 
            
            =================================== */}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => createAccount()}
          >
            <Text style={{ color: "white" }}>Or creaete your own here</Text>
          </TouchableOpacity>
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
