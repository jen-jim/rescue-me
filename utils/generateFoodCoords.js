export const generateFoodCoords = (center, range) => {
  const randomLatitude = center.latitude + (Math.random() - 0.5) * range;
  const randomLongitude = center.longitude + (Math.random() - 0.5) * range;
  return {
    latitude: randomLatitude,
    longitude: randomLongitude,
    latitudeDelta: center.latitudeDelta,
    longitudeDelta: center.longitudeDelta,
  };
};
