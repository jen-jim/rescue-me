import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IncubationScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>In incubation screen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
