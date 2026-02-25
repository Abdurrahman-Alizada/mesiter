import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SelectedChip from "../../components/addTask/SelectedChip";
import { useGetCurrentLoginUserQuery } from "../../redux/reducers/user/userThunk";

const AssignTo = ({ user }) => {
  const [userImage, setUserImage] = useState();

  const { data, isLoading } = useGetCurrentLoginUserQuery();
  console.log("data", data?.user);

  return (
    data?.user &&
    data?.user && (
      <SelectedChip
        key={user?._id}
        showTrash={false}
        employeData={user}
        removeHandler={() => {}}
      />
    )
  );
};

export default AssignTo;

const styles = StyleSheet.create({});
