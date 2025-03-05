import { useNavigation } from "@react-navigation/native";
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
