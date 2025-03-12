import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useContext, useState } from "react";
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
import {
  ButterfliesToyModal,
  CatScratcherToyModal,
  CutenessBoostFoodModal,
  FoodCategoryModal,
  GrowthBoostMedicineModal,
  HappinessBoostFoodModal,
  MainInfoModal,
  MedicineCategoryModal,
  NormalFoodModal,
  RecoveryBoostMedicineModal,
  SleepAidMedicineModal,
  SlowReleaseFoodModal,
  ToyCategoryModal,
  VitalityBoostFoodModal,
} from "./components/InventoryInfoModals";

export default function InventoryScreen() {
  const { inventory } = useContext(InventoryContext);

  const [isMainInfoModalVisible, setMainInfoModalVisible] = useState(false);
  const [isFoodCategoryInfoModalVisible, setFoodCategoryInfoModalVisible] =
    useState(false);
  const [
    isMedicineCategoryInfoModalVisible,
    setMedicineCategoryInfoModalVisible,
  ] = useState(false);
  const [isToyCategoryInfoModalVisible, setToyCategoryInfoModalVisible] =
    useState(false);
  const [isNormalFoodInfoModalVisible, setNormalFoodInfoModalVisible] =
    useState(false);
  const [
    isVitalityBoostFoodInfoModalVisible,
    setVitalityBoostFoodInfoModalVisible,
  ] = useState(false);
  const [
    isHappinessBoostFoodInfoModalVisible,
    setHappinessBoostFoodInfoModalVisible,
  ] = useState(false);
  const [
    isCutenessBoostFoodInfoModalVisible,
    setCutenessBoostFoodInfoModalVisible,
  ] = useState(false);
  const [
    isSlowReleaseFoodInfoModalVisible,
    setSlowReleaseFoodInfoModalVisible,
  ] = useState(false);
  const [
    isRecoveryBoostMedicineInfoModalVisible,
    setRecoveryBoostMedicineInfoModalVisible,
  ] = useState(false);
  const [
    isGrowthBoostMedicineInfoModalVisible,
    setGrowthBoostMedicineInfoModalVisible,
  ] = useState(false);
  const [
    isSleepAidMedicineInfoModalVisible,
    setSleepAidMedicineInfoModalVisible,
  ] = useState(false);
  const [isButterfliesToyInfoModalVisible, setButterfliesToyInfoModalVisible] =
    useState(false);
  const [
    isCatScratcherToyInfoModalVisible,
    setCatScratcherToyInfoModalVisible,
  ] = useState(false);

  const inventoryEntries = Object.entries(inventory) as [
    keyof Inventory,
    FoodInventory | MedicineInventory | ToyInventory
  ][];

  function handleTitle() {
    setMainInfoModalVisible(true);
  }

  const setCategoryInfoModalVisible = (category: keyof Inventory) => {
    const setVisible = {
      food: setFoodCategoryInfoModalVisible,
      medicines: setMedicineCategoryInfoModalVisible,
      toys: setToyCategoryInfoModalVisible,
    };
    return setVisible[category];
  };

  const setItemInfoModalVisible = (item: InventoryKeys) => {
    const setVisible = {
      normal: setNormalFoodInfoModalVisible,
      vitalityBoost: setVitalityBoostFoodInfoModalVisible,
      happinessBoost: setHappinessBoostFoodInfoModalVisible,
      cutenessBoost: setCutenessBoostFoodInfoModalVisible,
      slowRelease: setSlowReleaseFoodInfoModalVisible,
      recoveryBoost: setRecoveryBoostMedicineInfoModalVisible,
      growthBoost: setGrowthBoostMedicineInfoModalVisible,
      sleepAid: setSleepAidMedicineInfoModalVisible,
      butterflies: setButterfliesToyInfoModalVisible,
      catScratcher: setCatScratcherToyInfoModalVisible,
    };
    return setVisible[item] || "help-circle";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleTitle}>
        <Text style={styles.title}>🎒 Inventory 🎒</Text>
      </Pressable>
      <ScrollView>
        {inventoryEntries.map(([category, items]) => {
          const itemsEntries = Object.entries(items) as [
            InventoryKeys,
            number
          ][];
          return (
            <View key={category} style={styles.section}>
              <Pressable
                onPress={() => {
                  setCategoryInfoModalVisible(category)(true);
                }}
              >
                <Text style={styles.sectionTitle}>
                  {getCategoryIcon(category)} {formatCategoryName(category)}
                </Text>
              </Pressable>
              {itemsEntries.map(([item, quantity]) => (
                <Pressable
                  key={item}
                  style={styles.itemRow}
                  onPress={() => {
                    setItemInfoModalVisible(item)(true);
                  }}
                >
                  <Icon name={getItemIcon(item)} size={24} color="#ffcc00" />
                  <Text style={styles.itemText}>{formatItemName(item)}</Text>
                  <Text style={styles.quantity}>x{quantity}</Text>
                </Pressable>
              ))}
            </View>
          );
        })}
      </ScrollView>
      <InfoPanel />
      <MainInfoModal
        isMainInfoModalVisible={isMainInfoModalVisible}
        setMainInfoModalVisible={setMainInfoModalVisible}
      />
      <FoodCategoryModal
        isVisible={isFoodCategoryInfoModalVisible}
        setVisible={setFoodCategoryInfoModalVisible}
      />
      <MedicineCategoryModal
        isVisible={isMedicineCategoryInfoModalVisible}
        setVisible={setMedicineCategoryInfoModalVisible}
      />
      <ToyCategoryModal
        isVisible={isToyCategoryInfoModalVisible}
        setVisible={setToyCategoryInfoModalVisible}
      />
      <NormalFoodModal
        isVisible={isNormalFoodInfoModalVisible}
        setVisible={setNormalFoodInfoModalVisible}
      />
      <VitalityBoostFoodModal
        isVisible={isVitalityBoostFoodInfoModalVisible}
        setVisible={setVitalityBoostFoodInfoModalVisible}
      />
      <HappinessBoostFoodModal
        isVisible={isHappinessBoostFoodInfoModalVisible}
        setVisible={setHappinessBoostFoodInfoModalVisible}
      />
      <CutenessBoostFoodModal
        isVisible={isCutenessBoostFoodInfoModalVisible}
        setVisible={setCutenessBoostFoodInfoModalVisible}
      />
      <SlowReleaseFoodModal
        isVisible={isSlowReleaseFoodInfoModalVisible}
        setVisible={setSlowReleaseFoodInfoModalVisible}
      />
      <RecoveryBoostMedicineModal
        isVisible={isRecoveryBoostMedicineInfoModalVisible}
        setVisible={setRecoveryBoostMedicineInfoModalVisible}
      />
      <GrowthBoostMedicineModal
        isVisible={isGrowthBoostMedicineInfoModalVisible}
        setVisible={setGrowthBoostMedicineInfoModalVisible}
      />
      <SleepAidMedicineModal
        isVisible={isSleepAidMedicineInfoModalVisible}
        setVisible={setSleepAidMedicineInfoModalVisible}
      />
      <ButterfliesToyModal
        isVisible={isButterfliesToyInfoModalVisible}
        setVisible={setButterfliesToyInfoModalVisible}
      />
      <CatScratcherToyModal
        isVisible={isCatScratcherToyInfoModalVisible}
        setVisible={setCatScratcherToyInfoModalVisible}
      />
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
