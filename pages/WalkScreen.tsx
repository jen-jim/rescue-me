import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { mapStyle, styles } from "./StyleSheets/WalkScreenStyles";

export const ArButton = () => {
  const navigation = useNavigation();
  return (
    <Button title="AR View" onPress={() => navigation.navigate("ARWalk")} />
  );
};

export default function WalkScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 53.48187430107343,
            longitude: -2.2408551764254514,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          customMapStyle={mapStyle}
          showsUserLocation
          showsMyLocationButton
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
