import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./StyleSheets/NamePetScreenStyles";
import { savePetData } from "../utils/Local-storage";

export default function NamePetScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [petName, setPetName] = useState("");

  const goToPetPage = async () => {
    const newPetData = {
      name: petName,
      happiness: 80,
      hunger: 20,
      lastUpdated: Date.now(),
    };
    await savePetData(newPetData);
    navigation.navigate("Pet");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { top: insets.top + 20 }]}>
        Name Your Pet
      </Text>

      <View style={styles.petBox}>
        <Image
          source={require("./assets/video/placeholder_img.png")}
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
        style={[styles.button, , petName.length < 2 && styles.disabledButton]}
        onPress={goToPetPage}
        disabled={petName.length < 2}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
