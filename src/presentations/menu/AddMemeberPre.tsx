import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Box } from "@react-native-material/core";
import normalize from "../../utils/normalize";
import { Formik } from "formik";
import SingleInput from "../../components/profilecard/SingleInput";
import { sanFranciscoWeights } from "react-native-typography";
import trash from "../../assets/icons/trash.png";
import * as yup from "yup";
import CustomTextInput from "../../components/CustomTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PriorityDropDown from "../../components/PriorityDropDown";
import { showMessage, hideMessage } from "react-native-flash-message";
import RoleDropDown from "../../components/RoleDropDown";
import { UIActivityIndicator } from "react-native-indicators";
// import { DebugAlert, DebugConsole } from "../../utils/debuggingHelpers";
import { useTranslation } from "react-i18next";
import { UserRoles } from "../../config/constants";
interface Types {
  createNewUser: Function;
}

const initValues = {
  name: "",
  role: UserRoles[0]?.id,
  phone: "",
  email: "",
  appLoginPassword: "",
};

const AddMemeberPre: React.FC<Types> = ({ createNewUser }) => {
  const { t } = useTranslation();
  const validationSchema = yup.object().shape({
    name: yup.string().label("name").required("Name of Person is required"),
    role: yup.string().label("role").required("Role is required"),
    phone: yup.number().label("phone").required("Phone Number is required"),
    email: yup
      .string()
      .label("email")
      .required("Email  is required")
      .email("Please enter a valid email"),
    appLoginPassword: yup
      .string()
      .required("Password is requried")
      .min(8, "Password min 8 Characters Long")
      .max(16, "Password max 16 Characters Long")
      .test(
        "password-validation",
        "Password must contain at least one uppercase letter and one special character",
        (value) => {
          // Check for at least one uppercase letter
          const uppercaseRegex = /[A-Z]/;
          const containsUppercase = uppercaseRegex.test(value);

          // Check for at least one special character
          const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
          const containsSpecialCharacter = specialCharacterRegex.test(value);

          // Return true if both conditions are met
          return containsUppercase && containsSpecialCharacter;
        }
      ),
  });
  //@ts-ignore
  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    //submit form here
    createNewUser(values)
      .then((res: any) => {
        console.log("Promise resolve", res);
        showMessage({
          message: "Task Created Successfully",
          type: "success",
          animated: true,
          animationDuration: 200,
          statusBarHeight: -10,
          icon: "success",
          duration: 6000,
        });
        actions.resetForm(initValues);
      })
      .catch((err: any) => {
        if (err != 404) {
          showMessage({
            message: "Something went wrong try again later",
            type: "danger",
            animated: true,
            animationDuration: 200,
            statusBarHeight: -10,
            icon: "success",
            duration: 6000,
          });
          DebugConsole("inside the Add Memebe Pre", err);
        }
      })
      .finally(() => actions.setSubmitting(false));
    console.log("value", values);
  };

  return (
    <View>
      <Box mt={20} ph={10}>
        <Text style={styles.heading}>{t("add-new-member")}</Text>
      </Box>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
      >
        <View
          style={[
            styles.card,
            {
              padding: 24,
              paddingTop: 24,
              paddingRight: 16,
              paddingBottom: 24,
              paddingLeft: 16,
            },
          ]}
        >
          <Formik
            initialValues={initValues}
            onSubmit={(values, actions) => handleSubmit(values, actions)}
            validationSchema={validationSchema}
          >
            {(formikprops) => (
              <View style={{ marginTop: 5 }}>
                <Box mt={0} p={2} ph={2}>
                  <Text
                    style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                  >
                    {t("name")}
                  </Text>
                  <CustomTextInput
                    formikProps={formikprops}
                    formiKey={"name"}
                    placeholder={t("name-of-person")}
                    iconName={"email"}
                    isRightIcon={false}
                    secureTextEntry={false}
                    borderColor={"#012547"}
                    textColor={"#012547"}
                  />
                </Box>

                <Box mt={10} p={2} ph={2}>
                  <Text
                    style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                  >
                    {t("role")}
                  </Text>
                  <RoleDropDown
                    picker={formikprops.values["role"]}
                    setPicker={formikprops.handleChange("role")}
                  />
                </Box>

                <Box mt={10} p={2} ph={2}>
                  <Text
                    style={[
                      styles.label,
                      {
                        marginBottom: 5,
                        marginLeft: 5,
                        textTransform: "capitalize",
                      },
                    ]}
                  >
                    {t("phone")}
                  </Text>
                  <CustomTextInput
                    formikProps={formikprops}
                    formiKey={"phone"}
                    placeholder={t("phone")}
                    iconName={"email"}
                    isRightIcon={false}
                    secureTextEntry={false}
                    borderColor={"#012547"}
                    textColor={"#012547"}
                    keyboardType={"numeric"}
                  />
                </Box>

                <Box mt={10} p={2} ph={2}>
                  <Text
                    style={[
                      styles.label,
                      {
                        marginBottom: 5,
                        marginLeft: 5,
                        textTransform: "capitalize",
                      },
                    ]}
                  >
                    {t("email")}
                  </Text>
                  <CustomTextInput
                    formikProps={formikprops}
                    formiKey={"email"}
                    placeholder={"Email"}
                    iconName={"person@gmail.com"}
                    isRightIcon={false}
                    secureTextEntry={false}
                    borderColor={"#012547"}
                    textColor={"#012547"}
                  />
                </Box>
                <Box mt={10} p={2} ph={2}>
                  <Text
                    style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                  >
                    {t("app-login-password")}
                  </Text>
                  <CustomTextInput
                    formikProps={formikprops}
                    formiKey={"appLoginPassword"}
                    placeholder={t("app-login-password")}
                    iconName={"person@gmail.com"}
                    isRightIcon={false}
                    secureTextEntry={false}
                    borderColor={"#012547"}
                    textColor={"#012547"}
                    secureTextEntry
                  />
                </Box>

                <Box mt={20}>
                  {formikprops.isSubmitting ? (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[
                        styles.button,
                        {
                          flexDirection: "row",
                          borderWidth: 1,
                          backgroundColor: "#012547",
                        },
                      ]}
                    >
                      <UIActivityIndicator color={"white"} size={20} />
                      {/*<Text style={[styles.buttonTitle,{color:'white'}]}>Loader</Text>*/}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={formikprops.handleSubmit}
                      activeOpacity={1}
                      style={[
                        styles.button,
                        {
                          flexDirection: "row",
                          borderWidth: 1,
                          backgroundColor: "#012547",
                        },
                      ]}
                    >
                      <Text style={[styles.buttonTitle, { color: "white" }]}>
                        {t("add-to-app")}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Box>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "#40302A",
    fontFamily: "Poppins-SemiBold",
    fontSize: normalize(15),
    fontWeight: "600",
    lineHeight: 24,
  },
  card: {
    margin: 10,
    marginTop: normalize(10),
    // backgroundColor:'red',
    backgroundColor: "white",
    shadowColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.5,
    elevation: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom: 20,
  },
  label: {
    color: "#40302A",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(11),
    fontWeight: "400",
    lineHeight: 24,
  },
  button: {
    fontFamily: "Poppins-Regular",
    height: 45,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#40302A",
    fontFamily: "Poppins-Medium",
    fontSize: normalize(13),
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
});
export default AddMemeberPre;
