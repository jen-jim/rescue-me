import React, { useState } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroText,
  ViroNode,
} from "@reactvision/react-viro";
import { StyleSheet } from "react-native";

const WalkSceneAR = () => {
  const [userPosition, setUserPosition] = useState([0, 0, -1]);
  const [userRotation, setUserRotation] = useState([0, 0, 0]);

  const onCameraTransformUpdate = (camera) => {
    const { position, rotation } = camera;


    const distance = 1;
    const radianAngle = (rotation[1] * Math.PI) / 180;

    const newX = position[0] - distance * Math.sin(radianAngle);
    const newZ = position[2] - distance * Math.cos(radianAngle);


    setUserPosition([newX, -1, newZ]);

    setUserRotation([rotation[0], rotation[1], rotation[2]]);
  };

  return (
    <ViroARScene onCameraTransformUpdate={onCameraTransformUpdate}>
      <ViroNode position={userPosition} rotation={userRotation}>
        <ViroAmbientLight color={"#aaaaaa"} />
        <Viro3DObject
          source={require("./assets/models/toon_cat_free.glb")}
          type="GLB"
          scale={[0.002, 0.002, 0.002]}
          position={[0, 0, 0]}
          rotation={[0, 180, 0]}
          animation={{
            name: "Scene",
            run: true,
            loop: true,
            delay: 1000,
          }}
        />

      </ViroNode>
    </ViroARScene>
  );
};

export default function ArWalkScreen() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{ scene: WalkSceneAR }}
      style={styles.f1}
    />
  );
}

const styles = StyleSheet.create({
  f1: { flex: 1 },
  text: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
