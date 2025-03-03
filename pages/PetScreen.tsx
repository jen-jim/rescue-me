import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function PetScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>In pet screen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
