import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Region } from "../WalkScreen";

interface FoodProximityButtonProps {
  userLocation: Region;
  allFoodCoords: Region[];
}

export const FoodProximityButton: React.FC<FoodProximityButtonProps> = ({
  userLocation,
  allFoodCoords,
}) => {
  const navigation = useNavigation();

  const nearFood = allFoodCoords.filter((foodCoords) => {
    const latDiff = Math.abs(userLocation.latitude - foodCoords.latitude);
    const lonDiff = Math.abs(userLocation.longitude - foodCoords.longitude);
    const threshold = 0.002;

    return latDiff < threshold && lonDiff < threshold;
  });

  if (nearFood.length === 0) {
    return null;
  }

  return (
    <Button
      title="View Food in AR"
      onPress={() => navigation.navigate("ARWalk", { foodMarker: nearFood[0] })}
    />
  );
};
