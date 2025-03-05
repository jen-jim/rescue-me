import React from "react";
import { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { Region } from "../WalkScreen";
import { generateFoodCoords } from "../../utils/generateFoodCoords";

interface FoodMarkersProps {
  center: Region;
  count?: number;
  range?: number;
}

export const FoodMarkers: React.FC<FoodMarkersProps> = ({
  center,
  count = 10,
  range = 0.008,
}) => {
  const foodCoords = [];

  for (let i = 0; i < count; i++) {
    foodCoords.push(generateFoodCoords(center, range));
  }

  return (
    <>
      {foodCoords.map((coords, index) => (
        <Marker
          key={index}
          coordinate={coords}
          title="Food"
          description="Delicious and nutritious"
        >
          <Icon name="fast-food" size={28} color="#FF0000" />
        </Marker>
      ))}
    </>
  );
};
