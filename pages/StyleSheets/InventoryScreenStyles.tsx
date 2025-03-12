import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fef5ff",
    backgroundColor: "#f9f4f0",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#ff69b4",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5a4a42",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff69b4",
    flexDirection: "row",
    alignItems: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    // color: "#333",
    color: "#5a4a42",
    fontWeight: "500",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff69b4",
  },
});
