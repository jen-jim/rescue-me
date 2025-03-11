import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroNode,
} from "@reactvision/react-viro";
import { styles } from "./StyleSheets/WalkScreenStyles";

export const MapButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Walk")}
    >
      <Text style={styles.buttonText}>Map View</Text>
    </TouchableOpacity>
  );
};

const WalkSceneAR = () => {
  const [userPosition, setUserPosition] = useState<[number, number, number]>([
    0, 0, -1,
  ]);
  const [userRotation, setUserRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  const onCameraTransformUpdate = (camera: any) => {
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
            delay: 10,
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
    />
  );
}
