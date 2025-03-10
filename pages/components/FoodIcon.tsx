import { ViroImage } from "@reactvision/react-viro";
import { FoodInventory } from "../../utils/Local-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { InventoryContext } from "../../contexts/InventoryContext";
import { Region } from "../WalkScreen";

interface FoodIconProps {
  foodMarker: Region;
  foodType: keyof FoodInventory;
}

function addFood(foodInventory: FoodInventory, foodType: keyof FoodInventory) {
  return {
    ...foodInventory,
    [foodType]: foodInventory[foodType] + 1,
  };
}

const foodImages = {
  normal: require("../assets/food-icons/normal_food.png"),
  vitalityBoost: require("../assets/food-icons/vitality_food.png"),
  happinessBoost: require("../assets/food-icons/happy_food.png"),
  cutenessBoost: require("../assets/food-icons/cute_food.png"),
  slowRelease: require("../assets/food-icons/slow_release_food.png"),
};

export const FoodIcon: React.FC<FoodIconProps> = ({ foodMarker, foodType }) => {
  const navigation = useNavigation();
  const { inventory, setInventory } = useContext(InventoryContext);
  const [isCollected, setIsCollected] = useState(false);

  return (
    !isCollected && (
      <ViroImage
        source={foodImages[foodType]}
        position={foodMarker ? [0, -0.5, -1] : undefined}
        scale={[0.2, 0.2, 0.2]}
        onClick={() => {
          console.log(`${foodType} food clicked!`);
          const foodInventory = addFood(inventory.food, foodType);
          setInventory((prevInventory) => ({
            ...prevInventory,
            food: foodInventory,
          }));
          setIsCollected(true);
          navigation.navigate("Walk", { collectedFood: foodMarker });
        }}
      />
    )
  );
};
