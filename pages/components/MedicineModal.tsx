import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { PetContext } from "../../contexts/PetContext";
import { InventoryContext } from "../../contexts/InventoryContext";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../StyleSheets/ModalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MedicineInventory } from "../../utils/Local-storage";

interface MedicineModalProps {
  visible: boolean;
  onClose: () => void;
  showMessage: (message: string) => void;
  playVideoForAction: (video: number) => void;
}

export const MedicineModal: React.FC<MedicineModalProps> = ({
  visible,
  onClose,
  showMessage,
  playVideoForAction,
}) => {
  const { setPetData } = useContext(PetContext);
  const { inventory, setInventory } = useContext(InventoryContext);
  const navigation = useNavigation();
  const medicate = require("../assets/video/medicate.mp4");

  const feedMedicine = async (medicine: keyof MedicineInventory) => {
    if (inventory.medicines[medicine] > 0) {
      setPetData((prevPetData) => {
        let growthIncrease = 0;
        let energyIncrease = 0;

        switch (medicine) {
          case "growthBoost":
            growthIncrease = 5;
            break;
          case "sleepAid":
            energyIncrease = 100;
            break;
        }

        return {
          ...prevPetData,
          growth: prevPetData.growth + growthIncrease,
          energy: Math.min(100, prevPetData.energy + energyIncrease),
        };
      });

      setInventory((prevInventory) => ({
        ...prevInventory,
        medicines: {
          ...prevInventory.medicines,
          [medicine]: prevInventory.medicines[medicine] - 1,
        },
      }));

      playVideoForAction(medicate);
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
    } else {
      showMessage("Out of that medicine :(");
    }
    onClose();
  };

  const medicineItems = Object.entries(inventory.medicines).filter(
    ([medicine, quantity]) => quantity > 0 && medicine !== "recoveryBoost"
  );

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
          {medicineItems.length ? (
            medicineItems.map(([medicineType, quantity]) => (
              <TouchableOpacity
                key={medicineType}
                style={styles.medicineButton}
                onPress={() =>
                  feedMedicine(medicineType as keyof MedicineInventory)
                }
              >
                <Icon
                  name={getMedicineIcon(medicineType)}
                  style={styles.label}
                />
                <Text style={styles.label}>
                  {formatMedicineName(medicineType)}
                </Text>
                <Text style={styles.label}>(x{quantity})</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Text style={styles.soldOut}>Out of medicine :(</Text>
              <TouchableOpacity style={[styles.medicineButton]}>
                <Text style={styles.label}>Get medicine</Text>
              </TouchableOpacity>
            </View>
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

const formatMedicineName = (item: string) =>
  item.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const getMedicineIcon = (medicine: string) => {
  const icons: Record<string, string> = {
    recoveryBoost: "bandage",
    growthBoost: "sprout",
    sleepAid: "bed",
  };
  return icons[medicine] || "help-circle";
};
