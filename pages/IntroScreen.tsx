import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import { styles } from "./StyleSheets/IntroScreenStyles";

const IntroScreen = ({ navigation }) => {
  const [videoError, setVideoError] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoError = (error) => {
    console.error("Video error:", error);
    setVideoError(error);
  };

  const handleVideoEnd = () => {
    console.log("Video playback ended");
    setVideoEnded(true);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require("./assets/video/intro.mp4")}
        style={styles.video}
        resizeMode="contain"
        repeat={false}
        onError={handleVideoError}
        onEnd={handleVideoEnd}
        controls={false}
        muted={false}
        ignoreSilentSwitch="ignore"
        playInBackground={false}
        playWhenInactive={false}
      />

      {videoError && (
        <Text style={styles.errorText}>
          Error loading video: {videoError.toString()}
        </Text>
      )}

      {videoEnded && (
        <View style={styles.overlay}>
          <View style={styles.bottomContainer}>
            <Text style={styles.title}>Rescue Me</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("NamePet")}
            >
              <Text style={styles.buttonText}>Start Your Journey</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default IntroScreen;