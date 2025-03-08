import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#ff6b6b",
  },
  label: {
    color: "white",
    fontSize: 16,
    alignItems: "center",
  },
  soldOut: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    alignSelf: "center",
  },
  foodButton: {
    backgroundColor: "#FF9009",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inventoryButton: {
    backgroundColor: "#ff69b4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
});
