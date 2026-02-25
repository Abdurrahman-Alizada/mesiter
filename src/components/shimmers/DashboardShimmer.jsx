// DashboardShimmer.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { useTheme } from "@react-navigation/native";
import normalize from "../../utils/normalize";

const DashboardShimmer = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Placeholder for the welcome text */}
      <ShimmerPlaceHolder
        style={styles.welcomeText}
        shimmerColors={[colors.background, "#e0e0e0", colors.card]}
      />
      <ShimmerPlaceHolder
        style={styles.userNameText}
        shimmerColors={[colors.background, "#e0e0e0", colors.card]}
      />

        <ShimmerPlaceHolder
          style={styles.calendar}
          shimmerColors={[colors.background, "#e0e0e0", colors.card]}
        />
      {/* Placeholder for task tabs */}
      <ShimmerPlaceHolder
        style={styles.taskTabs}
        shimmerColors={[colors.background, "#e0e0e0", colors.card]}
      />
      <ShimmerPlaceHolder
        style={styles.taskTabs}
        shimmerColors={[colors.background, "#e0e0e0", colors.card]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginTop: normalize(10),
    // backgroundColor:"#fff",
    // backgroundColor:'red',
    backgroundColor: "white",
    shadowColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.5,
    elevation: 20,
    margin: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom: 20,
  },
  container: {
    padding: 20,
    backgroundColor: "#FFF",
    flex: 1,
  },
  welcomeText: {
    width: "60%",
    height: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  userNameText: {
    width: "40%",
    height: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  calendar: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  taskTabs: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default DashboardShimmer;
