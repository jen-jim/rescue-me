import { useNavigation } from "@react-navigation/native";
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroNode,
  ViroCamera,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { Button, StyleSheet } from "react-native";

const WalkSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

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
        source={require("./assets/models/toon_cat_free.glb")}
        type="GLB"
        position={[-0.1, -1, -1]}
        scale={[0.003, 0.003, 0.003]}
        rotation={[0, 45, 0]}
        dragType="FixedToWorld"
        onDrag={() => { }}
        onLoadEnd={(event) => console.log("Available Animations:", event.nativeEvent.animationNames)}
        onError={(error) => console.error("Model load error:", error)}
        animation={{
          name: "Scene",
          run: true,
          loop: true,
          delay: 1000,
        }}
      />

    </ViroARScene>
  );
};

export const MapButton = () => {
  const navigation = useNavigation();
  return (
    <Button title="Map View" onPress={() => navigation.navigate("Walk")} />
  );
};

export default function ArWalkScreen() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: WalkSceneAR,
      }}
      style={styles.f1}
    />
  );
}

var styles = StyleSheet.create({
  f1: { flex: 1 },
  text: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
