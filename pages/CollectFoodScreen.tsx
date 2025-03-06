import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroImage,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { Region } from "./WalkScreen";

type RootStackParamList = {
  ARWalk: {
    foodMarker?: Region;
  };
};

const CollectFoodSceneAR = (): JSX.Element => {
  const [text, setText] = useState("Initializing AR...");

  const route = useRoute<RouteProp<RootStackParamList, "ARWalk">>();
  const foodMarker = route.params?.foodMarker;

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Click food to collect!");
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
          position={[0, 0, -1]}
          style={styles.text}
        />
        <ViroAmbientLight color={"#aaaaaa"} />
        <Viro3DObject
          source={require("../pages/assets/models/pug/pug_animated.vrx")}
          type="VRX"
          position={[0, -2, -5]}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
          dragType="FixedToWorld"
          onDrag={() => {}}
          animation={{
            name: "Take 001",
            run: true,
            loop: true,
            delay: 1000,
          }}
        />
        <ViroImage
          source={require("../pages/assets/icons/food_icon.png")}
          position={foodMarker ? [0, -0.5, -1] : undefined}
          scale={[0.5, 0.5, 0.5]}
          onClick={() => {
            console.log("Food icon clicked!");
          }}
        />
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

var styles = StyleSheet.create({
  f1: { flex: 1 },
  text: {
    fontFamily: "Arial",
    fontSize: 16,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
