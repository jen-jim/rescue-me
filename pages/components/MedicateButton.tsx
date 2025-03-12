import { useContext } from "react";
import { PetContext } from "../../contexts/PetContext";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../StyleSheets/IncubationScreenStyles";
import Icon from "react-native-vector-icons/Ionicons";

interface MedicateButtonProps {
  setMedicineModalVisible: (visible: boolean) => void;
  setMedicineInfoModalVisible: (visible: boolean) => void;
}

export const MedicateButton: React.FC<MedicateButtonProps> = ({
  setMedicineModalVisible,
  setMedicineInfoModalVisible,
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
          setMedicineModalVisible(true);
        }}
        onLongPress={() => {
          setMedicineInfoModalVisible(true);
        }}
      >
        <Icon name="medkit" size={24} color="white" />
        <Text style={styles.buttonText}>Medicate</Text>
      </Pressable>
      {/* <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setMedicineInfoModalVisible(true);
        }}
      >
        
      </TouchableOpacity> */}
    </View>
  );
};
