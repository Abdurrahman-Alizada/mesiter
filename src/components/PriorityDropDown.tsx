import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';

interface PropsTypes {
  picker?: any;
  placeholder?: string;
  setPicker?: any;
  round?: number;
  height?: number;
  isDisabled?: boolean;
  borderColor?: string;
  useCustomIcon?: boolean;
}

// import HighPriority from "../assets/icons/HighPriority.png";
import HighPriority from "../assets/icons/HighPriority.png"
import lowPriority from "../assets/icons/lowPriority.png";
import MediumPriority from "../assets/icons/MediumPriority.png";
import bluecircle from "../assets/icons/bluecircle.png";
import normalize from "../utils/normalize";
const icons = {
  Low: lowPriority,
  Medium: MediumPriority,
  High: HighPriority,
};
const PriorityDropDown: React.FunctionComponent<PropsTypes> = ({
  picker,
  placeholder = "",
  setPicker,
  round = 10,
  height = 50,
  isDisabled = false,
  borderColor = "black",
}): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      label: "Low",
      value: "Low",
      icon: () => (
        <Image
          source={lowPriority}
          resizeMode={"contain"}
          style={{
            transform: [{ scale: 1.2 }],
            borderRadius: 50,
            height: 30,
            width: 30,
          }}
        />
      ),
    },
    {
      label: "High",
      value: "High",
      icon: () => (
        <Image
          source={HighPriority}
          resizeMode={"contain"}
          style={{
            transform: [{ scale: 1.2 }],
            borderRadius: 50,
            height: 30,
            width: 30,
          }}
        />
      ),
    },
    {
      label: "Medium",
      value: "Medium",
      icon: () => (
        <Image
          source={MediumPriority}
          resizeMode={"contain"}
          style={{
            transform: [{ scale: 1.2 }],
            borderRadius: 50,
            height: 30,
            width: 30,
          }}
        />
      ),
    },
  ]);

  const Item = (props) => {
    const handleValue = ({ item }) => {
      setPicker(item.value);
      setOpen(false);
    };

    return (
      <>
        <TouchableOpacity
          onPress={() => handleValue(props)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View
            style={{
              height: 40,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: normalize(10),
              padding: 2,
            }}
          >
            <Image
              source={icons[props.item.label]}
              resizeMode={"contain"}
              style={{
                transform: [{ scale: 1.2 }],
                borderRadius: 50,
                height: 30,
                width: 30,
              }}
            />
            <Text style={styles.listLable}>{props.item.label}</Text>
          </View>
          {props.isSelected === true && <props.TickIconComponent />}
        </TouchableOpacity>
      </>
    );
  };
  return (
    <DropDownPicker
      listMode={"MODAL"}
      items={items}
      open={open}
      hideSelectedItemIcon={false}
      closeAfterSelecting={true}
      disabled={isDisabled}
      value={picker}
      setOpen={setOpen}
      setValue={setPicker}
      setItems={setItems}
      placeholder={"Select Task Priority"}
      placeholderStyle={{ color: "grey" }}
      zIndex={9999}
      renderListItem={(props) => <Item {...props} />}
      TickIconComponent={({ style }) => (
        <Image
          source={bluecircle}
          resizeMode={"contain"}
          style={{ marginRight: 10, height: 24, width: 24 }}
        />
      )}
      ArrowDownIconComponent={({ style }) => (
        <Image
          source={bluecircle}
          resizeMode={"contain"}
          style={{ marginRight: 10, height: 24, width: 24 }}
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
    />
  );
};

const styles = StyleSheet.create({
  listLable: {
    color: "#012547",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(12),
    marginLeft: 10,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});

export default PriorityDropDown;
