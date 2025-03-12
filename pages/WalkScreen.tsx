import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PermissionsAndroid,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { mapStyle, styles } from "./StyleSheets/WalkScreenStyles";
import Geolocation from "@react-native-community/geolocation";
import { FoodMarkers } from "./components/FoodMarkers";
import { SpecialFoodMarker } from "./components/SpecialFoodMarker";
import { generateFoodCoords } from "../utils/generateFoodCoords";
import { FoodProximityButton } from "./components/FoodProximityButton";
import { foodTypes } from "../utils/foodTypes";
import { calculateDistance } from "../utils/calculateDistance";
import { PetContext } from "../contexts/PetContext";

export type Region = {
  latitude: number;
  longitude: number;
};

export const ArButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("ARWalk")}
    >
      <Text style={styles.buttonText}>AR View</Text>
    </TouchableOpacity>
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
  const { petData, setPetData, updateDistance } = useContext(PetContext);
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [prevLocation, setPrevLocation] = useState<Region | null>(null);

  const route = useRoute();

  useEffect(() => {
    requestLocationPermission().then((status) => {
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const initialCoords = { latitude, longitude };
            setUserLocation(initialCoords);
            setPrevLocation(initialCoords);
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          { enableHighAccuracy: true, timeout: 15000 }
        );

        // const testVitality = {
        //   coords: { latitude: 51.497791, longitude: -0.048095 },
        //   data: {
        //     type: "vitalityBoost",
        //     title: "Vitality Boost Food",
        //     description: "Increases energy levels",
        //     icon: "flash",
        //   },
        // };
        // const testHappiness = {
        //   coords: { latitude: 51.50198, longitude: -0.042994 },
        //   data: {
        //     type: "happinessBoost",
        //     title: "Happiness Boost Food",
        //     description: "Improves your mood",
        //     icon: "happy",
        //   },
        // };
        // const testCuteness = {
        //   coords: { latitude: 51.501918, longitude: -0.04656 },
        //   data: {
        //     type: "cutenessBoost",
        //     title: "Cuteness Boost Food",
        //     description: "Adds an extra dose of cuteness",
        //     icon: "heart",
        //   },
        // };
        // const testSlowRelease = {
        //   coords: { latitude: 51.501106, longitude: -0.040454 },
        //   data: {
        //     type: "slowRelease",
        //     title: "Slow Release Food",
        //     description: "Provides long-lasting energy",
        //     icon: "timer",
        //   },
        // };

        // const testFoodCoords = [
        //   { latitude: 51.498465, longitude: -0.047416 },
        //   { latitude: 51.499326, longitude: -0.046344 },
        //   { latitude: 51.500694, longitude: -0.044825 },
        //   { latitude: 51.496956, longitude: -0.049466 },
        //   { latitude: 51.497256, longitude: -0.04564 },
        //   { latitude: 51.499346, longitude: -0.044124 },
        //   { latitude: 51.500317, longitude: -0.049594 },
        //   { latitude: 51.501913, longitude: -0.048885 },
        //   { latitude: 51.500511, longitude: -0.046986 },
        //   { latitude: 51.496435, longitude: -0.047496 },
        // ];
        // const testSpecialFood = testCuteness;

        // setFoodCoords(testFoodCoords);
        // setSpecialFood(testSpecialFood);
      } else {
        console.log("Location permission denied");
      }
    });
  }, []);

  const todayIndex = new Date().getDay() - 1; // Monday is 0, Sunday is 6
  const todaysDistance = petData.weeklyDistance[todayIndex] || 0;

  useEffect(() => {
    let watchId: number | null = null;
    if (userLocation) {
      watchId = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos = { latitude, longitude };
          if (prevLocation) {
            const distance = calculateDistance(prevLocation, newPos);
            updateDistance(distance);
          }
          setPrevLocation(newPos);
          setUserLocation(newPos);
        },
        (error) => console.error("Error watching position", error),
        { enableHighAccuracy: true, distanceFilter: 1 }
      );
    }
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [userLocation, prevLocation, updateDistance]);

  const deltas = {
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  };

  useEffect(() => {
    if (userLocation) {
      const today = new Date().toDateString();
      if (
        petData.lastFoodMarkerDate !== today ||
        petData.foodMarkers.length === 0
      ) {
        const numOfFoodMarkers = 10;
        const newFoodMarkers: Region[] = [userLocation];
        for (let i = 0; i < numOfFoodMarkers; i++) {
          newFoodMarkers.push(
            generateFoodCoords(userLocation, deltas.latitudeDelta)
          );
        }
        const specialFoodType =
          foodTypes[Math.floor(Math.random() * foodTypes.length)];
        const newSpecialFood = {
          coords: generateFoodCoords(userLocation, deltas.latitudeDelta),
          data: specialFoodType,
        };
        setPetData((prev) => ({
          ...prev,
          foodMarkers: newFoodMarkers,
          specialFood: newSpecialFood,
          lastFoodMarkerDate: today,
        }));
      }
    }
  }, [
    userLocation,
    petData.lastFoodMarkerDate,
    petData.foodMarkers.length,
    setPetData,
    deltas.latitudeDelta,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      if ((route.params as any)?.collectedFood) {
        const collectedFood: Region = (route.params as any).collectedFood;
        setPetData((prevPetData) => ({
          ...prevPetData,
          foodMarkers: prevPetData.foodMarkers.filter(
            (marker) =>
              marker.latitude !== collectedFood.latitude ||
              marker.longitude !== collectedFood.longitude
          ),
        }));
        // setFoodCoords((prev) =>
        //   prev.filter(
        //     (marker) =>
        //       marker.latitude !== collectedFood.latitude ||
        //       marker.longitude !== collectedFood.longitude
        //   )
        // );
        if (
          petData.specialFood?.coords &&
          petData.specialFood.coords.latitude === collectedFood.latitude &&
          petData.specialFood.coords.longitude === collectedFood.longitude
        ) {
          setPetData((prevPetData) => ({
            ...prevPetData,
            specialFood: undefined,
          }));
          // setSpecialFood(undefined);
        }
        navigation.setParams({ collectedFood: undefined });
      }
    }, [navigation, petData.specialFood?.coords, route.params, setPetData])
  );

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
    ...deltas,
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
          <FoodMarkers foodCoords={petData.foodMarkers} />
          <SpecialFoodMarker specialFood={petData.specialFood} />
        </MapView>
        <View style={styles.buttonContainer}>
          <FoodProximityButton
            userLocation={userLocation}
            allFoodCoords={[
              ...(petData.specialFood ? [petData.specialFood.coords] : []),
              ...petData.foodMarkers,
            ]}
            specialFood={petData.specialFood}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Distance Walked Today: {Math.round(todaysDistance)}m
        </Text>
      </View>
    </SafeAreaView>
  );
}
