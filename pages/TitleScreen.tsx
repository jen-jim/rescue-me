import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TitleScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>In title screen</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
