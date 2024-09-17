import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { Box } from "@react-native-material/core";
import { sanFranciscoWeights } from "react-native-typography";
import SingleInput from "../../components/profilecard/SingleInput";
import trash from "../../assets/icons/trash.png";
import { useTranslation } from "react-i18next";
import RoleDropDown from "../../../components/RoleDropDown";
import { UserRoles } from "../../config/constants";
import RoleInput from "../../components/profilecard/RoleInput";
import { showMessage } from "react-native-flash-message";
// import {DebugConsole} from "@utils/debuggingHelpers";
import { UIActivityIndicator } from "react-native-indicators";
import {
  useDeleteUserByAdminMutation,
  useUpdateUserMutation,
} from "../../redux/reducers/user/userThunk";

interface Types {
  data?: [];
}

const UserForm: React.FC<Types> = ({ data }) => {
  const { t } = useTranslation();
  const [deleteLoader, setDeleteLoader] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().label("name").required("Name of Person is required"),
    role: yup.string().label("role").required("Role is required"),
    phoneNumber: yup
      .number()
      .label("phoneNumber")
      .required("Phone Number is required"),
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
        value => {
          // Check for at least one uppercase letter
          const uppercaseRegex = /[A-Z]/;
          const containsUppercase = uppercaseRegex.test(value);

          // Check for at least one special character
          const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
          const containsSpecialCharacter = specialCharacterRegex.test(value);

          // Return true if both conditions are met
          return containsUppercase && containsSpecialCharacter;
        },
      ),
  });

  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();
  const [
    deleteUserByAdmin,
    { isLoading: deleteLoading, isError: deleteisError, error: deleteError },
  ] = useDeleteUserByAdminMutation();

  const handleSubmit = (values: any, actions: any) => {
    actions.setSubmitting(true);
    //submit form here
    const updatedUser = {
      id: data?._id,
      email: values.email,
      password: values.appLoginPassword,
      appLoginPassword: values.appLoginPassword,
      fullName: values.name,
      address: "",
      role: values.role,
      status: "active",
      phoneNumber: values.phoneNumber,
    };
    updateUser(updatedUser)
      .then((res: any) => {
        console.log("res is", res);

        showMessage({
          message: "User Updated Successfully",
          type: "success",
          animated: true,
          animationDuration: 200,
          statusBarHeight: -10,
          icon: "success",
          duration: 6000,
        });
        // actions.resetForm(initValues);
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
          DebugConsole("inside the USer form ", err);
        }
      })
      .finally(() => actions.setSubmitting(false));
  };

  const handleDeleteUser = () => {
    deleteUserByAdmin(data?._id)
      .then((res: any) => {
        console.log("res is", res);

        showMessage({
          message: "User Deleted Successfully",
          type: "success",
          animated: true,
          animationDuration: 200,
          statusBarHeight: -10,
          icon: "success",
          duration: 6000,
        });
        // actions.resetForm(initValues);
      })
      .catch((err: any) => {
        if (err != 404) {
          showMessage({
            message: "Something went wrong try again later",
            type: "danger",
            animated: true,
            animationDuration: 200,
            statusBarHeight: -10,
            icon: "info",
            duration: 6000,
          });
        }
      });
  };

  return (
    <Formik
      initialValues={{
        name: data?.fullName,
        role: UserRoles.filter(item => item.title === data?.role).map(
          v => v.title,
        )?.[0],
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        appLoginPassword: data?.appLoginPassword,
      }}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      validationSchema={validationSchema}>
      {formikprops => (
        <View style={{ marginTop: 10 }}>
          <SingleInput
            formikProps={formikprops}
            label={t("name")}
            formiKey={"name"}
            placeholder={formikprops.values.name}
            isRightIcon={true}
            secureTextEntry={false}
          />
          <Box mt={10}>
            <RoleInput
              formikProps={formikprops}
              label={t("role")}
              formiKey={"role"}
              placeholder={"---"}
              isRightIcon={true}
              secureTextEntry={false}
            />
          </Box>
          <Box mt={10}>
            <SingleInput
              formikProps={formikprops}
              label={"Email"}
              formiKey={"email"}
              placeholder={"----"}
              isRightIcon={true}
              secureTextEntry={false}
            />
          </Box>

          <Box mt={10}>
            <SingleInput
              formikProps={formikprops}
              label={t("phoneNumber")}
              formiKey={"phoneNumber"}
              placeholder={"-----"}
              isRightIcon={true}
              secureTextEntry={false}
            />
          </Box>

          <Box mt={10}>
            <SingleInput
              formikProps={formikprops}
              label={t("app-login-password")}
              formiKey={"appLoginPassword"}
              isRightIcon={true}
              secureTextEntry={true}
            />
          </Box>

          <Box mt={20} ph={20}>
            {formikprops.isSubmitting ? (
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.button, { backgroundColor: "#9F9793" }]}>
                <UIActivityIndicator color={"white"} size={20} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={!deleteLoading ? formikprops.handleSubmit : ()=>console.log("delete ongoing")}
                activeOpacity={1}
                style={[styles.button, { backgroundColor: "#9F9793" }]}>
                <Text style={[sanFranciscoWeights.bold, { color: "white" }]}>
                  Update user
                </Text>
              </TouchableOpacity>
            )}
          </Box>

          <Box mt={10} ph={20}>
            {/*//@ts-ignore*/}
            {deleteLoading ? (
              <TouchableOpacity
                onPress={() => console.log("sss")}
                activeOpacity={1}
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "##CC3017",
                  },
                ]}>
                <UIActivityIndicator color={"black"} size={20} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleDeleteUser();
                }}
                activeOpacity={1}
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "##CC3017",
                  },
                ]}>
                <Image source={trash} style={{ height: 24, width: 24 }} />
                <Text style={[sanFranciscoWeights.bold, { color: "#CC3017" }]}>
                  Remove from system
                </Text>
              </TouchableOpacity>
            )}
          </Box>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F4F4",
  },
  card: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 30,
    borderRadius: 20,
    backgroundColor: "#FFFEFA",
  },
  backArrow: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },

  input: {
    backgroundColor: "red",
  },
  button: {
    height: 45,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UserForm;
