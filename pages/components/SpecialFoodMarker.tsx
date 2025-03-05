import React from "react";
import { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { Region } from "../WalkScreen";
import { generateFoodCoords } from "../../utils/generateFoodCoords";

interface FoodMarkerProps {
  userLocation: Region;
  range?: number;
}

const foodTypes = [
  {
    title: "Vitality Boost Food",
    description: "Increases energy levels",
    icon: "flash",
    color: "#5FD75F",
  },
  {
    title: "Happiness Boost Food",
    description: "Improves your mood",
    icon: "happy",
    color: "#FCD734",
  },
  {
    title: "Cuteness Boost Food",
    description: "Adds an extra dose of cuteness",
    icon: "heart",
    color: "#FF98A9",
  },
  {
    title: "Slow Release Food",
    description: "Provides long-lasting energy",
    icon: "timer",
    color: "#00C3FF",
  },
];

export const SpecialFoodMarker: React.FC<FoodMarkerProps> = ({
  userLocation,
  range = 0.008,
}) => {
  const foodCoords = generateFoodCoords(userLocation, range);
  const foodType = foodTypes[Math.floor(Math.random() * foodTypes.length)];

  return (
    <Marker
      coordinate={foodCoords}
      title={foodType.title}
      description={foodType.description}
    >
      <Icon name={foodType.icon} size={32} color="#FF0000" />
    </Marker>
  );
};
