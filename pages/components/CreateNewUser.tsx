import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/AntDesign";

export default function CreateNewUser({ changeStateHandeler }) {
  const [username, onSubmitEditingUsername] = useState("");
  const [password, onSubmitEditingPassword] = useState("");
  const [passwordAgain, onSubmitEditingPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordIncludesSymbol, setPasswordIncludesSymbol] = useState(false);
  const [passwordIncludesNumber, setPasswordIncludesNumber] = useState(false);
  const [passwordIncludesUppercase, setPasswordIncludesUppercase] =
    useState(false);
  const [passwordIncludesLowercase, setPasswordIncludesLowercase] =
    useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const correctIcon = <Icon name="check" size={15} color="green" />;
  const wrongIcon = <Icon name="close" size={15} color="red" />;

  const auth = getAuth();

  const passwordCheck = () => {
    if (
      passwordLength &&
      passwordIncludesLowercase &&
      passwordIncludesNumber &&
      passwordIncludesSymbol &&
      passwordIncludesUppercase &&
      passwordsMatch
    ) {
      return createAccountInFirbase();
    } else {
      return setErrorMessage("somthing is wrong with the password");
    }
  };

  const createAccountInFirbase = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((res) => {
        console.log("User account created & signed in!");
        changeStateHandeler(false);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          return setErrorMessage("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          return setErrorMessage("That email address is invalid!");
        }

        return console.error(error);
      });
  };

  const PasswordChecker = () => {
    useEffect(() => {
      const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
      if (password.length >= 8) {
        setPasswordLength(true);
      } else {
        setPasswordLength(false);
      }
      if (specialChars.test(password)) {
        setPasswordIncludesSymbol(true);
      } else {
        setPasswordIncludesSymbol(false);
      }
      if (/\d/.test(password)) {
        setPasswordIncludesNumber(true);
      } else {
        setPasswordIncludesNumber(false);
      }
      if (/[A-Z]/.test(password)) {
        setPasswordIncludesUppercase(true);
      } else {
        setPasswordIncludesUppercase(false);
      }
      if (/[a-z]/.test(password)) {
        setPasswordIncludesLowercase(true);
      } else {
        setPasswordIncludesLowercase(false);
      }
      if (password === passwordAgain) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }, []);

    const iconSelector = (bool: boolean) => {
      if (bool) {
        return correctIcon;
      } else {
        return wrongIcon;
      }
    };

    return (
      <View style={styles.passwordRequirementsContainer}>
        <Text style={styles.passwordRequirementsText}>
          {iconSelector(passwordLength)} Minum length of 8
        </Text>
        <Text style={styles.passwordRequirementsText}>
          {iconSelector(passwordIncludesSymbol)}Includes Symbol e.g: !,@,$,...
        </Text>
        <Text style={styles.passwordRequirementsText}>
          {iconSelector(passwordIncludesNumber)}Includes at leat one number
        </Text>
        <Text style={styles.passwordRequirementsText}>
          {iconSelector(passwordIncludesUppercase)}Includes at leat one upper
          case character/letter
        </Text>
        <Text style={styles.passwordRequirementsText}>
          {iconSelector(passwordIncludesLowercase)}Includes at leat one lower
          case character/letter
        </Text>
        <Text style={styles.passwordRequirementsText}>
          {iconSelector(passwordsMatch)}Passwords Match
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.loginDetails}>
          <Text style={styles.title}>Create Page</Text>
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
          <TextInput
            style={styles.input}
            onChangeText={(newText) =>
              onSubmitEditingPasswordAgain(String(newText))
            }
            placeholder="Repeat Password"
            defaultValue={passwordAgain}
            secureTextEntry={true}
          />

          <PasswordChecker />
          <Text style={{ color: "red" }}>{errorMessage}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => passwordCheck()}
            >
              <Text style={{ color: "white" }}>Create</Text>
            </TouchableOpacity>
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
    marginTop: 25,
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
    marginTop: 20,
    marginBottom: 25,
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  passwordRequirementsContainer: {
    minWidth: 200,
    minHeight: 50,
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "baseline",
    borderRadius: 20,
    marginTop: 20,
  },
  passwordRequirementsText: {
    color: "black",
    fontSize: 11,
    padding: 2,
  },
});
