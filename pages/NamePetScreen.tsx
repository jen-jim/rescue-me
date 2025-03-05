import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react"
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./StyleSheets/NamePetScreenStyles"

export default function NamePetScreen({ navigation }) {
  const insets = useSafeAreaInsets()
  const [petName, setPetName] = useState("Fluffy")

  const goToPetPage = () => {
    navigation.navigate("Pet")
  }


  return (
    <View style={styles.container}>
      <Text style={[styles.title, { top: insets.top + 20 }]}>Name Your Pet</Text>

      <View style={styles.petBox}>
        <Image source={require("./assets/video/placeholder_img.png")} style={styles.petImage} />
      </View>

      <TextInput
        style={styles.input}
        value={petName}
        editable={false}
      />

      <TouchableOpacity style={styles.button} onPress={goToPetPage}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
