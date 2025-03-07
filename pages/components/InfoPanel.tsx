import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export function InfoPanel() {
  const slideAnim = useRef(new Animated.Value(250)).current; // Start off-screen on the right
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 250 : 0, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Info Icon - Positioned on the right */}
      {!isOpen && (
        <TouchableOpacity style={styles.infoIcon} onPress={togglePanel}>
          <Icon name="information-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      )}

      {/* Sliding Info Panel */}
      <Animated.View
        style={[styles.infoPanel, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={styles.panelTitle}>Welcome!</Text>
        <Text style={[styles.panelContent, { marginBottom: 5 }]}>
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

        {/* Close Button */}
        <TouchableOpacity onPress={togglePanel} style={styles.closeButton}>
          <Icon name="close" size={24} color="#5a4a42" />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  infoIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#ff6b6b",
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  infoPanel: {
    position: "absolute",
    top: 20, // Appears below the icon
    right: 0, // Slides in from the right
    width: 280,
    //height: 300, // Shorter panel
    // backgroundColor: "#333",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    zIndex: 9,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  panelTitle: {
    // color: "white",
    color: "#5a4a42",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  panelContent: {
    // color: "white",
    color: "#5a4a42",
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
