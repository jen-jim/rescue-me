import React from "react";
import { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { Region } from "../WalkScreen";
import { specialFoodData } from "../../utils/foodTypes";

interface FoodMarkerProps {
  specialFood: { coords: Region; data: specialFoodData } | undefined;
}

export const SpecialFoodMarker: React.FC<FoodMarkerProps> = ({
  specialFood,
}) => {
  if (!specialFood) {
    return null;
  }

  return (
    <Marker
      coordinate={specialFood.coords}
      title={specialFood.data.title}
      description={specialFood.data.description}
    >
      <Icon name={specialFood.data.icon} size={32} color="#ff6b6b" />
    </Marker>
  );
};
