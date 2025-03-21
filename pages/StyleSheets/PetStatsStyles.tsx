import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: 24,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    width: 120,
    color: "#5a4a42",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    flex: 1,
    color: "#5a4a42",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
  },
  progressBar: {
    flex: 1,
    alignSelf: "center",
  },
  progressText: {
    position: "absolute",
    alignSelf: "center",
    color: "#3d3d3d",
    fontSize: 12,
    fontWeight: "bold",
  },
});
