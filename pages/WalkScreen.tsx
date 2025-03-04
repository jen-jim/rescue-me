import { SafeAreaView } from "react-native-safe-area-context";
import { Button, PermissionsAndroid, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { mapStyle, styles } from "./StyleSheets/WalkScreenStyles";
import { useEffect } from "react";

export const ArButton = () => {
  const navigation = useNavigation();
  return (
    <Button title="AR View" onPress={() => navigation.navigate("ARWalk")} />
  );
};

const requestLocationPermission = async () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Geolocation Permission",
      message: "Please allow access to your location",
      buttonPositive: "OK",
    }
  );
};

export default function WalkScreen() {
  useEffect(() => {
    requestLocationPermission()
      .then((status) => {
        console.log(status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: 53.48187430107343,
              longitude: -2.2408551764254514,
            }}
            title={"Northcoders"}
            description={"This is a description of the marker"}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}
