import React, { useState } from "react";
import AddMemeberPre from "../../presentations/menu/AddMemeberPre";
import AlertDialog from "../../components/toasts/AlertDialog";
const AddMemberContainer = () => {
  const [visible, setVisible] = useState(false);
  //function to the new user

  const createNewUser = (values: any) => {
    return new Promise((resolve, reject) => {
      //check user already exist or not
    });
  };

  return (
    <>
      <AlertDialog
        message={"Email with same name alreay exist "}
        visible={visible}
        setVisible={setVisible}
      />
      <AddMemeberPre createNewUser={createNewUser} />
    </>
  );
};

export default AddMemberContainer;
