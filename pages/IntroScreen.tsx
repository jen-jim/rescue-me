import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IntroScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>In intro screen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
