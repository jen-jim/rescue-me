import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { InventoryContext } from "../../contexts/InventoryContext";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../StyleSheets/ModalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MedicineInventory } from "../../utils/Local-storage";

interface IncubationMedicineModalProps {
  visible: boolean;
  onClose: () => void;
  showMessage: (message: string) => void;
  playVideoForAction: (video: any) => void;
}

export const IncubationMedicineModal: React.FC<
  IncubationMedicineModalProps
> = ({ visible, onClose, showMessage, playVideoForAction }) => {
  const { inventory, setInventory } = useContext(InventoryContext);
  const navigation = useNavigation();

  const feedMedicine = async (medicine: keyof MedicineInventory) => {
    const medicate = require("../assets/video/medicate.mp4");
    showMessage("");
    setTimeout(() => {
      showMessage("Yuck!");
    }, 1700);
    setTimeout(() => {
      showMessage("");
    }, 2700);
    setTimeout(() => {
      showMessage("I feel much better, thanks!");
    }, 4000);
    playVideoForAction(medicate);

    setInventory((prevInventory) => ({
      ...prevInventory,
      medicines: {
        ...prevInventory.medicines,
        [medicine]: prevInventory.medicines[medicine] - 1,
      },
    }));

    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Medicine {<Icon name="medical-bag" size={24} />}
          </Text>
          {inventory.medicines.recoveryBoost > 0 ? (
            <TouchableOpacity
              style={styles.medicineButton}
              onPress={() => feedMedicine("recoveryBoost")}
            >
              <Icon name="bandage" style={styles.label} />
              <Text style={styles.label}>Recovery Boost</Text>
              <Text style={styles.label}>
                (x{inventory.medicines.recoveryBoost})
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.soldOut}>Out of medicine :(</Text>
          )}
          <TouchableOpacity
            style={styles.inventoryButton}
            onPress={() => {
              onClose();
              navigation.navigate("Inventory");
            }}
          >
            <Text style={styles.label}>View Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.label}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
