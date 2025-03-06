import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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

export default function InventoryScreen() {
  const { inventory } = useContext(InventoryContext);

  const inventoryEntries = Object.entries(inventory) as [
    keyof Inventory,
    FoodInventory | MedicineInventory | ToyInventory
  ][];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎒 Your Inventory</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef5ff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#ff69b4",
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff69b4",
    flexDirection: "row",
    alignItems: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    color: "#333",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff69b4",
  },
});
