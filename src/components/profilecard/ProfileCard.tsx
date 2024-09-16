import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Dialog, Portal } from "react-native-paper";
//@ts-ignore
import Placeholder from "../../assets/default_user.png";
// @ts-ignore
import cameraIcon from "../../assets/icons/camera.png";
// @ts-ignore
// import * as ImagePicker from 'expo-image-picker';

import { Box, Flex } from "@react-native-material/core";
//@ts-ignore
import chervienRight from "../../assets/icons/chevron-right.png";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import UserForm from "../../components/profilecard/UserForm";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import UploadSelection from "../../components/dialogs/UploadSelection";

import normalize from "../../utils/normalize";
interface Types {
  profileData: any;
  isExtraInfo?: boolean;
  deleteHandler?: Function;
}

const ProfileCard: React.FC<Types> = ({
  deleteHandler,
  profileData = {},
  isExtraInfo = false,
}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [visible, setVisible] = useState(false);
  const [imageUri, setImageUri] = useState(profileData.profileImage);
  const [toggleDetails, setToggleDetails] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const { colors } = useTheme();
  const [refresh, setRefresh] = useState(false);
  const { t } = useTranslation();

  let user = useSelector(state => state.user.user);
  // const {email,role}  = user

  useFocusEffect(React.useCallback(() => {}, [refresh]));

  const handleCameraPress = async () => {
    // let  { status } = await ImagePicker.requestCameraPermissionsAsync();
    // //
    // if (status === 'granted') {
    //     const result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         quality: 1,
    //     });
    //     if (!result.canceled) {
    //         if(Array.isArray(result.assets)){
    //             if(result.assets[0].uri){
    //                 updateUserImage(result.assets[0].uri)
    //                 //setUploadPic(result.assets[0].uri);
    //             }
    //         }
    //     }
    // }
  };

  const handleFilePress = async () => {
    setVisible(false);
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status === 'granted') {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {

    //         if(Array.isArray(result.assets)){
    //             if(result.assets[0].uri){
    //                 //setUploadPic(result.assets[0].uri);
    //                 updateUserImage(result.assets[0].uri)

    //             }
    //         }
    //     }
    // }
  };

  const updateUserImage = img => {
    const filename =
      CollectionConstant.userImageDir + "/" + profileData?.docId + ".png";

    // const uploadUri =  uri;
    const task = storage().ref(filename).putFile(img);
    // set progress state
    task.on("state_changed", snapshot => {
      // console.log("inside profile card",Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000)
      setRefresh(v => !v);
    });
  };

  return (
    <>
      <UploadSelection
        visible={dialogVisible}
        setVisible={setDialogVisible}
        handlerFile={handleFilePress}
        handlerCamera={handleCameraPress}
      />
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
        ]}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              zIndex: -1,
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TouchableOpacity
              onPress={() => setDialogVisible(true)}
              style={styles.cameraButton}>
              <Image source={cameraIcon} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            <View style={styles.container}>
              <View></View>

              <Portal>
                <Dialog
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                  style={{ backgroundColor: "white" }}>
                  <Dialog.Title>Choose</Dialog.Title>
                  <Dialog.Content
                    style={{
                      alignItems: "center",
                      backgroundColor: "white",
                      padding: normalize(20),
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <View style={{ marginRight: normalize(30) }}>
                        <TouchableOpacity onPress={() => handleCameraPress()}>
                          <Image
                            source={cameraIcon}
                            style={{ height: 17, width: 17 }}
                          />
                          <Text style={{ color: "black", marginTop: 10 }}>
                            Camera
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginLeft: normalize(30) }}>
                        <TouchableOpacity onPress={() => handleFilePress()}>
                          <Image
                            source={cameraIcon}
                            style={{ height: 17, width: 17 }}
                          />
                          <Text style={{ color: "black", marginTop: 10 }}>
                            Gallery
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={() => setVisible(false)}>Cancel</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Image
                source={profilePic ? { uri: profilePic } : Placeholder}
                style={styles.profileImage}
              />
            </View>
          </View>
        </View>
        {/*//Role and usename*/}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}>
          <Text style={styles.userName}>
            {profileData?.fullName
              ? profileData.fullName
              : "User name"}
          </Text>
          {profileData?.role === "admin" ? (
            <Text style={styles.userRole}>Admin</Text>
          ) : (
            <Text style={styles.userRole}>Employee</Text>
          )}
        </View>

        {/*//extrainformation of user*/}
        {isExtraInfo && (
          <View>
            <Flex direction={"row"} mt={10} justify={"between"}>
              <Text style={[styles.moreDetailsTitle, { color: colors.text }]}>
                {t("more-info")}
              </Text>
              <TouchableOpacity
                onPress={() => setToggleDetails(!toggleDetails)}>
                <Image
                  source={chervienRight}
                  style={{
                    height: 24,
                    width: 24,
                    transform: [{ rotate: toggleDetails ? "270deg" : "90deg" }],
                  }}
                />
              </TouchableOpacity>
            </Flex>
            {toggleDetails && (
              <Box mt={5}>
                <UserForm deleteHandler={deleteHandler} data={profileData} />
              </Box>
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginTop: normalize(10),
    // backgroundColor:'red',
    backgroundColor: "white",
    shadowColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.5,
    elevation: 20,
    margin: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom: 20,
  },
  container: {
    zIndex: -899,
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    zIndex: -9999,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  cameraButton: {
    backgroundColor: "#F6F6F6",
    zIndex: 1000,
    borderRadius: 50,
    right: -10,
    position: "absolute",
    bottom: 0,
    padding: 8,
    margin: 8,
  },
  userName: {
    textAlign: "center",
    fontSize: normalize(15),
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    lineHeight: 24,
    letterSpacing: 1,
  },
  userRole: {
    marginTop: 2,
    textAlign: "center",
    fontSize: normalize(12),
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  moreDetailsTitle: {
    fontSize: normalize(13),
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
});

export default ProfileCard;
