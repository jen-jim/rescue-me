import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { PetContext } from "../../contexts/PetContext";
import { InventoryContext } from "../../contexts/InventoryContext";
import { useNavigation } from "@react-navigation/native";
import { FoodInventory } from "../../utils/Local-storage";
import { styles } from "../StyleSheets/ModalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface FoodModalProps {
  visible: boolean;
  onClose: () => void;
  showMessage: (message: string) => void;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  visible,
  onClose,
  showMessage,
}) => {
  const { petData, setPetData } = useContext(PetContext);
  const { inventory, setInventory } = useContext(InventoryContext);
  const navigation = useNavigation();

  const feedFood = async (food: string) => {
    const foodType = food as keyof FoodInventory;

    if (inventory.food[foodType] > 0) {
      let hungerReduction = 100;
      let happinessIncrease = 0;
      let energyIncrease = 0;
      let cutenessIncrease = 0;

      switch (foodType) {
        case "normal":
          happinessIncrease = 20;
          break;
        case "vitalityBoost":
          happinessIncrease = 20;
          energyIncrease = 100;
          break;
        case "happinessBoost":
          happinessIncrease = 100;
          break;
        case "cutenessBoost":
          happinessIncrease = 20;
          cutenessIncrease = 10;
          break;
        case "slowRelease":
          // Implement slow release functionality here
          break;
      }

      const updatedHunger = Math.max(0, petData.hunger - hungerReduction);
      const updatedHappiness = Math.min(
        100,
        petData.happiness + happinessIncrease
      );
      const updatedEnergy = Math.min(100, petData.energy + energyIncrease);
      const updatedCuteness = petData.cuteness + cutenessIncrease;

      const updatedPet = {
        ...petData,
        hunger: updatedHunger,
        happiness: updatedHappiness,
        energy: updatedEnergy,
        cuteness: updatedCuteness,
      };

      setPetData(updatedPet);

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
                name={getFoodIcon(foodType)}
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

const getFoodIcon = (food: string) => {
  const foodType = food as keyof FoodInventory;

  const icons = {
    normal: "bowl-mix",
    vitalityBoost: "flash",
    happinessBoost: "emoticon-happy",
    cutenessBoost: "heart",
    slowRelease: "timer",
  };
  return icons[foodType] || "help-circle";
};
