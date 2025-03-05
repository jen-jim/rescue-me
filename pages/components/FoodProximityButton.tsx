import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Region } from "./FoodMarkers";

interface FoodProximityButtonProps {
  userRegion: Region;
  foodMarker: Region;
  threshold?: number;
}

const isWithinDistance = (
  region1: Region,
  region2: Region,
  threshold: number = 0.002
): boolean => {
  const latDiff = Math.abs(region1.latitude - region2.latitude);
  const lonDiff = Math.abs(region1.longitude - region2.longitude);
  return latDiff < threshold && lonDiff < threshold;
};

export const FoodProximityButton: React.FC<FoodProximityButtonProps> = ({
  userRegion,
  foodMarker,
  threshold = 0.002,
}) => {
  const navigation = useNavigation();
  const nearFood = isWithinDistance(userRegion, foodMarker, threshold);

  if (!nearFood) {
    return null;
  }

  return (
    <Button
      title="View Food in AR"
      onPress={() => navigation.navigate("ARWalk", { foodMarker })}
    />
  );
};
