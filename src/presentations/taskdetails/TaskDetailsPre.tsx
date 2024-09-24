import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import normalize from "../../utils/normalize";
import { Box, Flex } from "@react-native-material/core";
import { Divider } from "react-native-paper";
//@ts-ignore
import HighPriority from "../../assets/icons/HighPriority.png";
import lowPriority from "../../assets/icons/lowPriority.png";
//@ts-ignore
import MediumPriority from "../../assets/icons/MediumPriority.png";
//@ts-ignore
import location from "../../assets/icons/location.png";
import SelectedChip from "../../components/addTask/SelectedChip";
import EmployeeData from "../../components/addTask/dummyEmployes";
import { ImageHolder } from "../../components/addTask/UploadAttachments";
//@ts-ignore
import dSlip from "../../assets/d_slip.png";
//@ts-ignore
import redClock from "../../assets/icons/red-clock.png";
//@ts-ignore
import greenClock from "../../assets/icons/green-clock.png";
//@ts-ignore
import cross from "../../assets/icons/cross.png";
import { FlashList } from "@shopify/flash-list";
import Attendence from "../../components/taskdetails/Attendence";
import bluecircle from "../../assets/icons/bluecircle.png";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { formatDate, formatTime } from "../../utils/dateHelpers";
import AssignTo from "../../components/taskdetails/AssignTo";
import { useGetTaskByIdQuery } from "../../redux/reducers/task/taskThunk";
import ShimmerTaskDetails from "../../components/shimmers/ShimmerTaskDetails";

const ph = 10;
const TaskDetailsPre = () => {
  const [employes, setItems] = useState(EmployeeData);
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState(1);
  const navigation = useNavigation();
  const route: any = useRoute();
  const { data, error, isLoading, isFetching, refetch } = useGetTaskByIdQuery(
    route.params?.taskId,
    { skip: !route?.params?.taskId },
  );
  const [taskData, setTaskData] = useState({});

  console.log("first", data);
  useEffect(() => {
    if (data?.task) {
      setTaskData(data.task);
    }
  }, [data]);

  const icons = {
    low: lowPriority,
    medium: MediumPriority,
    high: HighPriority,
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <ShimmerTaskDetails />
      ) : (
        <View style={[styles.card, { backgroundColor: "#FFFEFA", flex: 1 }]}>
          <Box mt={10} ph={ph}>
            <Text style={[styles.title, { marginLeft: 5 }]}>
              {taskData?.taskHeading}
            </Text>
            <Box mt={10}>
              <Divider style={{ height: 1.2, color: "rgba(3, 1, 0, 0.08)" }} />
            </Box>
          </Box>

          <Box mt={20} ph={0}>
            <View
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: normalize(10),
                padding: 2,
              }}>
              {taskData?.priority && (
                <Image
                  source={icons[taskData?.priority]}
                  resizeMode={"contain"}
                  style={{
                    transform: [{ scale: 1.2 }],
                    borderRadius: 10,
                    height: 50,
                    width: 50,
                  }}
                />
              )}
              <View>
                <Text style={styles.listLable}>Priority</Text>
                <Text style={styles.subLable}>{taskData?.priority}</Text>
              </View>
            </View>
            <Box mt={20}>
              <Divider style={{ height: 1.2, color: "rgba(3, 1, 0, 0.08)" }} />
            </Box>
          </Box>

          <Box mt={10} ph={ph}>
            <View style={{ paddingHorizontal: normalize(5) }}>
              <Text style={styles.descriptionLabel}>Description</Text>
              <Text style={[styles.descriptionDetails, { marginTop: 7 }]}>
                {taskData?.description}
              </Text>
            </View>
            <Box mt={20}>
              <Divider style={{ height: 1.2, color: "rgba(3, 1, 0, 0.08)" }} />
            </Box>
          </Box>

          <Box mt={10} ph={0}>
            <View
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: normalize(10),
                padding: 2,
              }}>
              <Image
                source={location}
                resizeMode={"contain"}
                style={{
                  transform: [{ scale: 1 }],
                  borderRadius: 10,
                  height: 45,
                  width: 45,
                }}
              />
              <View>
                <Text style={styles.listLable}>Location</Text>
                <Text style={[styles.subLable]}>{taskData?.location}</Text>
              </View>
            </View>
            <Box mt={20}>
              <Divider style={{ height: 1.2, color: "rgba(3, 1, 0, 0.08)" }} />
            </Box>
          </Box>

          <Box mt={10} ph={0}>
            <View style={{ paddingHorizontal: normalize(5) }}>
              <Text style={styles.listLable}>Assigned to</Text>
              <View
                style={{
                  marginTop: 10,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}>
                {taskData?.assignTo?.map((item, index) => (
                  <AssignTo key={index} user={item} />
                ))}
              </View>
            </View>
            <Box mt={20}>
              <Divider style={{ height: 1.2, color: "rgba(3, 1, 0, 0.08)" }} />
            </Box>
          </Box>

          <Box mt={10} ph={0}>
            <View style={{ paddingHorizontal: normalize(5) }}>
              <Text style={styles.listLable}>Attachment</Text>
              <View style={[styles.attachmentContainer, { height: 130 }]}>
                <FlashList
                  estimatedItemSize={100}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={taskData?.attachments}
                  ListEmptyComponent={() => <Text>No Attachement added</Text>}
                  renderItem={(item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.pickerHolder,
                          { position: "relative", paddingVertical: 20 },
                        ]}>
                        <Image
                          source={{
                            uri: item?.item,
                          }}
                          resizeMode="contain"
                          style={{ height: 100, width: 100 }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <Box mt={20}>
              <Divider style={{ height: 1.2, color: "rgba(3, 1, 0, 0.08)" }} />
            </Box>
          </Box>

          {/* <Box mt={10} ph={ph}>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Box
                pv={6}
                p={2}
                style={{
                  borderColor: "rgba(3, 1, 0, 0.08)",
                  borderBottomWidth: 1,
                }}>
                <Text style={[styles.dateLabel]}>START DATE</Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={[styles.dateTime, { color: "red" }]}>
                    {formatDate(taskData?.startDate)}
                  </Text>

                  <Text
                    style={[styles.dateTime, { color: "red", marginLeft: 5 }]}>
                    {formatTime(taskData?.startTime)}
                  </Text>
                </View>
              </Box>
              <View
                mt={20}
                style={{
                  borderWidth: 0.9,
                  borderColor: "rgba(3, 1, 0, 0.08)",
                }}></View>
              <Box
                pv={6}
                p={2}
                style={{
                  borderColor: "rgba(3, 1, 0, 0.08)",
                  borderBottomWidth: 1,
                }}>
                <Text style={[styles.dateLabel]}>DUE DATE</Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={[styles.dateTime, { color: "#087B47" }]}>
                    {formatDate(taskData?.endDate)}
                  </Text>
                  <Text
                    style={[
                      styles.dateTime,
                      { color: "#087B47", marginLeft: 5 },
                    ]}>
                    {formatTime(taskData?.endTime)}
                  </Text>
                </View>
              </Box>
            </View>
          </Box> */}

          <View
            style={[
              styles.card,
              {
                padding: 0,
                margin: 2,
                borderRadius: 8,
                backgroundColor: "#F6F6F6",
              },
            ]}>
            <Flex items={"center"} p={1} mt={5} mb={1}>
              <Text
                style={[
                  styles.typo,
                  { fontFamily: "Poppins-Medium", fontSize: normalize(11) },
                ]}>
                Today's working hours
              </Text>
            </Flex>
            <View style={styles.durationContainer}>
              <View style={styles.singleTime}>
                <Image
                  source={greenClock}
                  resizeMode={"contain"}
                  style={{ borderRadius: 10, height: 24, width: 24 }}
                />

                <Text
                  style={[
                    styles.type,
                    { color: "#087B47", opacity: 0.5, marginLeft: 5 },
                  ]}>
                  08:00 PM
                </Text>
              </View>
              <View style={{ alignSelf: "center" }}>
                <Text
                  style={[
                    styles.type,
                    {
                      fontSize: normalize(12),
                      marginTop: -3,
                      color: "#40302A",
                      opacity: 0.5,
                      marginLeft: 5,
                    },
                  ]}>
                  To
                </Text>
              </View>
              <View style={styles.singleTime}>
                <Image
                  source={redClock}
                  resizeMode={"contain"}
                  style={{ borderRadius: 10, height: 24, width: 24 }}
                />

                <Text
                  style={[
                    styles.type,
                    { color: "#CC3017", opacity: 0.5, marginLeft: 5 },
                  ]}>
                  08:00 PM
                </Text>
              </View>
              <View style={styles.singleTime}>
                <TouchableOpacity style={styles.add}>
                  <Text
                    style={[
                      styles.typo,
                      { color: "white", fontSize: normalize(10) },
                    ]}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => setRoutes(1)}
                style={[
                  styles.tab,
                  { backgroundColor: routes === 1 ? "#012547" : "#F4F4F4" },
                ]}>
                <Text
                  style={[
                    styles.tabTitle,
                    {
                      color: routes === 1 ? "#FFFEFA" : "#40302A",
                      opacity: routes === 1 ? 1 : 0.5,
                    },
                  ]}>
                  Chat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRoutes(2)}
                style={[
                  styles.tab,
                  { backgroundColor: routes === 2 ? "#012547" : "#F4F4F4" },
                ]}>
                <Text
                  style={[
                    styles.tabTitle,
                    {
                      color: routes === 2 ? "#FFFEFA" : "#40302A",
                      opacity: routes === 2 ? 1 : 0.5,
                    },
                  ]}>
                  Attendence
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {routes === 1 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Chat" as never, {
                      taskId: route?.params?.taskId,
                    })
                  }
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                  }}>
                  <Text
                    style={[
                      styles.typo,
                      { color: "#005E98", fontSize: normalize(10) },
                    ]}>
                    Click here to load task chat
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 0.7,
                      borderBottomColor: "#005E98",
                      width: 150,
                      mb: 0.2,
                    }}></View>
                  <View
                    style={{
                      borderBottomWidth: 0.7,
                      borderBottomColor: "#005E98",
                      width: 190,
                    }}></View>
                </TouchableOpacity>
              ) : (
                <Attendence />
              )}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
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
  title: {
    color: "#40302A",
    fontSize: normalize(16),
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  typo: {
    color: "#40302A",
    fontSize: normalize(14),
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    lineHeight: 24,
    letterSpacing: 0.15,
  },

  listLable: {
    color: "#40302A",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    marginLeft: 10,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  subLable: {
    marginTop: 4,
    color: "#40302A",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    marginLeft: 10,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  descriptionLabel: {
    marginTop: 2,
    color: "#40302A",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  descriptionDetails: {
    marginTop: 2,
    color: "#40302A",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  attachmentContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  pickerHolder: {
    justifyContent: "center",
    display: "flex",
    height: 100,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 8,

    opacity: 0.8,
  },
  dateLabel: {
    color: "#40302A",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(11),
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  dateTime: {
    fontFamily: "Poppins-Regular",
    fontSize: normalize(11),
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  header: {
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    padding: 8,
    height: 64,
    flexWrap: "wrap",
    paddingTop: 4,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 8,
    borderWidth: 1,
    borderColor: "rgba(3, 1, 0, 0.08)",
    borderRadius: 4,
  },

  tab: {
    paddingVertical: 5,
    height: 48,
    flexBasis: "50%",
    borderRadius: 4,
    paddingLeft: 14,
    paddingTop: 16,
    paddingRight: 14,
    padddingBottom: 16,
    marginTop: 10,
  },
  //
  //   width: Fill (148px)
  // height: Hug (48px)
  // padding: 14px, 16px, 14px, 16px
  // border-radius: 4px
  // gap: 4px
  //

  tabTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  durationContainer: {
    flexDirection: "row",
    marginTop: 4,
    marginHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(3, 1, 0, 0.08)",
    padding: 15,
    justifyContent: "space-around",
  },
  singleTime: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  add: {
    padding: 5,
    backgroundColor: "#012547",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default TaskDetailsPre;
