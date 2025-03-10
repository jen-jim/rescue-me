import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useContext, useState } from "react";
import { PetContext } from "../contexts/PetContext";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./StyleSheets/NamePetScreenStyles";

export default function NamePetScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { petData, setPetData } = useContext(PetContext);
  const [petName, setPetName] = useState("");

  const goToPetPage = async () => {
    setPetData({
      ...petData,
      name: petName,
    });
    navigation.navigate("Pet");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { top: insets.top + 20 }]}>
        Name Your Pet
      </Text>

      <View style={styles.petBox}>
        <Image
          source={require("./assets/images/kitten_sad.png")}
          style={styles.petImage}
        />
      </View>

      <TextInput
        style={styles.input}
        value={petName}
        onChangeText={setPetName}
        placeholder="Name your new Friend"
      />

      <TouchableOpacity
        style={[styles.button, petName.length < 2 && styles.disabledButton]}
        onPress={goToPetPage}
        disabled={petName.length < 2}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
