import React, { useState } from "react";
import AddMemeberPre from "../../presentations/menu/AddMemeberPre";
import AlertDialog from "../../components/toasts/AlertDialog";
import { useAddUserByAdminMutation } from "../../redux/reducers/user/userThunk";
import { useNavigation } from "@react-navigation/native";
const AddMemberContainer = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  const [addUserByAdmin, { isLoading, isError, error }] =
    useAddUserByAdminMutation();

  const createNewUser = (values: any, actions: any) => {
    actions.setSubmitting(true);
    const user = {
      email: values.email,
      password: values.appLoginPassword,
      fullName: values.name,
      address: "",
      role: values.role,
      status: "active",
      phoneNumber: values.phone,
    };
    addUserByAdmin(user)
      .then(res => {
        if (res.data?.success) {
          navigation.goBack();
        }
        if(res?.error){
          setVisible(true)
          setErrorMessage(res?.error?.data?.message)
        }
      })
      .finally(() => actions.setSubmitting(false));
  };

  return (
    <>
      <AlertDialog
        // message={"Email with same name alreay exist "}
        message={`${errorMessage}`}
        visible={visible}
        setVisible={setVisible}
      />
      <AddMemeberPre createNewUser={createNewUser} />
    </>
  );
};

export default AddMemberContainer;
