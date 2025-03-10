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
  const { setPetData } = useContext(PetContext);
  const { inventory, setInventory } = useContext(InventoryContext);
  const navigation = useNavigation();

  const feedFood = async (food: keyof FoodInventory) => {
    if (inventory.food[food] > 0) {
      setPetData((prevPetData) => {
        let happinessIncrease = 0;
        let energyIncrease = 0;
        let cutenessIncrease = 0;
        let remainingSlowReleaseTime = prevPetData.remainingSlowReleaseTime;

        switch (food) {
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
            remainingSlowReleaseTime = 60000 * 720; // 12 hours
            break;
        }

        return {
          ...prevPetData,
          hunger: 0,
          happiness: Math.min(100, prevPetData.happiness + happinessIncrease),
          energy: Math.min(100, prevPetData.energy + energyIncrease),
          cuteness: prevPetData.cuteness + cutenessIncrease,
          remainingSlowReleaseTime,
        };
      });

      setInventory((prevInventory) => ({
        ...prevInventory,
        food: {
          ...prevInventory.food,
          [food]: prevInventory.food[food] - 1,
        },
      }));

      showMessage("That was tasty!");
    } else {
      showMessage("Out of that food :(");
    }
    onClose();
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
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Food {<Icon name="food" size={24} />}
          </Text>
          {foodItems.length ? (
            foodItems.map(([foodType, quantity]) => (
              <TouchableOpacity
                key={foodType}
                style={styles.foodButton}
                onPress={() => feedFood(foodType as keyof FoodInventory)}
              >
                <Icon name={getFoodIcon(foodType)} style={styles.label} />
                <Text style={styles.label}>{formatFoodName(foodType)}</Text>
                <Text style={styles.label}>(x{quantity})</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Text style={styles.soldOut}>Out of food :(</Text>
              <TouchableOpacity
                style={[styles.foodButton]}
                onPress={() => {
                  navigation.navigate("Walk");
                }}
              >
                <Text style={styles.label}>Collect food</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={[styles.inventoryButton]}
            onPress={() => {
              () => {
                onClose();
              };
              navigation.navigate("Inventory");
            }}
          >
            <Text style={styles.label}>View inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cancelButton]} onPress={onClose}>
            <Text style={styles.label}>Cancel</Text>
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
