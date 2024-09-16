import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getMonthNameFromDate, getTotalDaysofMonth } from "../../utils/dateHelpers";
import { FlashList } from "@shopify/flash-list";
import lowPriority from "../../assets/icons/lowPriority.png";
import MediumPriority from "../../assets/icons/MediumPriority.png";
import HighPriority from "../../assets/icons/HighPriority.png";
import { useNavigation } from "@react-navigation/native";
import normalize from "../../utils/normalize";

// Define props types
type HorizantalCalenderProps = {
  date: Date;
  tasks: Array<{
    startDate: {
      seconds: number;
      nanoseconds: number;
    };
    taskHeading: string;
    docId: string;
    priority: keyof typeof icons;
    location: string;
  }>;
};

// Define task icon types
const icons = { Low: lowPriority, Medium: MediumPriority, High: HighPriority };

const HorizantalCalender: React.FC<HorizantalCalenderProps> = ({ date, tasks }) => {
  const navigation = useNavigation<any>();
  const [daysOfWeek, setDaysOfWeek] = useState([
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
  ]);

  const [daysTotalOfMonth, setTotalDaysOfMonth] = useState(30);
  const [firstDay, setFirstDay] = useState(date.getDay());

  const dayHasTask = (date: number) => {
    const dayTasks = tasks?.filter((task) => {
      const milliseconds =
        task.startDate.seconds * 1000 + Math.floor(task.startDate.nanoseconds / 1e6);
      const taskDate = new Date(milliseconds);
      return taskDate.getDate() === date;
    });
    return dayTasks?.map((task) => ({
      taskHeading: task.taskHeading,
      taskId: task.docId,
      priority: task.priority,
      location: task.location,
    }));
  };

  const SingleTask: React.FC<{ data: any }> = ({ data }) => {
    const colors: { [key: string]: string } = {
      Low: "#087B47",
      High: "#CC3017",
      Medium: "#005E98",
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeStack", { screen: "TaskDetails", params: { taskId: data?.taskId } })}
        style={[styles.taskContainer, { backgroundColor: colors[data?.priority] }]}
      >
        <View style={{ flexBasis: "20%" }}>
          <Image source={icons[data.priority]} style={styles.taskImg} />
        </View>
        <View style={{ flexBasis: "80%" }}>
          <Text style={styles.taskTitle}>{data.taskHeading}</Text>
          <Text style={styles.locationTitle}>{data.location}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const SingleRow: React.FC<{ item: number }> = ({ item }) => {
    const tempDate = new Date(date.getFullYear(), date.getMonth(), item);
    const tasks = dayHasTask(item);

    return (
      <View style={styles.singleRow}>
        <View style={{ flexBasis: "20%" }}>
          <View style={styles.Day}>
            <Text style={styles.dateTitle}>{item}</Text>
            <Text style={[styles.dateTitle, { opacity: 0.5 }]}>
              {daysOfWeek[tempDate.getDay()]}
            </Text>
          </View>
        </View>
        <View style={{ flexBasis: "80%" }}>
          {tasks?.length > 0 ? (
            tasks.map((task, index) => <SingleTask key={index} data={task} />)
          ) : null}
        </View>
      </View>
    );
  };

  function rearrangeDaysOfWeek(dayIndex: number) {
    if (dayIndex >= 0 && dayIndex < 7) {
      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const rearrangedDays = [...daysOfWeek.slice(dayIndex - 1), ...daysOfWeek.slice(0, dayIndex - 1)];
      setDaysOfWeek(rearrangedDays);
    }
  }

  useEffect(() => {
    setFirstDay(date.getDay());
    rearrangeDaysOfWeek(firstDay);
    setTotalDaysOfMonth(getTotalDaysofMonth(date.getFullYear(), date.getMonth()));
  }, [date, firstDay]);

  return (
    <View style={{ height: 300 }}>
      <FlashList
        nestedScrollEnabled={true}
        data={Array.from({ length: daysTotalOfMonth }, (_, i) => i + 1)}
        estimatedItemSize={200}
        renderItem={({ item }) => <SingleRow item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Day: {
    borderRadius: 4,
    backgroundColor: "#ECECEC",
    display: "flex",
    width: 48,
    height: 48,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dateTitle: {
    color: "#1F0900",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  taskContainer: {
    display: "flex",
    padding: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(64, 48, 42, 0.15)",
  },
  taskImg: {
    height: 40,
    width: 40,
    borderRadius: 16,
    borderColor: "#F4F4F4",
  },
  taskTitle: {
    color: "#FFFEFA",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(11),
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  locationTitle: {
    color: "#FFFEFA",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(8),
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  singleRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(3, 1, 0, 0.08)",
  },
});

export default HorizantalCalender;
