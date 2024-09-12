import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as yup from "yup";
import {Formik} from "formik";
import {Box} from "@react-native-material/core";
import {sanFranciscoWeights} from "react-native-typography";
import SingleInput from "../../components/profilecard/SingleInput";
import trash from '../../assets/icons/trash.png';
import {useTranslation} from "react-i18next";
import RoleDropDown from "../../../components/RoleDropDown";
// import {UserRoles} from "@config/constants";
import RoleInput from "../../components/profilecard/RoleInput";
import {showMessage} from "react-native-flash-message";
// import {DebugConsole} from "@utils/debuggingHelpers";
import {UIActivityIndicator} from "react-native-indicators";

interface  Types{
    data?:[]
    deleteHandler?:Function
}

const UserForm:React.FC<Types> = ({data,deleteHandler=()=>{}}) => {
    const {t} =useTranslation()
    const [deleteLoader,setDeleteLoader] =useState(false)

    const validationSchema=yup.object().shape({
        name:yup.string().label("name").required("Name of Person is required"),
        role:yup.string().label("role").required("Role is required"),
        phone:yup.number().label("phone").required("Phone Number is required"),
        email:yup.string().label("email").required("Email  is required").email('Please enter a valid email'),
        appLoginPassword:yup.string().required("Password is requried").min(8,'Password min 8 Characters Long').max(16,'Password max 16 Characters Long')
            .test(
                'password-validation',
                'Password must contain at least one uppercase letter and one special character',
                value => {
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
    })



    const updateUserProfile= (values:any)=>{

        return new Promise((resolve,reject)=>{
     



                })

    }





    const handleSubmit = (values, actions) => {
        console.log("see mer")
        actions.setSubmitting(true)
        //submit form here
        updateUserProfile(values).then((res:any)=>{
            console.log("Promise resolve",res)
            showMessage({
                message: 'User Updated Successfully',
                type: 'success',
                animated: true,
                animationDuration: 200,
                statusBarHeight: -10,
                icon: 'success',
                duration: 6000,
            });
            // actions.resetForm(initValues);
        }).catch((err:any)=>{
            if(err !=404){

                showMessage({
                    message: 'Something went wrong try again later',
                    type: 'danger',
                    animated: true,
                    animationDuration: 200,
                    statusBarHeight: -10,
                    icon: 'success',
                    duration: 6000,
                });
                DebugConsole('inside the USer form ',err)
            }

        }).finally(()=>actions.setSubmitting(false))
        console.log("value",values)


    };

    useEffect(()=>{
        console.log("see",UserRoles.filter((item)=>item.id === data?.role).map((v)=>v.id)?.[0])
    },[])

    return (
        <Formik
            initialValues={{
                name: data?.name,
                role: UserRoles.filter((item)=>item.id === data?.role).map((v)=>v.id)?.[0],
                email: data?.email,
                phone:data?.phone,
                appLoginPassword:data?.appLoginPassword,
            }}
            onSubmit={(values, actions) => handleSubmit(values, actions)}
            validationSchema={validationSchema}
        >
            {formikprops => (
                <View style={{marginTop:10}}>

                        <SingleInput
                            formikProps={formikprops}
                            label={t('name')}
                            formiKey={'name'}
                            placeholder={formikprops.values.name}
                            isRightIcon={true}
                            secureTextEntry={false}

                        />
                    <Box mt={10}>
                    <RoleInput
                            formikProps={formikprops}
                            label={t('role')}
                            formiKey={'role'}
                            placeholder={"---"}
                            isRightIcon={true}
                            secureTextEntry={false}

                        />



                    </Box>
                    <Box mt={10}>
                        <SingleInput
                            formikProps={formikprops}
                            label={'Email'}
                            formiKey={'email'}
                            placeholder={"----"}
                            isRightIcon={true}
                            secureTextEntry={false}

                        />
                    </Box>

                    <Box mt={10}>
                        <SingleInput
                            formikProps={formikprops}
                            label={t('phone')}
                            formiKey={'phone'}
                            placeholder={"-----"}
                            isRightIcon={true}
                            secureTextEntry={false}


                        />
                    </Box>

                    <Box mt={10}>
                        <SingleInput
                            formikProps={formikprops}
                            label={t('app-login-password')}
                            formiKey={'appLoginPassword'}

                            isRightIcon={true}
                            secureTextEntry={true}

                        />
                    </Box>


                    <Box mt={20} ph={20}>

                        {formikprops.isSubmitting ?

                            <TouchableOpacity activeOpacity={1} style={[styles.button,{  backgroundColor:'#9F9793',}]}>
                                 <UIActivityIndicator color={'white'} size={20}/>
                            </TouchableOpacity>
                            :

                            <TouchableOpacity onPress={!deleteLoader ? formikprops.handleSubmit :""} activeOpacity={1} style={[styles.button,{  backgroundColor:'#9F9793',}]}>
                                <Text style={[sanFranciscoWeights.bold,{color:'white'}]}>Update Setting</Text>
                            </TouchableOpacity>

                        }

                    </Box>



                    <Box mt={10} ph={20}>
                        {/*//@ts-ignore*/}
                        {deleteLoader ?

                            <TouchableOpacity onPress={()=>console.log("sss")} activeOpacity={1} style={[styles.button,{flexDirection:'row',borderWidth:1,  borderColor:'##CC3017',}]}>
                                 <UIActivityIndicator color={'black'} size={20}/>
                            </TouchableOpacity>
                            :

                            <TouchableOpacity onPress={()=>{
                                setDeleteLoader(true)
                                deleteHandler(data)
                            }} activeOpacity={1} style={[styles.button,{flexDirection:'row',borderWidth:1,  borderColor:'##CC3017',}]}>
                                <Image source={trash} style={{height:24,width:24}} />
                                <Text style={[sanFranciscoWeights.bold,{color:'#CC3017'}]}>Remove from system</Text>
                            </TouchableOpacity>

                        }



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
export default UserForm;
