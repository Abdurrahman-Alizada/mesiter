import React, { useRef, useState } from 'react';
import { StyleSheet, StatusBar, View, ScrollView } from 'react-native';

import {
  TextInput,
  Dialog,
  Text,
  Paragraph,
  Portal,
  Button,
  useTheme,
} from 'react-native-paper';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import GradientText from '../../../components/GradientText';
import GradientButton from '../../../components/GradientButton';
import {
  useRegisterUserMutation,
  useResendEmailForUserRegistrationMutation,
} from '../../../redux/reducers/user/userThunk';
import AuthAppbar from '../../../components/Appbars/AuthAbbar'; // Adjust import path as needed
import { TextInput as PaperTextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { height, width } from '../../../GlobalStyles';
import SocialLogin from '../Login/SocialLogin';
import GradientIconButton from '../../../components/GradientIconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Google icon
import WorkoutsScreensAppbar from '../../../components/Appbars/WorkoutsScreensAppbar';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('* Email is required')
    .label('Email'),
  addressLine1: Yup.string()
    .required('* Address line 1 is required')
    .label('Address line 1'),
  addressLine2: Yup.string().label('Address line 2'),
  addressLine3: Yup.string().label('Address line 3'),
  postCode: Yup.string().label('Post code'),
  city: Yup.string().label('City'),
  firstName: Yup.string().label('First name'),
  surName: Yup.string().label('Sur name'),
});

const SignupWithEmail = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const emailRef = useRef('');

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [resendEmailForUserRegistration, { isLoading: resendLoading }] =
    useResendEmailForUserRegistrationMutation();

  const submitHandler = async (values, formikBag) => {
    emailRef.current = values.email;
    try {
      const res = await registerUser({
        email: values.email,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        addressLine3: values.addressLine3,
        postCode: values.postCode,
        city: values.city,
        firstName: values.firstName,
        surName: values.surName,
      });
      if (res.error?.status === 409) {
        setMessage(res.error?.data?.message || 'Conflict');
        setShowLoginButton(false);
        setShowTryAgainButton(!res.error?.data?.verified);
        setVisible(true);
      } else if (
        res.data?.message === 'An Email sent to your account please verify'
      ) {
        formikBag.resetForm();
        setMessage(
          `An Email sent to ${emailRef.current}. Please verify and then login`,
        );
        setShowTryAgainButton(false);
        setShowLoginButton(true);
        setVisible(true);
      } else {
        setShowTryAgainButton(true);
        setShowLoginButton(true);
        setMessage('Something went wrong');
        setVisible(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const resendEmail = () => {
    resendEmailForUserRegistration({
      email: emailRef.current,
    })
      .then(res => {
        if (res.error?.status === 409) {
          setMessage(res.error?.data?.message || 'Conflict');
          setVisible(true);
        } else if (
          res.data?.message === 'An Email sent to your account please verify'
        ) {
          formikRef.current.resetForm();
          setMessage(
            'An email sent to your account. Please verify and then login',
          );
          setShowTryAgainButton(false);
          setShowLoginButton(true);
          setVisible(true);
        } else {
          setShowTryAgainButton(true);
          setShowLoginButton(true);
          setMessage('Something went wrong');
          setVisible(true);
        }
      })
      .catch(err => {
        console.error('Error resending email:', err);
      });
  };

  const formikRef = useRef();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, paddingTop: "10%", backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" />
      <WorkoutsScreensAppbar isMain={true} title={"CREATE PROFILE"} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: '5%', paddingBottom: '5%' }}
        showsVerticalScrollIndicator={false}>

        <Formik
          innerRef={formikRef}
          initialValues={{
            email: '',
            addressLine1: '',
            addressLine2: '',
            addressLine3: '',
            postCode: '',
            city: '',
            firstName: '',
            surName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            submitHandler(values, { resetForm });
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                  <Dialog.Title>Sign up</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>{message}</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    {showTryAgainButton && (
                      <Button
                        onPress={() => {
                          setVisible(false);
                          resendEmail();
                        }}>
                        Resend Email
                      </Button>
                    )}
                    {showLoginButton && (
                      <Button
                        onPress={() => {
                          setVisible(false);
                          navigation.navigate('Login');
                        }}>
                        Go to login
                      </Button>
                    )}
                    <Button
                      onPress={() => {
                        setVisible(false);
                        emailRef.current = '';
                      }}>
                      Close
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Text style={{ fontSize: 18, marginVertical: '5%', textAlign: "center", fontWeight: '700' }}>
              CREATE PROFILE
              </Text>
              <Text style={{ fontSize: 18, marginVertical: '2%', textAlign: "center",  }}>
              Register Information
              </Text>
              <Text style={{ fontWeight: '800', marginBottom: '2%' }}>Email</Text>
              <TextInput
                placeholder="Email address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                mode="outlined"
                theme={{ roundness: 20 }}
                style={{ height: 60, marginTop: '9%' }}
                outlineColor={theme.colors.secondary}
              />
              {errors.email && touched.email && (
                <Text style={{ color: 'red' }}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Full name"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                mode="outlined"
                theme={{ roundness: 20 }}
                style={{ height: 60, marginTop: '3%', marginTop: 20 }}
                outlineColor={theme.colors.secondary}
              />
              {errors.email && touched.email && (
                <Text style={{ color: 'red' }}>{errors.email}</Text>
              )}

              <PaperTextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                mode="outlined"
                secureTextEntry={!passwordVisible}
                theme={{ roundness: 20 }}
                style={{ height: 60, marginTop: 20 }}
                outlineColor={theme.colors.secondary}
                right={
                  <PaperTextInput.Icon
                    icon={passwordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
              {errors.password && touched.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}

              <PaperTextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                mode="outlined"
                secureTextEntry={!passwordVisible}
                theme={{ roundness: 20 }}
                style={{ height: 60, marginTop: 20 }}
                outlineColor={theme.colors.secondary}
                right={
                  <PaperTextInput.Icon
                    icon={passwordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
              {errors.password && touched.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}

              <TextInput
                placeholder="username"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                mode="outlined"
                theme={{ roundness: 20 }}
                style={{ height: 60, marginTop: '3%', marginTop: 20 }}
                outlineColor={theme.colors.secondary}
              />
              {errors.email && touched.email && (
                <Text style={{ color: 'red' }}>{errors.email}</Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '2%',
                }}></View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: "5%"
                }}>
                <GradientIconButton
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 40,
                    left: 20,
                    borderWidth: 1,
                    borderColor: '#555',
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: 'transparent',
                  }}>
                  <TouchableOpacity style={{}}>
                    <MaterialCommunityIcons
                      name="facebook"
                      size={24}
                      color="#ffffff"
                    />
                  </TouchableOpacity>
                </GradientIconButton>



                <GradientIconButton
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#555',
                    width: 50,
                    height: 50,
                    left: 2,

                    borderRadius: 10,
                    backgroundColor: 'transparent',
                  }}>
                  <TouchableOpacity style={{}}>
                    <MaterialCommunityIcons
                      name="google"
                      size={24}
                      color="#ffffff"
                    />
                  </TouchableOpacity>
                </GradientIconButton>
                <GradientIconButton
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#555',
                    left: 10,

                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: 'transparent',
                  }}>
                  <TouchableOpacity style={{}}>
                    <MaterialCommunityIcons
                      name="apple"
                      size={24}
                      color="#ffffff"
                    />
                  </TouchableOpacity>
                </GradientIconButton>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpwithEmail2')}>

                <GradientButton
                  textStyle={{ color: '#fff', fontSize: 20, top: 10 }}
                  style={{
                    //padding: '5%',
                    alignItems: 'center',
                    // marginTop: 90,
                    borderRadius: 20,
                    top: 10,
                    width: '60%',
                    height: '25%',
                    left: 65,
                  }}
                  text={'Next'}
                />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default SignupWithEmail;
