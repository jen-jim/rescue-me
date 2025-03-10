import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { FoodInventory } from "../utils/Local-storage";
import { Button, StyleSheet } from "react-native";
import { Region } from "./WalkScreen";
import { FoodIcon } from "./components/FoodIcon";

type RootStackParamList = {
  CollectFood: {
    foodMarker?: Region;
    foodType: keyof FoodInventory;
  };
};

const CollectFoodSceneAR = (): JSX.Element => {
  const [text, setText] = useState("Initializing AR...");

  const route = useRoute<RouteProp<RootStackParamList, "CollectFood">>();
  const { foodMarker, foodType } = route.params;

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Click food to collect");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  if (foodMarker) {
    return (
      <ViroARScene onTrackingUpdated={onInitialized}>
        <ViroText
          text={text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, -0.2, -1.5]}
          style={styles.text}
        />
        <ViroAmbientLight color={"#aaaaaa"} />
        <Viro3DObject
          source={require("./assets/models/toon_cat_free.glb")}
          type="GLB"
          scale={[0.002, 0.002, 0.002]}
          position={[-0.35, -0.5, -1.5]}
          rotation={[0, 45, 0]}
          animation={{
            name: "Scene",
            run: true,
            loop: true,
            delay: 1000,
          }}
        />
        <FoodIcon foodMarker={foodMarker} foodType={foodType} />
      </ViroARScene>
    );
  } else {
    return (
      <ViroARScene>
        <ViroText
          text="nothing here..."
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.text}
        />
      </ViroARScene>
    );
  }
};

export const MapButton = () => {
  const navigation = useNavigation();
  return (
    <Button title="Map View" onPress={() => navigation.navigate("Walk")} />
  );
};

export default function CollectFoodScreen() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: CollectFoodSceneAR,
      }}
      style={styles.f1}
    />
  );
}

const styles = StyleSheet.create({
  f1: { flex: 1 },
  text: {
    fontFamily: "Arial",
    fontSize: 16,
    color: "#ff6b6b",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
