import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Region } from "../WalkScreen";
import { specialFoodData } from "../../utils/foodTypes";

interface FoodProximityButtonProps {
  userLocation: Region;
  allFoodCoords: Region[];
  specialFood?: { coords: Region; data: specialFoodData };
}

export const FoodProximityButton: React.FC<FoodProximityButtonProps> = ({
  userLocation,
  allFoodCoords,
  specialFood,
}) => {
  const navigation = useNavigation();

  const nearFoodArr = allFoodCoords.filter((foodCoords) => {
    const latDiff = Math.abs(userLocation.latitude - foodCoords.latitude);
    const lonDiff = Math.abs(userLocation.longitude - foodCoords.longitude);
    const threshold = 0.001; //set to 0.001 for testing, change to 0.0006 on production

    return latDiff < threshold && lonDiff < threshold;
  });

  if (nearFoodArr.length === 0) {
    return null;
  }

  const nearFood = nearFoodArr[0];
  const isSpecialFood =
    specialFood &&
    nearFood.latitude === specialFood.coords.latitude &&
    nearFood.longitude === specialFood.coords.longitude;

  return (
    <Button
      title="Collect food"
      onPress={() =>
        navigation.navigate("CollectFood", {
          foodMarker: nearFood,
          foodType: isSpecialFood ? specialFood.data.type : "normal",
        })
      }
    />
  );
};
