import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SelectedChip from "@components/addTask/SelectedChip";
import firestore from "@react-native-firebase/firestore";
import { CollectionConstant } from "app/firebase/CollectionsConstant";
import storage from "@react-native-firebase/storage";

const AssignTo = ({ userId }) => {
  const [userData, setUserData] = useState();
  const [userImage, setUserImage] = useState();

  console.log("userData", userData, userImage);

  const fetchUserData = async () => {
    try {
      const userDoc = await firestore()
        .collection(CollectionConstant.users)
        .doc(userId)
        .get();
      const userData = userDoc.data();
      setUserData(userData?.name);
      storage()
        .ref(`${CollectionConstant.userImageDir}/${userId}.png`)
        .getDownloadURL()
        .then((res) => {
          setUserImage(res);
        })
        .catch((e) => {
          console.error("Error fetching user image:", e);
        });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);
  return (
    userData &&
    userImage && (
      <SelectedChip
        key={userId}
        showTrash={false}
        employeData={{ employeImg: userImage, value: userData }}
        removeHandler={() => {}}
      />
    )
  );
};

export default AssignTo;

const styles = StyleSheet.create({});
