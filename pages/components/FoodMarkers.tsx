import React from "react";
import { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { Region } from "../WalkScreen";

interface FoodMarkersProps {
  center: Region;
  count?: number;
  range?: number;
}

const generateFoodMarkers = (
  center: Region,
  count: number,
  range: number
): Region[] => {
  const markersArray: Region[] = [];

  for (let i = 0; i < count; i++) {
    const randomLatitude = center.latitude + (Math.random() - 0.5) * range;
    const randomLongitude = center.longitude + (Math.random() - 0.5) * range;

    markersArray.push({
      latitude: randomLatitude,
      longitude: randomLongitude,
      latitudeDelta: center.latitudeDelta,
      longitudeDelta: center.longitudeDelta,
    });
  }

  return markersArray;
};

export const FoodMarkers: React.FC<FoodMarkersProps> = ({
  center,
  count = 10,
  range = 0.008,
}) => {
  const markers = generateFoodMarkers(center, count, range);

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker}
          title="Food"
          description="Delicious and nutritious"
        >
          <Icon name="fast-food" size={28} color="#FF0000" />
        </Marker>
      ))}
    </>
  );
};
