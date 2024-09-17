import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SelectedChip from "../../components/addTask/SelectedChip";

const AssignTo = ({ userId }) => {
  const [userData, setUserData] = useState();
  const [userImage, setUserImage] = useState();

  const fetchUserData = async () => {
   
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
