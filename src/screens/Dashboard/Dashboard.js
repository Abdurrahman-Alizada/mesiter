import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Box } from "@react-native-material/core";
import normalize from "../../utils/normalize";
import TaskTabs from "../../components/dashboard/TaskTabs";
import TaskCalender from "../../components/dashboard/TaskCalender";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state?.user);

  return (
    <View style={{ backgroundColor: "#F6F6F6", flex: 1 }}>
      <Box ph={10} mt={10}>
        <Text
          style={{
            color: "#1F0900",
            fontFamily: "Poppins-SemiBold",
            lineHeight: 24,
            letterSpacing: 1,
            fontWeight: "600",
            fontSize: normalize(15),
          }}
        >
          Welcome Back!
        </Text>
        <Text
          style={{
            color: "#1F0900",
            fontFamily: "Poppins-regular",
            lineHeight: 20,
            letterSpacing: 0.25,
            fontWeight: "400",
            fontSize: normalize(13),
            textTransform: "capitalize",
          }}
        >
          {user?.user?.name}
        </Text>
      </Box>

      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 50,
          marginBottom: 45,
        }}
      >
        <TaskCalender />

        <View style={[styles.card, { marginTop: 10 }]}>
          <TaskTabs />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: normalize(10),
    // backgroundColor:'red',
    backgroundColor: "white",
    shadowColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.5,
    elevation: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom: 20,
  },
});

export default Dashboard;
