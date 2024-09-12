import React from "react";
import { Image, StyleSheet, Switch, Text, View } from "react-native";

//@ts-ignore
import oneWeekcalender from "../../assets/icons/one-week-calender.png";
// @ts-ignore
import twoWeekcalender from "../../assets/icons/two-week-calender.png";
// @ts-ignore
import sun from "../../assets/icons/sun.png";
import { Divider } from "react-native-paper";
import { Box } from "@react-native-material/core";
import normalize from "../../utils/normalize";
interface Types {
  iconName: string;
  title: string;
  description?: string;
  formikProps: any;
  formiKey: string;
}

const iconsList = { oneWeekcalender, twoWeekcalender, sun };
const Switcher: React.FC<Types> = ({
  formikProps,
  formiKey = false,
  iconName = "oneWeekcalender",
  title = "14 Days Schedule",
  description = "Scheduled task that will last all day",
  ...rest
}) => {
  return (
    <View
      style={{
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
      }}
    >
      {/*//@ts-ignore*/}
      <Image
        source={iconsList[iconName]}
        resizeMode={"contain"}
        style={{
          opacity: formikProps.values[formiKey] ? 1 : 0.5,
          transform: [{ scale: 1.2 }],
          borderRadius: 50,
          height: 30,
          width: 30,
        }}
      />
      <View>
        <Text
          style={[
            styles.listLable,
            { opacity: formikProps.values[formiKey] ? 1 : 0.5 },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.roleLable,
            { opacity: formikProps.values[formiKey] ? 1 : 0.5 },
          ]}
        >
          {description}
        </Text>
      </View>
      <Box ml={20}>
        <Switch
          trackColor={{ false: "rgba(3, 1, 0, 0.08)", true: "#005E98" }}
          thumbColor={formikProps.values[formiKey] ? "#FFFEFA" : "#FFFEFA"}
          ios_backgroundColor="#3e3e3e"
          value={formikProps.values[formiKey]}
          onValueChange={(value) =>
            formikProps.setFieldValue(formiKey, !formikProps.values[formiKey])
          }
        />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  listLable: {
    color: "#012547",
    opacity: 1,
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    marginLeft: 20,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  roleLable: {
    color: "grey",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(9),
    marginLeft: 20,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});

export default Switcher;
