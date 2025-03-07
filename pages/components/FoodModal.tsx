import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { InventoryContext } from "../../contexts/InventoryContext";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../StyleSheets/ModalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface FoodModalProps {
  visible: boolean;
  onClose: () => void;
  petData: any; // Replace 'any' with your pet data type
  updatePetData: (newData: any) => Promise<void>;
  showMessage: (message: string) => void;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  visible,
  onClose,
  petData,
  updatePetData,
  showMessage,
}) => {
  const { inventory, setInventory } = useContext(InventoryContext);
  const navigation = useNavigation();

  const feedFood = async (foodType: string) => {
    if (inventory.food[foodType] > 0) {
      // Adjust values based on food type. Customize these as needed.
      const hungerReduction = 10;
      const happinessIncrease = foodType === "normal" ? 5 : 10;

      const hungerValue = Math.max(0, petData.hunger - hungerReduction);
      const happinessValue = petData.happiness + happinessIncrease;
      const updatedPet = {
        ...petData,
        hunger: hungerValue,
        happiness: happinessValue,
      };

      // Update pet data
      await updatePetData(updatedPet);

      // Decrement inventory
      setInventory((prevInventory) => ({
        ...prevInventory,
        food: {
          ...prevInventory.food,
          [foodType]: prevInventory.food[foodType] - 1,
        },
      }));

      showMessage("That was tasty!");
    } else {
      showMessage("Out of that food :(");
    }
    onClose(); // Close the modal after feeding
  };

  // Get all food items with quantity > 0
  const foodItems = Object.entries(inventory.food).filter(
    ([, quantity]) => quantity > 0
  );

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>What should I eat?</Text>
          {foodItems.map(([foodType, quantity]) => (
            <TouchableOpacity
              key={foodType}
              style={styles.foodButton}
              onPress={() => feedFood(foodType)}
            >
              <Icon
                name={getItemIcon(foodType)}
                style={styles.foodButtonText}
              />
              <Text style={styles.foodButtonText}>
                {formatFoodName(foodType)}
              </Text>
              <Text style={styles.foodButtonText}>(x{quantity})</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.inventoryButton]}
            onPress={() => {
              navigation.navigate("Inventory");
            }}
          >
            <Text style={styles.foodButtonText}>View inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cancelButton]} onPress={onClose}>
            <Text style={styles.foodButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const formatFoodName = (item: string) =>
  item.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const getItemIcon = (item: string) => {
  const icons = {
    normal: "bowl-mix",
    vitalityBoost: "flash",
    happinessBoost: "emoticon-happy",
    cutenessBoost: "heart",
    slowRelease: "timer",
  };
  return icons[item] || "help-circle";
};
