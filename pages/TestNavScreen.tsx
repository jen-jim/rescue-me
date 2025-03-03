import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TestNavScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text style={{ fontSize: 24 }}>Nav</Text>
          <Button title="Title" onPress={() => navigation.navigate("Title")} />
          <Button title="Intro" onPress={() => navigation.navigate("Intro")} />
          <Button
            title="Incubation"
            onPress={() => navigation.navigate("Incubation")}
          />
          <Button
            title="NamePet"
            onPress={() => navigation.navigate("NamePet")}
          />
          <Button title="Pet" onPress={() => navigation.navigate("Pet")} />
          <Button
            title="Inventory"
            onPress={() => navigation.navigate("Inventory")}
          />
          <Button
            title="CollectFood"
            onPress={() => navigation.navigate("CollectFood")}
          />
          <Button title="Walk" onPress={() => navigation.navigate("Walk")} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
