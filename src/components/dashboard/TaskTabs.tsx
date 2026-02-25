import * as React from "react";
import {
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import CompletedTask from "./CompletedTask";
import InProcessTask from "./InProcessTask";
import PendingTask from "./PendingTask";
import normalize from "../../utils/normalize";

export default function TaskTabs({ tasks }) {
  const { colors } = useTheme();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState(1);

  const filterTasks = (status) => tasks?.filter(task => task?.status === status);

  const renderContent = () => {
    if (routes === 1) {
      return <CompletedTask data={filterTasks('completed')} />;
    } else if (routes === 2) {
      return <CompletedTask data={filterTasks('in-progress')} />;
    } else {
      return <CompletedTask data={filterTasks('pending')} />;
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setRoutes(1)}
          style={[styles.tab, { borderBottomWidth: routes === 1 ? 2 : 0 }]}>
          <Text style={[styles.tabTitle, { opacity: routes === 1 ? 1 : 0.5 }]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRoutes(2)}
          style={[styles.tab, { borderBottomWidth: routes === 2 ? 3 : 0 }]}>
          <Text style={[styles.tabTitle, { opacity: routes === 2 ? 1 : 0.5 }]}>
            In-progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRoutes(3)}
          style={[styles.tab, { borderBottomWidth: routes === 3 ? 2 : 0 }]}>
          <Text style={[styles.tabTitle, { opacity: routes === 3 ? 1 : 0.5 }]}>
            Not started
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>{renderContent()}</View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 12,
    paddingTop: 4,
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 5,
  },
  tab: {
    paddingVertical: 5,
  },
  tabTitle: {
    color: "#1F0900",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
});
