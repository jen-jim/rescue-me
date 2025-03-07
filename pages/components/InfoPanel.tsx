import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export function InfoPanel() {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").width * 0.8)
  ).current;
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? Dimensions.get("window").width * 0.8 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <TouchableOpacity style={styles.infoIcon} onPress={togglePanel}>
          <Icon name="information-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      )}

      <Animated.View
        style={[styles.infoPanel, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={styles.panelTitle}>Explore & Learn</Text>
        <Text style={[styles.panelContent, { marginBottom: 15 }]}>
          This app is fully interactive—almost everything can be clicked to
          reveal more details.
        </Text>
        <Text style={styles.panelContent}>
          🖱 Tap on titles to learn more about the page.
        </Text>
        <Text style={styles.panelContent}>
          🔒 Click on disabled buttons to understand why they’re inactive and
          how to enable them.
        </Text>
        <Text style={styles.panelContent}>
          📌 Press on icons, labels, or sections to uncover extra information or
          helpful tips.
        </Text>

        <TouchableOpacity onPress={togglePanel} style={styles.closeButton}>
          <Icon
            name="close"
            size={24}
            //   color="#5a4a42"
            color="white"
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  infoIcon: {
    position: "absolute",
    // top: 40,
    top: 7,
    right: 7,
    // right: 20,
    // backgroundColor: "#ff6b6b",
    // backgroundColor: "#c44f4f",
    backgroundColor: "#e35a5a",
    padding: 5,
    borderRadius: 20,
    zIndex: 10,
  },
  infoPanel: {
    position: "absolute",
    // top: 30,
    top: 0,
    right: 0,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height,
    // backgroundColor: "#333",
    // backgroundColor: "white",
    backgroundColor: "#d65252",
    padding: 30,
    // borderRadius: 10,
    zIndex: 9,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  panelTitle: {
    color: "white",
    // color: "#5a4a42",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  panelContent: {
    color: "white",
    // color: "#5a4a42",
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
