import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  FoodInventory,
  Inventory,
  InventoryKeys,
  MedicineInventory,
  ToyInventory,
} from "../utils/Local-storage";
import { styles } from "./StyleSheets/InventoryScreenStyles";
import { InfoPanel } from "./components/InfoPanel";

export default function InventoryScreen() {
  const { inventory } = useContext(InventoryContext);

  const inventoryEntries = Object.entries(inventory) as [
    keyof Inventory,
    FoodInventory | MedicineInventory | ToyInventory
  ][];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎒 Inventory 🎒</Text>
      <ScrollView>
        {inventoryEntries.map(([category, items]) => {
          const itemsEntries = Object.entries(items) as [
            InventoryKeys,
            number
          ][];
          return (
            <View key={category} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {getCategoryIcon(category)} {formatCategoryName(category)}
              </Text>
              {itemsEntries.map(([item, quantity]) => (
                <View key={item} style={styles.itemRow}>
                  <Icon name={getItemIcon(item)} size={24} color="#ffcc00" />
                  <Text style={styles.itemText}>{formatItemName(item)}</Text>
                  <Text style={styles.quantity}>x{quantity}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
      <InfoPanel />
    </SafeAreaView>
  );
}

const formatCategoryName = (category: keyof Inventory) =>
  category.charAt(0).toUpperCase() + category.slice(1);
const formatItemName = (item: InventoryKeys) =>
  item.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const getCategoryIcon = (category: keyof Inventory) => {
  const icons = {
    food: "food",
    medicines: "medical-bag",
    toys: "teddy-bear",
  };
  return (
    <Icon name={icons[category] || "help-circle"} size={24} color="#ff69b4" />
  );
};

const getItemIcon = (item: InventoryKeys) => {
  const icons = {
    normal: "bowl-mix",
    vitalityBoost: "flash",
    happinessBoost: "emoticon-happy",
    cutenessBoost: "heart",
    slowRelease: "timer",
    recoveryBoost: "bandage",
    growthBoost: "sprout",
    sleepAid: "bed",
    butterflies: "butterfly",
    catScratcher: "paw",
  };
  return icons[item] || "help-circle";
};
