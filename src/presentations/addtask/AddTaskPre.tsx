import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import normalize from "../../utils/normalize";
import { Formik } from "formik";
import { Box } from "@react-native-material/core";
import CustomTextInput from "../../components/CustomTextInput";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import PriorityDropDown from "../../components/PriorityDropDown";
import EmployeDropDown from "../../components/addTask/EmployeDropDown";
import SelectedChip from "../../components/addTask/SelectedChip";
import Switcher from "../../components/addTask/Switcher";
import { Divider } from "react-native-paper";
import RemainderDrop from "../../components/addTask/RemainderDrop";
import CustomDatePicker from "../../components/addTask/CustomDatePicker";
import UploadAttachments from "../../components/addTask/UploadAttachments";
import { UIActivityIndicator } from "react-native-indicators";
import { useFocusEffect } from "@react-navigation/native";
//@ts-ignore
import TrashIcon from "../../assets/icons/trash.png";
import { showMessage } from "react-native-flash-message";

const initialValues = {
  taskHeading: "",
  location: "",
  description: "",
  priority: "",
  assignTo: [],
  weeklySch: false,
  TowWeeklySch: false,
  allDay: false,
  remainder: new Date(),
  holidays: new Date(),
  startDate: new Date(),
  startTime: new Date(),
  endDate: new Date(),
  endTime: new Date(),
  attachments: [],
  status: "inprogress", // Task may be "completed" or "not started"
};

const AddTaskPre = () => {
  const [picker, setPicker] = useState("");
  const [employes, setEmployes] = useState([]);
  const [weekToggle, setWeekToggle] = React.useState(false);
  const [towWeekToggle, setTwoWeekToggle] = React.useState(false);
  const [dayToggle, setdayToggle] = React.useState(false);
  const [uploadedPics, setUploadPics] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
     
    }, [])
  );

  const validationSchema = yup.object().shape({
    taskHeading: yup.string().required("Task Heading required"),
    location: yup.string().required("Location Heading required"),
    description: yup.string().required("Description  required"),
    priority: yup.string().required("Priority is  required"),
    remainder: yup.string().required("This Field is  required"),
    holidays: yup.string().required("This Field is  required"),
    startDate: yup.string().required("This Field is  required"),
    startTime: yup.string().required("This Field is  required"),
    endDate: yup.string().required("This Field is  required"),
    endTime: yup.string().required("This Field is  required"),
    assignTo: yup.array().min(0).required("Assign the task to a user"),
  });

  const handleSubmit = async (values, actions) => {
    // Assuming you have an array of image URIs in values.uploadedImages
    console.log("values", values);
    if (uploadedPics && uploadedPics?.length > 0) {
      try {
        const result = await Promise.all(
          uploadedPics.map(async (imageUri) => {
            try {
              const storageRef = storage().ref(
                `${CollectionConstant.tasksImages}/${imageUri}`
              );
              await storageRef.putFile(imageUri);
              const downloadUrl = await storageRef.getDownloadURL();
              return downloadUrl;
            } catch (error) {
              console.error("Error uploading image: ", error);
              throw new Error("Failed to upload image");
            }
          })
        );
        console.log("result", result);

        await firestore()
          .collection(CollectionConstant.tasks)
          .add({
            ...values,
            attachments: result,
          })
          .then(() => console.log("doc added"));

        actions.setSubmitting(false);

        showMessage({
          message: "Task Created Successfully",
          type: "success",
          animated: true,
          animationDuration: 200,
          statusBarHeight: -10,
          icon: "success",
          duration: 6000,
        });

        actions.resetForm(initialValues);
      } catch (error) {
        console.error("Error:", error?.message);
        actions.setSubmitting(false);
        showMessage({
          message: "Something went wrong, please try again later",
          type: "danger",
          animated: true,
          animationDuration: 200,
          statusBarHeight: -10,
          icon: "success",
          duration: 6000,
        });
        // Handle error or show an alert message
      }
    } else {
      try {
        await firestore().collection(CollectionConstant.tasks).add(values);
        actions.setSubmitting(false); // Assuming the submission was successful

        showMessage({
          message: "User Created Successfully",
          type: "success",
          animated: true,
          animationDuration: 200,
          statusBarHeight: -10,
          icon: "success",
          duration: 6000,
        });

        actions.resetForm(initialValues);
      } catch (error) {
        console.error("Error:", error?.message);
        actions.setSubmitting(false);
        showMessage({
          message: "Something went wrong, please try again later",
          type: "danger",
          animated: true,
          animationDuration: 200,
          statusBarHeight: -10,
          icon: "success",
          duration: 6000,
        });
        // Handle error or show an alert message
      }
    }
  };

  //remove the employee from the
  const removeEmploy = (valueToRemove: any) => {
    const temp = employes.filter((e) => e.id != valueToRemove);
    setEmployes(temp);
  };

  return (
    <View style={[styles.card, { flex: 1, paddingBottom: 20 }]}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
      >
        <View
          style={[styles.card, { backgroundColor: "white", paddingBottom: 2 }]}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => handleSubmit(values, actions)}
            validationSchema={validationSchema}
          >
            {(formikprops) => (
              <View style={{ marginTop: 5 }}>
                <Box mt={0} p={2} ph={2}>
                  <Text
                    style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                  >
                    Task Heading
                  </Text>
                  <CustomTextInput
                    formikProps={formikprops}
                    formiKey={"taskHeading"}
                    placeholder={"Add a new Task"}
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
                    Location
                  </Text>
                  <CustomTextInput
                    formikProps={formikprops}
                    formiKey={"location"}
                    placeholder={"Street 3682, society 421"}
                    iconName={"location"}
                    isRightIcon={false}
                    isLeftIcon={true}
                    secureTextEntry={false}
                    borderColor={"#012547"}
                    textColor={"#012547"}
                  />
                </Box>

                <Box mt={10} p={2} ph={2}>
                  <Text
                    style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                  >
                    Description
                  </Text>
                  <CustomTextInput
                    multiline
                    numberOfLines={4}
                    formikProps={formikprops}
                    formiKey={"description"}
                    placeholder={"Add task Description"}
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
                    Priority
                  </Text>
                  <PriorityDropDown
                    picker={formikprops.values["priority"]}
                    setPicker={formikprops.handleChange("priority")}
                  />
                  {formikprops.touched["priority"] &&
                    formikprops.errors["priority"] && (
                      <Box ph={10} mt={2}>
                        <Text
                          style={{
                            color: "red",
                          }}
                        >
                          {formikprops.touched["priority"] &&
                            formikprops.errors["priority"]}
                        </Text>
                      </Box>
                    )}
                </Box>
                <Box mt={10} p={2} ph={2}>
                  <Text
                    style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                  >
                    Assign To
                  </Text>
                  <EmployeDropDown
                    picker={formikprops.values["assignTo"]}
                    setPicker={(newValue: string) => {
                      const assignToArray = formikprops.values["assignTo"];
                      if (!assignToArray.includes(newValue)) {
                        const updatedAssignTo = [...assignToArray, newValue];
                        formikprops.setFieldValue("assignTo", updatedAssignTo);
                      }
                    }}
                    items={items}
                  />
                  {formikprops.touched["assignTo"] &&
                    formikprops.errors["assignTo"] && (
                      <Box ph={10} mt={2}>
                        <Text
                          style={{
                            color: "red",
                          }}
                        >
                          {formikprops.touched["assignTo"] &&
                            formikprops.errors["assignTo"]}
                        </Text>
                      </Box>
                    )}

                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: "row",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    {formikprops.values["assignTo"]?.flatMap((val) => {
                      const filteredItems = items.filter(
                        (item) => item.id === val
                      );
                      const handleDelete = () => {
                        const updatedAssignTo = formikprops.values[
                          "assignTo"
                        ].filter((item) => item !== val);
                        formikprops.setFieldValue("assignTo", updatedAssignTo);
                      };

                      return filteredItems.map((filteredItem: any, index) => {
                        return (
                          <View
                            key={`${val}-${index}`}
                            style={{
                              backgroundColor: "#f6f6f6",
                              padding: 12,
                              marginVertical: 8,
                              borderRadius: 8,
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <Image
                              source={{ uri: filteredItem.employeImg }}
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 25,
                                marginRight: 12,
                              }}
                            />
                            <Text
                              style={{
                                color: "#012547",
                                fontSize: 14,
                                textTransform: "capitalize",
                                fontWeight: "500",
                              }}
                            >
                              {filteredItem?.label}
                            </Text>
                            <TouchableOpacity onPress={handleDelete}>
                              <Image source={TrashIcon} />
                            </TouchableOpacity>
                          </View>
                        );
                      });
                    })}
                  </View>

                  <View
                    style={{
                      marginTop: 10,
                      flexWrap: "wrap",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    {employes.map((item, index) => (
                      <SelectedChip
                        key={index}
                        employeData={item}
                        removeHandler={removeEmploy}
                      />
                    ))}
                  </View>
                </Box>

                {/*//*/}
                <Box mt={10} pv={10}>
                  <Switcher
                    formiKey={"weeklySch"}
                    formikProps={formikprops}
                    iconName={"oneWeekcalender"}
                    title={"Weekly Schedule "}
                    description={"Scheduled task that will last all day"}
                  />
                </Box>
                <Box mt={5}>
                  <Divider />
                </Box>
                <Box mt={10} pv={10}>
                  <Switcher
                    formiKey={"TowWeeklySch"}
                    formikProps={formikprops}
                    iconName={"twoWeekcalender"}
                    title={"14 Days Schedule"}
                    description={"Scheduled task that will last all day"}
                  />
                </Box>

                <Box mt={10}>
                  <Divider />
                </Box>

                <Box mt={10} pv={10}>
                  <Switcher
                    formiKey={"allDay"}
                    formikProps={formikprops}
                    iconName={"oneWeekcalender"}
                    iconName={"sun"}
                    title={"All day activity"}
                    description={"Scheduled task that will last all day"}
                  />
                </Box>

                <Box mt={5}>
                  <Divider />
                </Box>

                <Box mt={10} pv={10}>
                  <RemainderDrop
                    formiKey={"remainder"}
                    formikProps={formikprops}
                    isDate={false}
                    iconName={"bell"}
                    title={"Reminders"}
                    description={"App will remind you before"}
                  />
                </Box>

                <Box mt={5}>
                  <Divider />
                </Box>

                <Box mt={10} pv={10}>
                  <RemainderDrop
                    formikProps={formikprops}
                    formiKey={"holidays"}
                    iconName={"oneWeekcalender"}
                    iconName={"clock"}
                    title={"Holidays"}
                    description={"Select holidays"}
                    isDate={true}
                  />
                </Box>

                <Box mt={5}>
                  <Divider />
                </Box>

                {/*//Task start and end dates*/}
                <View style={[styles.card2, { backgroundColor: "#ECECEC" }]}>
                  <Box mt={10} p={2} ph={2}>
                    <Text
                      style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                    >
                      Start Date
                    </Text>
                    <CustomDatePicker
                      date={formikprops.values.startDate}
                      formikProps={formikprops}
                      formiKey={"startDate"}
                      iconName={"greenCalender"}
                    />
                  </Box>
                  <Box mt={10} p={2} ph={2}>
                    <Text
                      style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                    >
                      Start Time
                    </Text>
                    <CustomDatePicker
                      date={formikprops.values.startTime}
                      formikProps={formikprops}
                      formiKey={"startTime"}
                      iconName={"greenClock"}
                      isDate={false}
                    />
                  </Box>
                  <Box mt={10} p={2} ph={2}>
                    <Text
                      style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                    >
                      Due Date
                    </Text>
                    <CustomDatePicker
                      date={formikprops.values.endDate}
                      formikProps={formikprops}
                      formiKey={"endDate"}
                      type={0}
                      iconName={"redCalender"}
                    />
                  </Box>
                  <Box mt={10} p={2} ph={2}>
                    <Text
                      style={[styles.label, { marginBottom: 5, marginLeft: 5 }]}
                    >
                      Due Time
                    </Text>
                    <CustomDatePicker
                      date={formikprops.values.endTime}
                      formikProps={formikprops}
                      formiKey={"endTime"}
                      type={0}
                      iconName={"redClock"}
                      isDate={false}
                    />
                  </Box>
                </View>

                {/*//Task Attachements*/}
                <View style={[styles.card2, { backgroundColor: "#ECECEC" }]}>
                  <UploadAttachments
                    uploadedPics={uploadedPics}
                    setUploadPics={setUploadPics}
                  />
                </View>

                <Box mt={20} mb={50}>
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
                        Add to App
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
  card: {
    margin: 5,
    marginTop: normalize(10),
    // backgroundColor:'red',
    shadowColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.5,
    elevation: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom: 20,
  },
  card2: {
    marginTop: normalize(10),
    // opacity: 0.5,
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
    letterSpacing: 0.4,
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
export default AddTaskPre;
