import React from "react";
import { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { Region } from "../WalkScreen";

interface FoodMarkersProps {
  foodCoords: Region[];
}

export const FoodMarkers: React.FC<FoodMarkersProps> = ({ foodCoords }) => {
  return (
    <>
      {foodCoords.map((coords, index) => (
        <Marker
          key={index}
          coordinate={coords}
          title="Food"
          description="Delicious and nutritious"
        >
          <Icon name="fast-food" size={28} color="#ff6b6b" />
        </Marker>
      ))}
    </>
  );
};
