import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

//@ts-ignore
import user from "@assets/default_user.png";
//@ts-ignore
import trash from "@assets/icons/trash.png";
import normalize from "../../utils/normalize";
interface Types {
  employeData: object;
  removeHandler?: Function;
  showTrash?: boolean;
}
const SelectedChip: React.FC<Types> = ({
  employeData,
  removeHandler = () => {},
  showTrash = true,
}) => {
  return (
    //@ts-ignore
    <View style={styles.chipContainer}>
      {/*//@ts-ignore*/}
      {employeData.employeImg ? (
        // @ts-ignore
        <Image
          source={{ uri: employeData.employeImg }}
          resizeMode={"contain"}
          style={{
            transform: [{ scale: 1.2 }],
            borderRadius: 50,
            height: 25,
            width: 25,
          }}
        />
      ) : (
        <Image
          source={user}
          resizeMode={"contain"}
          style={{
            transform: [{ scale: 1.2 }],
            borderRadius: 50,
            height: 16,
            width: 16,
          }}
        />
      )}
      {/*<Text style={styles.label}>{employeData.value}</Text>*/}
      <Text style={styles.label}>{employeData.value}</Text>
      {showTrash && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => removeHandler(employeData.id)}
        >
          <Image
            source={trash}
            resizeMode={"contain"}
            style={{ alignSelf: "center", height: 23, width: 23 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: 12,
    paddingHorizontal: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    margin: 2,
    backgroundColor: "#F6F6F6",
  },
  label: {
    color: "#012547",
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Poppins-Regular",
    fontSize: normalize(10),
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});
export default SelectedChip;
