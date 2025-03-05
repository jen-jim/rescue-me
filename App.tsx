import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PetScreen from "./pages/PetScreen";
import TitleScreen from "./pages/TitleScreen";
import IntroScreen from "./pages/IntroScreen";
import IncubationScreen from "./pages/IncubationScreen";
import NamePetScreen from "./pages/NamePetScreen";
import InventoryScreen from "./pages/InventoryScreen";
import CollectFoodScreen from "./pages/CollectFoodScreen";
import WalkScreen, { ArButton, Region } from "./pages/WalkScreen";
import ArWalkScreen, { MapButton } from "./pages/ArWalkScreen";
import TestNavScreen from "./pages/TestNavScreen";
import LoadingScreen from "./pages/LoadingScreen";

export type StackParamList = {
  TestNav: undefined;
  Title: undefined;
  Intro: undefined;
  Incubation: undefined;
  NamePet: undefined;
  Pet: undefined;
  Inventory: undefined;
  CollectFood: undefined;
  Walk: undefined;
  ARWalk: { foodMarker: Region } | undefined;
  Loading: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TestNav">
          <Stack.Screen name="TestNav" component={TestNavScreen} />
          <Stack.Screen
            name="Title"
            component={TitleScreen}
            options={{ title: "Rescue Me" }}
          />
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{ title: "Rescue Me" }}
          />
          <Stack.Screen
            name="Incubation"
            component={IncubationScreen}
            options={{ title: "Rescue Me" }}
          />
          <Stack.Screen
            name="NamePet"
            component={NamePetScreen}
            options={{ title: "Rescue Me" }}
          />
          <Stack.Screen
            name="Pet"
            component={PetScreen}
            options={{ title: "Rescue Me" }}
          />
          <Stack.Screen
            name="Inventory"
            component={InventoryScreen}
            options={{ title: "Rescue Me" }}
          />
          <Stack.Screen
            name="CollectFood"
            component={CollectFoodScreen}
            options={{ title: "Rescue Me" }}
          />
          <Stack.Screen
            name="Walk"
            component={WalkScreen}
            options={{ title: "Rescue Me", headerRight: ArButton }}
          />
          <Stack.Screen
            name="ARWalk"
            component={ArWalkScreen}
            options={{ title: "Rescue Me", headerRight: MapButton }}
          />
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ title: "Loding Screen" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
