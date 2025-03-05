import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  PermissionsAndroid,
  View,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { mapStyle, styles } from "./StyleSheets/WalkScreenStyles";
import Geolocation from "@react-native-community/geolocation";
import { FoodMarkers } from "./components/FoodMarkers";
import { SpecialFoodMarker } from "./components/SpecialFoodMarker";

export type Region = {
  latitude: number;
  longitude: number;
};

export const ArButton = () => {
  const navigation = useNavigation();
  return (
    <Button title="AR View" onPress={() => navigation.navigate("ARWalk")} />
  );
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Please allow access to your location",
        buttonPositive: "OK",
      }
    );
    return granted;
  } catch (error) {
    console.error("Permission error:", error);
    return null;
  }
};

export default function WalkScreen() {
  const [userLocation, setUserLocation] = useState<Region | null>(null);

  useEffect(() => {
    requestLocationPermission().then((status) => {
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({
              latitude,
              longitude,
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          { enableHighAccuracy: true, timeout: 15000 }
        );
      } else {
        console.log("Location permission denied");
      }
    });
  }, []);

  if (!userLocation) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const userRegion = {
    ...userLocation,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={userRegion}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={userLocation}
            title="Test marker"
            description="to test food proximity mechanics"
          />
          <FoodMarkers
            userLocation={userLocation}
            count={10}
            range={userRegion.latitudeDelta}
          />
          <SpecialFoodMarker
            userLocation={userLocation}
            range={userRegion.latitudeDelta}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}
