import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Flex } from "@react-native-material/core";
//@ts-ignore
import trash from "../../../assets/icons/trash.png";
import edit from "../../../assets/icons/edit.png";
import { useNavigation } from "@react-navigation/native";
const ActionsButtons = () => {
  const navigation = useNavigation();
  return (
    <Flex direction={"row"} ph={10} mb={2}>
      <Box mr={10}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({name:"MenuStack", params:{screen:"AddMember"}});
          }}
          activeOpacity={1}
          style={[styles.backArrow]}>
          <Image
            source={trash}
            style={{ height: 24, width: 24 }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </Box>
      <Box mr={2}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddMember" as never);
          }}
          activeOpacity={1}
          style={[styles.backArrow]}>
          <Image
            source={edit}
            style={{ height: 24, width: 24 }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </Box>
    </Flex>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    backgroundColor: "#F6F6F6",
    height: 45,
    width: 45,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default ActionsButtons;
