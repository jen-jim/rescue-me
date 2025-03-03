import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PetScreen from "./pages/PetScreen";
import TitleScreen from "./pages/TitleScreen";
import IntroScreen from "./pages/IntroScreen";
import IncubationScreen from "./pages/IncubationScreen";
import NamePetScreen from "./pages/NamePetScreen";
import InventoryScreen from "./pages/InventoryScreen";
import CollectFoodScreen from "./pages/CollectFoodScreen";
import WalkScreen from "./pages/WalkScreen";
import TestNavScreen from "./pages/TestNavScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TestNav">
        <Stack.Screen name="TestNav" component={TestNavScreen} />
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Incubation" component={IncubationScreen} />
        <Stack.Screen name="NamePet" component={NamePetScreen} />
        <Stack.Screen name="Pet" component={PetScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="CollectFood" component={CollectFoodScreen} />
        <Stack.Screen name="Walk" component={WalkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
