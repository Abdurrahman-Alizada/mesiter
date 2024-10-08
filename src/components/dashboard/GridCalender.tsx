import React, { useState, useEffect, useCallback } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import normalize from "../../utils/normalize";
import { getTotalDaysofMonth } from "../../utils/dateHelpers";

const GridCalendar = ({ date, tasks }) => {
  const navigation = useNavigation();
  const [daysOfWeek, setDaysOfWeek] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [daysTotalOfMonth, setTotalDaysOfMonth] = useState(30);
  const [firstDay, setFirstDay] = useState(date.getDay());

  useEffect(() => {
    setFirstDay(date.getDay());
    setTotalDaysOfMonth(getTotalDaysofMonth(date.getFullYear(), date.getMonth()));
    rearrangeDaysOfWeek(firstDay);
  }, [date, firstDay]);

  const rearrangeDaysOfWeek = useCallback((dayIndex) => {
    if (dayIndex >= 0 && dayIndex < 7) {
      const rearrangedDays = [
        ...daysOfWeek.slice(dayIndex),
        ...daysOfWeek.slice(0, dayIndex),
      ];
      setDaysOfWeek(rearrangedDays);
    }
  }, [daysOfWeek]);

  const dayHasTask = useCallback((day) => {
    return tasks
      .filter((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);
        return taskStartDate.getDate() <= day && day <= taskEndDate.getDate();
      })
      .map((task) => ({
        taskHeading: task.taskHeading,
        taskId: task._id, // Corrected to use `_id` from the response
      }));
  }, [tasks]);

  const TaskHeader = ({ title, taskId }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("HomeStack", { screen: "TaskDetails", params: { taskId: taskId } })}
      style={styles.taskHeader}>
      <Text style={styles.taskTitle} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );

  const SingleRow = ({ rowIndex }) => {
    const start = rowIndex * 7;
    const end = Math.min(start + 7, daysTotalOfMonth);
    
    return Array.from({ length: end - start }, (_, index) => {
      const day = start + index + 1;
      const tasksForDay = dayHasTask(day);

      return (
        <View style={styles.dayColumn} key={index}>
          <Text style={styles.dayText}>{day}</Text>
          {tasksForDay.map((task, index) => (
            <TaskHeader key={index} title={task.taskHeading} taskId={task.taskId} />
          ))}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dayColumn}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.calendarBody}>
        {Array.from(
          { length: Math.ceil(daysTotalOfMonth / 7) },
          (_, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              <SingleRow rowIndex={rowIndex} />
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 20,
  },
  dayColumn: {
    flexBasis: "14.2%",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(3, 1, 0, 0.08)",
    alignItems: "center",
  },
  dayText: {
    color: "#40302A",
    fontSize: normalize(10),
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  calendarBody: {
    minHeight: 300,
    flex: 1,
    width: Dimensions.get("window").width - 20,
  },
  row: {
    flexDirection: "row",
  },
  taskHeader: {
    backgroundColor: "#005E98",
    borderRadius: 3,
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  taskTitle: {
    fontSize: normalize(7),
    color: "white",
    fontFamily: "Poppins-Regular",
  },
});

export default GridCalendar;
