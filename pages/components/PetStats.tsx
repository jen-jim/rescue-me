import React, { useContext } from "react";
import { Dimensions, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { PetContext } from "../../contexts/PetContext";
import { styles } from "../StyleSheets/PetStatsStyles";

export default function PetStats() {
  const { petData } = useContext(PetContext);

  const progressStats = [
    { label: "Hunger", value: petData.hunger },
    { label: "Happiness", value: petData.happiness },
    { label: "Energy", value: petData.energy },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{petData.name}</Text>
      </View>
      {progressStats.map((stat, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{stat.label}:</Text>
          <Progress.Bar
            progress={stat.value / 100}
            height={14}
            width={Dimensions.get("window").width * 0.6}
            color="#ff6b6b"
            style={styles.progressBar}
          />
        </View>
      ))}
      <View style={styles.row}>
        <Text style={styles.label}>Cuteness Lvl:</Text>
        <Text style={styles.value}>{petData.cuteness}</Text>
      </View>
    </View>
  );
}
