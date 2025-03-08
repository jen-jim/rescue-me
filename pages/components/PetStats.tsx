import React, { useContext } from "react";
import { Dimensions, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { PetContext } from "../../contexts/PetContext";
import { styles } from "../StyleSheets/PetStatsStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
      <View style={styles.row}>
        <Text style={styles.label}>Growth:</Text>
        <Text style={styles.value}>{petData.growth}</Text>
      </View>
      {progressStats.map((stat, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{stat.label}:</Text>
          <View style={styles.progressBar}>
            <Progress.Bar
              progress={stat.value / 100}
              height={16}
              width={Dimensions.get("window").width * 0.56}
              color="#ff6b6b"
            />
            {stat.label === "Hunger" && petData.remainingSlowReleaseTime > 0 ? (
              <Icon
                name="timer"
                style={{ ...styles.progressText, paddingTop: 3 }}
              />
            ) : (
              <Text style={styles.progressText}>{stat.value}</Text>
            )}
          </View>
        </View>
      ))}
      <View style={styles.row}>
        <Text style={styles.label}>Cuteness Lvl:</Text>
        <Text style={styles.value}>{petData.cuteness}</Text>
      </View>
    </View>
  );
}
