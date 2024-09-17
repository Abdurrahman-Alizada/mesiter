import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as yup from "yup";
import {Formik} from "formik";
import {Box} from "@react-native-material/core";
import {sanFranciscoWeights} from "react-native-typography";
import SingleInput from "../../components/employedetails/SingleInput";
import trash from '../../assets/icons/trash.png';

const EmployeForm = () => {
  const validationSchema=yup.object().shape({
    // email:yup.string().label("email").required("Email is required").email('Insert a valid email addresss'),
    // password: yup.string().label("Password").required(),
  })
  const handleSubmit = (values, actions) => {
    //submit form here

  };


  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      validationSchema={validationSchema}
    >
      {formikprops => (
        <View style={{marginTop:10}}>

          <SingleInput
            formikProps={formikprops}
            label={'Name'}
            formiKey={'email'}
            placeholder={"Employ Name or Other Admin"}
            isRightIcon={true}
            secureTextEntry={false}
            editable={false}
          />
          <Box mt={10}>
            <SingleInput
              formikProps={formikprops}
              label={'Role'}
              formiKey={'email'}
              placeholder={"Employ"}
              isRightIcon={true}
              secureTextEntry={false}
              editable={false}
            />
          </Box>
          <Box mt={10}>
            <SingleInput
              formikProps={formikprops}
              label={'Email'}
              formiKey={'email'}
              placeholder={"person@gmail.com"}
              isRightIcon={true}
              secureTextEntry={false}
              editable={false}
            />
          </Box>

          <Box mt={10}>
            <SingleInput
              formikProps={formikprops}
              label={'Phone'}
              formiKey={'email'}
              placeholder={"+921223356345"}
              isRightIcon={true}
              editable={false}

            />
          </Box>

          <Box mt={10}>
            <SingleInput
              formikProps={formikprops}
              label={'Total Hrs in  August'}
              formiKey={'email'}
              placeholder={"704H 32M"}
              isRightIcon={true}
              editable={false}
            />
          </Box>



        </View>
      )}


    </Formik>

  )
}
const styles=StyleSheet.create({
  container: {
    flex:1,

    backgroundColor:'#F4F4F4',
  },
  card:{
    paddingHorizontal:10,
    paddingVertical:10,
    paddingBottom:30,
    borderRadius:20,
    backgroundColor:'#FFFEFA'
  },
  backArrow:{

    backgroundColor:'white',
    height:50,
    width:50,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius:7,
  },

  input:{
    backgroundColor:'red'
  },
  button:{


    height:45,
    borderRadius:7,
    justifyContent:'center',
    alignItems:'center'
  }
})
export default EmployeForm;
