import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function InventoryScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>In inventory screen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
