import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { PetContext } from "../../contexts/PetContext";

export default function ActivityLog() {
  const { petData } = useContext(PetContext);
  const weeklyData = petData.weeklyDistance || Array(7).fill(0);
  const totalDistance = petData.totalDistanceWalked || 0;

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ data: weeklyData }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255,107,107, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const screenWidth = Dimensions.get("window").width * 0.9;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Log</Text>
      <Text style={styles.text}>Weekly Distance Walked</Text>
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        yAxisSuffix="m"
      />
      <Text style={styles.text}>
        Total Distance Walked: {Math.round(totalDistance)} m
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6b6b",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
    alignSelf: "center",
  },
  text: {
    width: "100%",
    textAlign: "left",
    paddingHorizontal: 30,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    color: "#5a4a42",
  },
});
