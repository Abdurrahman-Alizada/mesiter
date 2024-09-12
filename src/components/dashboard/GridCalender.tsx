import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getMonthNameFromDate, getTotalDaysofMonth } from "../../utils/dateHelpers";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import normalize from "../../utils/normalize";
const GridCalender = ({ date, tasks }) => {
  const navigation = useNavigation();
  const [month, setMonth] = useState(getMonthNameFromDate(new Date()));

  const dayHasTask = (date: number) => {
    const dayTasks = tasks.filter((task) => {
      const milliseconds =
        task.startDate.seconds * 1000 +
        Math.floor(task.startDate.nanoseconds / 1e6);
      const taskDate = new Date(milliseconds);
      return taskDate.getDate() === date;
    });

    return dayTasks.map((task) => ({
      taskHeading: task.taskHeading,
      taskId: task.docId,
    }));
  };

  const [daysOfWeek, setdaysOfWeek] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);

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

  const [daysTotalOfMonth, setTotalDaysOfMonth] = useState(30);

  const [firstDay, setFirstDay] = useState(new Date(2023, 8).getDay());

  const TaskHeader = ({ title, taskId }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskDetails", { taskId: taskId })}
        style={{ backgroundColor: "#005E98", borderRadius: 3, marginTop: 5 }}
      >
        <Text
          style={{
            fontSize: normalize(7),
            color: "white",
            fontFamily: "Poppins-Regular",
            paddingVertical: 2,
            paddingHorizontal: 4,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  //@ts-ignore
  const SingleRow = ({ rowIndex }) => {
    const start = rowIndex * 7;
    const end = start + 7;

    return Array.from({ length: end - start }, (_, index) => start + index).map(
      (item, index) => {
        let value = item + 1;
        const resp = dayHasTask(value);
        if (resp?.length > 0) {
          return value > 31 || value > daysTotalOfMonth ? null : (
            <View
              style={[styles.dayColumn, { paddingVertical: 8 }]}
              key={index}
            >
              <Text style={styles.dayText}>{value}</Text>
              {resp.map((item) => (
                <TaskHeader title={item.taskHeading} taskId={item.taskId} />
              ))}
            </View>
          );
        } else {
          return value > 31 || value > daysTotalOfMonth ? null : (
            <View
              style={[styles.dayColumn, { paddingVertical: 8 }]}
              key={index}
            >
              <Text style={styles.dayText}>{value}</Text>
            </View>
          );
        }
      }
    );
  };

  function rearrangeDaysOfWeek(dayIndex: number) {
    if (dayIndex >= 0 && dayIndex < 7) {
      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      // Rotate the array to start from the specified day index
      const rearrangedDays = [
        ...daysOfWeek.slice(dayIndex - 1),
        ...daysOfWeek.slice(0, dayIndex - 1),
      ];
      return rearrangedDays;
      setdaysOfWeek(rearrangedDays);
    } else {
      return daysOfWeek;
      setdaysOfWeek(daysOfWeek);
    }
  }

  useEffect(() => {
    // Array.from({length:12},(_,i)=>i+1).map((value,i)=>{
    //   console.log("month",i+1,"first day",new Date(date.getFullYear(), (i+1) , 1).getDay(),'total days of week ',getTotalDaysofMonth(date.getFullYear(),i+1))
    // })
    setFirstDay(date.getDay());
    rearrangeDaysOfWeek(firstDay);
    setTotalDaysOfMonth(
      getTotalDaysofMonth(date.getFullYear(), date.getMonth())
    );
  }, [date]);

  return (
    <View style={[styles.container, { marginTop: 20 }]}>
      <View
        style={[
          styles.headerRow,
          { width: Dimensions.get("window").width - 20 },
        ]}
      >
        {daysOfWeek.map((day, index) => (
          <View key={index} style={[styles.dayColumn]}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View
        style={{
          minHeight: 300,
          flex: 1,
          width: Dimensions.get("window").width - 20,
        }}
      >
        {/*//@ts-ignore*/}
        {Array.from(
          { length: Math.floor(daysTotalOfMonth / 7) + 1 },
          (_, i) => i + 1
        ).map((item, index) => {
          return (
            <View style={{ flexDirection: "row" }} key={index}>
              {/*//@ts-ignore*/}
              <SingleRow rowIndex={index} />
            </View>
          );
        })}
      </View>
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
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
  },

  dayColumn: {
    flexBasis: "14.2%",
    paddingVertical: 2,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "rgba(3, 1, 0, 0.08)",
  },

  dayText: {
    color: "#40302A",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(10),
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.4,
  },

  taskheader: {
    padding: 3.158,
    marginTop: 2,
    flexDirection: "column",
    borderRadius: 3.158,
    borderColor: "rgba(64, 48, 42, 0.15)",
    borderWidth: 0.39,
    backgroundColor: "#005E98",
  },

  taskTitle: {
    color: "#FFFEFA",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(6),
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  dateTitle: {
    color: "#1F0900",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(9),
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});

export default GridCalender;
