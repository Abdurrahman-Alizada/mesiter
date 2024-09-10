import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

//@ts-ignore
import redCalender from "@assets/icons/calendar2.png";
//@ts-ignore
import search from "@assets/icons/search.png";
//@ts-ignore
import grid from "@assets/icons/grid.png";
//@ts-ignore
import Bluegrid from "@assets/icons/blue-grid.png";
import { getMonthNameFromDate, getTotalDaysofMonth } from "@utils/dateHelpers";
import DatePicker from "react-native-date-picker";
import GridCalender from "@components/dashboard/GridCalender";
import HorizantalCalender from "@components/dashboard/HorizantalCalender";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useFocusEffect } from "@react-navigation/native";
import { CollectionConstant } from "app/firebase/CollectionsConstant";
import firestore from "@react-native-firebase/firestore";
import normalize from "../../utils/normalize";

const TaskCalender = () => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(getMonthNameFromDate(new Date()));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchTasks = async () => {
        try {
          const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          const endOfMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0,
            23,
            59,
            59
          );

          const querySnapshot = await firestore()
            .collection(CollectionConstant.tasks)
            .where("startTime", ">=", startOfMonth)
            .where("startTime", "<=", endOfMonth)
            .get();

          const temp = [];
          querySnapshot.forEach((documentSnapshot) => {
            temp.push({
              ...documentSnapshot.data(),
              docId: documentSnapshot.id,
            });
          });
          // console.log("temp", temp);
          setTasks([...temp]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchTasks();
    }, [date])
  );

  const [isGrid, setIsGrid] = useState(true);

  return (
    <View style={[styles.card, { minHeight: 400 }]}>
      <View style={styles.header}>
        <Image
          source={search}
          style={{ height: 24, width: 24, marginLeft: 10 }}
          resizeMode={"contain"}
        />
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{ flexDirection: "row" }}
        >
          <Text style={styles.monthTitle}>
            {months[date.getMonth()]} {date.getFullYear()}
          </Text>
          <Image
            source={redCalender}
            style={{ height: 16, width: 16, marginLeft: 10, marginTop: 2 }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsGrid(!isGrid)}
          style={isGrid && styles.isGrid}
        >
          {!isGrid ? (
            <Image
              source={grid}
              style={{ height: 24, width: 24 }}
              resizeMode={"contain"}
            />
          ) : (
            <Image
              source={Bluegrid}
              style={{ height: 24, width: 24 }}
              resizeMode={"contain"}
            />
          )}
        </TouchableOpacity>
      </View>

      {isGrid ? (
        <GridCalender date={date} tasks={tasks} />
      ) : (
        <HorizantalCalender date={date} tasks={tasks} />
      )}

      <DatePicker
        maximumDate={new Date()}
        modal
        mode={"date"}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
  header: {
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "space-between",
  },
  monthTitle: {
    color: "#1F0900",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  isGrid: {
    marginTop: -10,
    backgroundColor: "rgba(0, 94, 152, 0.20)",
    height: 40,
    width: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default TaskCalender;
