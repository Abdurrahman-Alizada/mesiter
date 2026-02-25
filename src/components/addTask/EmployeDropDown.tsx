import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// @ts-ignore
import AntDesign from "react-native-vector-icons/AntDesign";

import EmployeeData from "@components/addTask/dummyEmployes";
interface PropsTypes {
  picker?: any;
  placeholder?: string;
  setPicker?: any;
  round?: number;
  height?: number;
  isDisabled?: boolean;
  borderColor?: string;
  useCustomIcon?: boolean;
  items: [];
}

import HighPriority from "../../assets/icons/HighPriority.png";
import lowPriority from "../../assets/icons/lowPriority.png";
import MediumPriority from "../../assets/icons/MediumPriority.png";
import bluecircle from "../../assets/icons/bluecircle.png";
import arrowDown from "../../assets/icons/chevron-right.png";
import { useFocusEffect } from "@react-navigation/native";
import normalize from "../../utils/normalize";

const SelecteIdentifer = "Select Employes";
const EmployeDropDown: React.FunctionComponent<PropsTypes> = ({
  picker,
  placeholder = "",
  setPicker,
  round = 10,
  height = 50,
  isDisabled = false,
  borderColor = "black",
  items,
}): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const Item = props => {
    const handleValue = ({ item }) => {
      setPicker(item._id);
      setOpen(false);
    };

    return props.item._id !== SelecteIdentifer ? (
      <TouchableOpacity
        onPress={() => handleValue(props)}
        key={props.item._id || Math.random().toString(36).substr(2, 9)} // Ensure a unique key
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}>
        <View
          style={{
            height: 40,

            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: normalize(10),
            padding: 2,
          }}>
          <Image
            source={
              props.item.employeImg
                ? { uri: props.item.employeImg }
                : require("../../assets/placeholder.jpg")
            }
            resizeMode={"contain"}
            style={{
              transform: [{ scale: 1.2 }],
              borderRadius: 50,
              height: 30,
              width: 30,
            }}
          />
          <View>
            <Text style={styles.listLable}>{props.item.fullName}</Text>
            <Text style={styles.roleLable}>{props.item.role}</Text>
          </View>
        </View>
        {props.isSelected === true && <props.TickIconComponent />}
      </TouchableOpacity>
    ) : null;
  };

  return (
    <DropDownPicker
      searchable={true}
      listMode={"MODAL"}
      mode={"BADGE"}
      items={items}
      open={open}
      hideSelectedItemIcon={false}
      closeAfterSelecting={true}
      disabled={isDisabled}
      value={
        (picker && items?.find(item => item._id === picker)?._id) ||
        "Select Employees"
      }
      setOpen={setOpen}
      // setValue={setPicker}

      placeholder={placeholder}
      zIndex={9999}
      renderListItem={props => <Item key={props.item._id} {...props} />}
      TickIconComponent={({ style }) => (
        <Image
          source={require("../../assets/icons/bluecircle.png")}
          resizeMode={"contain"}
          style={{ marginRight: 10, height: 24, width: 24 }}
        />
      )}
      ArrowDownIconComponent={({ style }) => (
        <Image
          source={arrowDown}
          resizeMode={"contain"}
          style={{
            transform: [{ rotate: "90deg" }],
            marginRight: 10,
            height: 24,
            width: 24,
          }}
        />
      )}
      style={{
        // width: Platform.OS === 'ios' ? hp('20%') : hp('25%'),
        minHeight: height,
        borderColor: borderColor,
        borderRadius: round,
      }}
      dropDownContainerStyle={{ borderColor: "grey", paddingBottom: 10 }}
      ArrowUpIconComponent={({ style }) => (
        <AntDesign name="caretup" size={15} color="grey" />
      )}
      searchContainerStyle={{
        borderBottomColor: "#dfdfdf",
      }}
      searchPlaceholderTextColor="#012547"
      searchTextInputStyle={{
        borderColor: "#012547",
        color: "red",
      }}
    />
  );
};

const styles = StyleSheet.create({
  listLable: {
    color: "#012547",
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

export default EmployeDropDown;
