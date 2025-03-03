import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CollectFoodScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>In collect food screen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
