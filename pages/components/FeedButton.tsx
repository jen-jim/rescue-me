import { useContext } from "react";
import { PetContext } from "../../contexts/PetContext";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../StyleSheets/IncubationScreenStyles";
import Icon from "react-native-vector-icons/Ionicons";

interface FeedButtonProps {
  setFoodModalVisible: (visible: boolean) => void;
  setFeedInfoModalVisible: (visible: boolean) => void;
}

export const FeedButton: React.FC<FeedButtonProps> = ({
  setFoodModalVisible,
  setFeedInfoModalVisible,
}) => {
  const { petData } = useContext(PetContext);

  return (
    <View style={styles.interactionButtonWrapper}>
      <Pressable
        disabled={petData.incubationHealth === 1}
        style={[
          styles.button,
          petData.incubationHealth !== 1
            ? styles.buttonEnabled
            : styles.buttonDisabled,
        ]}
        onPress={() => {
          setFoodModalVisible(true);
        }}
        onLongPress={() => {
          setFeedInfoModalVisible(true);
        }}
      >
        <Icon name="fast-food" size={30} color="white" />
      </Pressable>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setFeedInfoModalVisible(true);
        }}
      >
        <Text style={styles.interactionText}>Feed</Text>
      </TouchableOpacity>
    </View>
  );
};
