import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { InventoryContext } from "../../contexts/InventoryContext";
import { useNavigation } from "@react-navigation/native";
import { FoodInventory } from "../../utils/Local-storage";
import { styles } from "../StyleSheets/ModalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface IncubationFoodModalProps {
  visible: boolean;
  onClose: () => void;
  showMessage: (message: string) => void;
  playVideoForAction: (video: any) => void;
}

export const IncubationFoodModal: React.FC<IncubationFoodModalProps> = ({
  visible,
  onClose,
  showMessage,
  playVideoForAction,
}) => {
  const { inventory, setInventory } = useContext(InventoryContext);
  const navigation = useNavigation();

  const feedFood = async (food: keyof FoodInventory) => {
    const feed = require("../assets/video/feed.mp4");
    setTimeout(() => {
      showMessage("That was tasty!");
    }, 3000);
    playVideoForAction(feed);

    setInventory((prevInventory) => ({
      ...prevInventory,
      food: {
        ...prevInventory.food,
        [food]: prevInventory.food[food] - 1,
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
            Food {<Icon name="food" size={24} />}
          </Text>
          {inventory.food.normal > 0 ? (
            <TouchableOpacity
              style={styles.foodButton}
              onPress={() => feedFood("normal")}
            >
              <Icon name="bowl-mix" style={styles.label} />
              <Text style={styles.label}>Normal</Text>
              <Text style={styles.label}>(x{inventory.food.normal})</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.soldOut}>Out of food :(</Text>
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
