import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//@ts-ignore
import bell from "../../assets/icons/bell.png";
// @ts-ignore
import clock from "../../assets/icons/clock.png";
// @ts-ignore
import rightIcon from "../../assets/icons/chevron-right.png";
// @ts-ignore
import { Divider } from "react-native-paper";
import { Box } from "@react-native-material/core";
import DatePicker from "react-native-date-picker";
import { getDateByFormated, getHourFromDate } from "../../utils/dateHelpers";
import normalize from "../../utils/normalize";
interface Types {
  iconName: string;
  title: string;
  description?: string;
  isDate: boolean;
  formikProps: any;
  formiKey: string;
}

const iconsList = { bell, clock };
const RemainderDrop: React.FC<Types> = ({
  formiKey,
  formikProps,
  date = new Date(),
  setDate,
  isDate = true,
  iconName = "bell",
  title = "14 Days Schedule",
  description = "Scheduled task that will last all day",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setOpen(true)}
      activeOpacity={1}
      style={{
        height: 40,

        flexDirection: "row",
        alignItems: "center",
        padding: 2,
      }}
    >
      {/*//@ts-ignore*/}
      <View
        style={{ flexBasis: "80%", flexDirection: "row", alignItems: "center" }}
      >
        {/*//@ts-ignore*/}
        <Image
          source={iconsList[iconName]}
          resizeMode={"contain"}
          style={{
            transform: [{ scale: 1 }],
            borderRadius: 50,
            height: 30,
            width: 30,
          }}
        />
        <View>
          <Text style={[styles.listLable]}>{title}</Text>
          <Text style={[styles.roleLable]}>{description}</Text>
        </View>
      </View>
      <View
        style={{
          flexBasis: "20%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Text style={styles.date}>
          {isDate
            ? getDateByFormated(formikProps.values[formiKey])
            : "   Day of\n ( " +
              getHourFromDate(formikProps.values[formiKey]) +
              ")"}
        </Text>

        <Image
          source={rightIcon}
          resizeMode={"contain"}
          style={{ borderRadius: 50, marginRight: 5, height: 30, width: 30 }}
        />
      </View>
      <DatePicker
        modal
        mode={isDate ? "date" : "time"}
        open={open}
        date={formikProps.values[formiKey]}
        onConfirm={(date) => {
          console.log("hamd", date);
          setOpen(false);
          formikProps.setFieldValue(formiKey, date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </TouchableOpacity>
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
  date: {
    color: "#40302A",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(8),
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.5,
    alignSelf: "center",
  },
});

export default RemainderDrop;
