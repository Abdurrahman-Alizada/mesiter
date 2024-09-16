import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput as PaperInputText,
  TouchableOpacity,
  View,
} from "react-native";
import { Box, Text } from "@react-native-material/core";
// @ts-ignore
import email from "../assets/email.png";
// @ts-ignore
import password from "../assets/password.png";
// @ts-ignore
import location from "../assets/icons/location.png";
// @ts-ignore
import passwordhide from "../assets/passwordhide.png";
// @ts-ignore
import passwordhidden from "../assets/passwordhidden.png";

interface IconsList {
  [key: string]: any;
}

const icons_list: IconsList = { email, password, location };

interface inputprops {
  isRightIcon?: boolean;
  isLeftIcon?: boolean;
  LeftIcon?: any;
  RightIcon?: any;
  formikProps: any;
  formiKey: string;
  borderColor?: string;
  textColor?: string;
  secsecureTextEntry?: string;
  [key: string]: any;
}

const CustomTextInput: React.FC<inputprops> = ({
  isRightIcon = false,
  isLeftIcon = false,
  LeftIcon,
  RightIcon,
  formiKey,
  formikProps,
  borderColor = "#F6F6F6",
  textColor = "#22609D",
  secureTextEntry,
  ...rest
}): React.ReactElement => {
  const [sec, setSec] = useState(secureTextEntry);
  const ref = useRef(null);
  let Inputstyles = {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 7,
    paddingHorizontal: 10,
  };

  if (formikProps.touched[formiKey] && formikProps.errors[formiKey]) {
    Inputstyles.borderColor = "red";
  }

  useEffect(() => {}, []);

  return (
    <>
      {/*//@ts-ignore*/}
      <View style={Inputstyles}>
        {LeftIcon && (
          <Image
            source={icons_list[LeftIcon]}
            // source={LeftIcon}
            style={{ height: 20, width: 20 }}
          />
        )}
        <PaperInputText
          ref={ref}
          style={[
            styles.input,
            { color: textColor, fontFamily: "Poppins-Regular" },
          ]}
          // onFocus={()=>setFocus()}
          value={formikProps.values[formiKey]}
          placeholderTextColor={"grey"}
          onChangeText={formikProps.handleChange(formiKey)}
          onBlur={formikProps.handleBlur(formiKey)}
          secureTextEntry={sec}
          {...rest}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setSec(!sec)}>
          {isRightIcon && (
            <Image
              source={sec ? passwordhidden : passwordhide}
              style={{ height: 24, width: 24 }}
            />
          )}
        </TouchableOpacity>
      </View>
      {formikProps.touched[formiKey] && formikProps.errors[formiKey] && (
        <Box ph={10} mt={2}>
          <Text color={"red"} variant={"subtitle2"}>
            {formikProps.touched[formiKey] && formikProps.errors[formiKey]}
          </Text>
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,

    borderRadius: 4,
    paddingHorizontal: 10,
  },

  icon: {
    marginRight: 10,
  },
  input: {
    fontFamily: "Roboto-Bold",
    minHeight: 50,

    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  outlineInput: {
    borderRadius: 7,
    borderColor: "#F6F6F6",
  },
  iconContainer: {
    padding: 8,
  },
});

export default CustomTextInput;
