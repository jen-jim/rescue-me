import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function NamePetScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>In name pet screen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
