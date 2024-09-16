import React, { useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Box } from "@react-native-material/core";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as yup from 'yup';
import { Formik } from 'formik';
import CustomTextInput from "../../../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import CustomDialog from "../../../components/signin/CustomDialog.tsx";
import { useDispatch } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";
import normalize from '../../../utils/normalize';
import { useLoginUserMutation } from '../../../redux/reducers/user/userThunk.js';
import { handleCurrentLoaginUser } from '../../../redux/reducers/user/userReducer.js';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInPre = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [dialogueVisible, setDialogueVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Something went wrong');
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup.string().label("email").required(),
        password: yup.string().label("Password").required(),
    });

    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

    const handleSubmit = async (values, actions) => {
        try {
            const response = await loginUser({
                email: values.email,
                password: values.password,
            });
            console.log("res is", response)
            if (response.data?.success) {
                if (response?.data?.user) {
                    const user = response?.data?.user
                    dispatch(handleCurrentLoaginUser(user));
                    await AsyncStorage.setItem('role', user.role);
                    await AsyncStorage.setItem('token', user.token);
                    await AsyncStorage.setItem('userId', user.id);
                    await AsyncStorage.setItem('email', user.email);
                    await AsyncStorage.setItem('fullName', user.fullName);
                    await AsyncStorage.setItem('isLoggedIn', 'login');
                    actions.resetForm();
                    navigation.replace("TabNavigation");
                }
                if (response?.data?.message) {
                    setErrorMessage(response?.data?.message);
                    setDialogueVisible(true);
                }
            } else {
                setErrorMessage(response?.error?.data?.message);
                setDialogueVisible(true);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <CustomDialog visible={visible} setVisible={setVisible} />
            <View style={styles.container}>
                <Box ph={10} mt={10}>
                    <TouchableOpacity onPress={() => { Keyboard.dismiss(); navigation.goBack(); }} activeOpacity={1} style={styles.backArrow}>
                        <AntDesign name="arrowleft" size={24} color="grey" />
                    </TouchableOpacity>
                </Box>

                <Box mt={30} ph={20}>
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                    <Box mt={8}>
                        <Text style={styles.instructionText}>To log in, enter your authorized email and password</Text>
                    </Box>
                </Box>

                <View style={styles.formContainer}>
                    <View style={styles.card}>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {formikprops => (
                                <View style={styles.formWrapper}>
                                    <Box mt={0} p={2} ph={2}>
                                        <Text style={styles.label}>Your Email</Text>
                                        <CustomTextInput
                                            formikProps={formikprops}
                                            formiKey="email"
                                            placeholder="Email"
                                            iconName="email"
                                            LeftIcon="email"
                                            secureTextEntry={false}
                                        />
                                    </Box>

                                    <Box mt={16}>
                                        <Text style={styles.label}>Password</Text>
                                        <CustomTextInput
                                            formikProps={formikprops}
                                            formiKey="password"
                                            placeholder="Password"
                                            iconName="password"
                                            LeftIcon="password"
                                            isRightIcon
                                            secureTextEntry
                                        />
                                    </Box>

                                    <Box mt={20} ph={20}>
                                        <TouchableOpacity onPress={formikprops.handleSubmit} activeOpacity={1} style={styles.button}>
                                            {formikprops.isSubmitting ? (
                                                <UIActivityIndicator color="white" size={20} />
                                            ) : (
                                                <Text style={styles.buttonText}>Sign in</Text>
                                            )}
                                        </TouchableOpacity>
                                    </Box>
                                </View>
                            )}
                        </Formik>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Want to authorize your account?</Text>
                            <TouchableOpacity onPress={() => setVisible(true)}>
                                <Text style={styles.requestLoginText}>Request for login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <Portal>
                <Dialog visible={dialogueVisible} onDismiss={() => setDialogueVisible(false)}>
                    <Dialog.Title>Login</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            {errorMessage} {isError && error?.error}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogueVisible(false)}>Ok</Button>
                        <Button onPress={() => {
                            setDialogueVisible(false)
                            setVisible(true)
                        }}>Request for login</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    backArrow: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    welcomeText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        lineHeight: 32,
        fontSize: normalize(24),
        letterSpacing: 1,
        color: '#40302A',
    },
    instructionText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        lineHeight: 25,
        fontSize: normalize(12),
        letterSpacing: 0.4,
        color: '#40302A',
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    card: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 30,
        borderRadius: 20,
        backgroundColor: '#FFFEFA',
    },
    formWrapper: {
        padding: 10,
    },
    label: {
        marginBottom: 5,
    },
    button: {
        height: 45,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B335C',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: normalize(5),
    },
    footerText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        lineHeight: 20,
        fontSize: normalize(14),
        letterSpacing: 0.25,
        color: '#40302A',
    },
    requestLoginText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        lineHeight: 20,
        fontSize: normalize(12),
        letterSpacing: 0.5,
        color: '#012547',
        marginTop: 4,
    },
});

export default SignInPre;
