import React, { useContext } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { PetContext } from "../../contexts/PetContext";
import { styles } from "../StyleSheets/PetStatsStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type PetStatsProps = {
  setGrowthInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setHungerInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setHappinessInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setEnergyInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCutenessInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setStaminaInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIntelligenceInfoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function PetStats({
  setGrowthInfoModalVisible,
  setHungerInfoModalVisible,
  setHappinessInfoModalVisible,
  setEnergyInfoModalVisible,
  setCutenessInfoModalVisible,
  setStaminaInfoModalVisible,
  setIntelligenceInfoModalVisible,
}: PetStatsProps) {
  const { petData } = useContext(PetContext);

  const progressStats = [
    {
      label: "Hunger",
      value: petData.hunger,
      setModalVisible: setHungerInfoModalVisible,
    },
    {
      label: "Happiness",
      value: petData.happiness,
      setModalVisible: setHappinessInfoModalVisible,
    },
    {
      label: "Energy",
      value: petData.energy,
      setModalVisible: setEnergyInfoModalVisible,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{petData.name}</Text>
      </View>
      <Pressable
        style={styles.row}
        onPress={() => {
          setGrowthInfoModalVisible(true);
        }}
      >
        <Text style={styles.label}>Growth:</Text>
        <Text style={styles.value}>{petData.growth}</Text>
      </Pressable>
      <Pressable
        style={styles.row}
        onPress={() => {
          setStaminaInfoModalVisible(true);
        }}
      >
        <Text style={styles.label}>Stamina:</Text>
        <Text style={styles.value}>{petData.cuteness}</Text>
        {/* add stamina to petData and some logic for stamina to increase based on activity levels */}
      </Pressable>
      <Pressable
        style={styles.row}
        onPress={() => {
          setIntelligenceInfoModalVisible(true);
        }}
      >
        <Text style={styles.label}>Intelligence:</Text>
        <Text style={styles.value}>{petData.intelligence}</Text>
      </Pressable>
      <Pressable
        style={styles.row}
        onPress={() => {
          setCutenessInfoModalVisible(true);
        }}
      >
        <Text style={styles.label}>Cuteness:</Text>
        <Text style={styles.value}>{petData.cuteness}</Text>
      </Pressable>
      {progressStats.map((stat, index) => (
        <Pressable
          key={index}
          style={styles.row}
          onPress={() => {
            stat.setModalVisible(true);
          }}
        >
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
        </Pressable>
      ))}
    </View>
  );
}
