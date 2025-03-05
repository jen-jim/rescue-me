import React from "react";
import { Marker } from "react-native-maps";
import { Region } from "../WalkScreen";

interface FoodMarkerProps {
  center: Region;
  range?: number;
}

const foodTypes = [
  {
    title: "Vitality Boost Food",
    description: "Increases energy levels",
    color: "#46E646",
  },
  {
    title: "Happiness Boost Food",
    description: "Improves your mood",
    color: "#FCD734",
  },
  {
    title: "Cuteness Boost Food",
    description: "Adds an extra dose of cuteness",
    color: "#CF9FFF",
  },
  {
    title: "Slow Release Food",
    description: "Provides long-lasting energy",
    color: "#00C3FF",
  },
];

const generateFoodMarker = (center: Region, range: number): Region => {
  const randomLatitude = center.latitude + (Math.random() - 0.5) * range;
  const randomLongitude = center.longitude + (Math.random() - 0.5) * range;
  return {
    latitude: randomLatitude,
    longitude: randomLongitude,
    latitudeDelta: center.latitudeDelta,
    longitudeDelta: center.longitudeDelta,
  };
};

export const SpecialFoodMarker: React.FC<FoodMarkerProps> = ({
  center,
  range = 0.008,
}) => {
  const markerCoordinate = generateFoodMarker(center, range);
  const foodType = foodTypes[Math.floor(Math.random() * foodTypes.length)];

  return (
    <Marker
      coordinate={markerCoordinate}
      title={foodType.title}
      description={foodType.description}
      pinColor={foodType.color}
    />
  );
};
