import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import { PetContext } from "../contexts/PetContext";
import { InventoryContext } from "../contexts/InventoryContext";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import { styles } from "./StyleSheets/TitleScreenStyles";
import { getPetData } from "../utils/Local-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IntroScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { resetPetData } = useContext(PetContext);
  const { resetInventory } = useContext(InventoryContext);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  useEffect(() => {
    async function checkPet() {
      const data = await getPetData();
      if (data?.name) {
        setIsFirstTimeUser(false);
      }
    }
    checkPet();
  }, []);

  const handleDelete = async () => {
    try {
      await AsyncStorage.clear();
      resetPetData();
      resetInventory();
      console.log("data deleted");
    } catch (error) {
      console.log(error);
    }
  };

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

          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Saved Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
