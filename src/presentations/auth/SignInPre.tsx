import React, {useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View,Text} from "react-native";
import {Box} from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
import {sanFranciscoWeights} from "react-native-typography";
import normalize from "../../utils/normalize";
import {TextInput} from "react-native-paper";
import * as yup from 'yup';
import {Formik} from 'formik';
import CustomTextInput from "../../components/CustomTextInput";
import {CommonActions, useNavigation} from "@react-navigation/native";
import CustomDialog from "@components/signin/CustomDialog";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userActions";

import {UIActivityIndicator} from "react-native-indicators";
const SignInPre = () => {
    const navigation =useNavigation()

    const dispatch  = useDispatch()

    const [visible,setVisible] = useState(false)
    const validationSchema=yup.object().shape({
        //email:yup.string().label("email").required("Email is required").email('Insert a valid email addresss'),
        email:yup.string().label("email"),
        password: yup.string().label("Password").required(),
    })

    //@ts-ignore
    const handleSubmit = (values, actions) => {
     

    };


    return (
        <>
            <CustomDialog visible={visible}  setVisible={setVisible}/>

        <View style={styles.container}>
            <Box ph={10} mt={10}>
                <TouchableOpacity onPress={()=>{Keyboard.dismiss();navigation.goBack()}} activeOpacity={1} style={[styles.backArrow]}>
                    <AntDesign name="arrowleft" size={24} color="grey" />
                </TouchableOpacity>
            </Box>

            <Box mt={30} ph={20}>
                <Text  style={[{fontFamily:'Poppins-Regular',fontWeight:'400',lineHeight:32,fontSize:normalize(24),letterSpacing:1,color:'#40302A'}]}>
               Welcome Back!</Text>
                <Box mt={8} >
                    <Text style={[{fontFamily:'Poppins-Regular',fontWeight:'400',lineHeight:25,fontSize:normalize(12),letterSpacing:0.4,color:'#40302A'}]}>
                    To log in, enter your authorized email and password</Text>
                </Box>
            </Box>
            <View style={{flex:1,padding:20,}}>
            <View style={styles.card}>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    onSubmit={(values, actions) => handleSubmit(values, actions)}
                    validationSchema={validationSchema}
                >
                    {formikprops => (
                        <View style={{padding:10}}>

                        <Box mt={0} p={2} ph={2}>
                            <Text  style={{marginBottom:5}} >Your Email</Text>
                            <CustomTextInput
                                formikProps={formikprops}
                                formiKey={'email'}
                                placeholder={"Email"}
                                iconName={'email'}
                                isRightIcon={false}
                                secureTextEntry={false}
                            />
                        </Box>

                        <Box mt={0}>
                            <Text   style={{marginBottom:5}}>Password</Text>
                    <CustomTextInput

                        formikProps={formikprops}
                        formiKey={'password'}
                        placeholder={"Password"}
                        iconName={'password'}
                        isRightIcon={true}


                    />
                </Box>
                    <Box mt={20} ph={20}>
                        {/*//@ts-ignore*/}
                        {formikprops.isSubmitting ?
                        <TouchableOpacity onPress={formikprops.handleSubmit} activeOpacity={1} style={[styles.button,{  backgroundColor:'#0B335C',}]}>
                            <UIActivityIndicator color={'white'} size={20}/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={formikprops.handleSubmit} activeOpacity={1} style={[styles.button,{  backgroundColor:'#0B335C',}]}>
                            <Text style={[sanFranciscoWeights.bold,{color:'white'}]}>Sign in</Text>
                        </TouchableOpacity>

                        }


                    </Box>
                        </View>
                    )}


                    </Formik>

                <View style={{ marginTop:20, alignItems:'center',justifyContent:'center',paddingHorizontal:normalize(5)}}>
                    <Text style={[{fontFamily:'Poppins-Regular',fontWeight:'400',lineHeight:20,fontSize:normalize(13),letterSpacing:0.25,color:'#40302A'}]}>
                        Want to authorize your account?
                    </Text>
                    <TouchableOpacity onPress={()=>setVisible(true)}>

                        <Text style={[{fontFamily:'Poppins-Regular',fontWeight:'500',lineHeight:20,fontSize:normalize(13),letterSpacing:0.5,color:'#012547'}]}>
                        Request for login
                    </Text>
                    </TouchableOpacity>




                </View>

            </View>
            </View>

        </View>
        </>
    );
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

export default SignInPre;
