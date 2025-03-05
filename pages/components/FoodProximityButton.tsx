import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Region } from "../WalkScreen";

interface FoodProximityButtonProps {
  userLocation: Region;
  foodMarker: Region;
}

export const FoodProximityButton: React.FC<FoodProximityButtonProps> = ({
  userLocation,
  foodMarker,
}) => {
  const navigation = useNavigation();

  const latDiff = Math.abs(userLocation.latitude - foodMarker.latitude);
  const lonDiff = Math.abs(userLocation.longitude - foodMarker.longitude);
  const threshold = 0.002;

  const isNearMarker = latDiff < threshold && lonDiff < threshold;

  if (!isNearMarker) {
    return null;
  }

  return (
    <Button
      title="View Food in AR"
      onPress={() => navigation.navigate("ARWalk", { foodMarker })}
    />
  );
};
