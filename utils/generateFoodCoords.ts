import { Region } from "../pages/WalkScreen";

export const generateFoodCoords = (
  userLocation: Region,
  range: number
): Region => {
  const randomLatitude = userLocation.latitude + (Math.random() - 0.5) * range;
  const randomLongitude =
    userLocation.longitude + (Math.random() - 0.5) * range;

  return {
    latitude: randomLatitude,
    longitude: randomLongitude,
  };
};
