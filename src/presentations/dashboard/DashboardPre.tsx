import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Box } from "@react-native-material/core";
import TaskTabs from "../../components/dashboard/TaskTabs";
import TaskCalender from "../../components/dashboard/TaskCalender";
import { useSelector } from "react-redux";
import normalize from "../../utils/normalize";
import { useGetAllTasksQuery } from "../../redux/reducers/task/taskThunk";
import DashboardShimmer from "../../components/shimmers/DashboardShimmer";

const DashboardPre = () => {
  //@ts-ignore
  const user = useSelector(state => state?.user?.currentLoginUser);
  //@ts-ignore
  const { data, error, isLoading, isFetching, refetch } = useGetAllTasksQuery();
  return (
    <View style={{ backgroundColor: "#F6F6F6", flex: 1 }}>
      {
        isLoading ? (
          <DashboardShimmer />
        ) : (
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
                }}>
                Welcome Back!
              </Text>
              <Text
                style={{
                  color: "#40302A",
                  fontFamily: "Poppins-regular",
                  lineHeight: 20,
                  letterSpacing: 0.25,
                  fontWeight: "400",
                  fontSize: normalize(12),
                  textTransform: "capitalize",
                }}>
                {user?.fullName}
              </Text>
            </Box>
    
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
              }
              nestedScrollEnabled={true}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 50,
                marginBottom: 45,
              }}>
              <TaskCalender tasks={data?.tasks || []} />
    
              <View style={[styles.card, { marginTop: 10 }]}>
                <TaskTabs tasks={data?.tasks || []} />
              </View>
            </ScrollView>
          </View>
        )
      }

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

export default DashboardPre;
