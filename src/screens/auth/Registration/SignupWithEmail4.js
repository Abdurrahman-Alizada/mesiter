

import React, { useRef, useState } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, TouchableOpacity } from 'react-native';
import {
  TextInput,
  Dialog,
  Text,
  Paragraph,
  Portal,
  Button,
  RadioButton,
  useTheme,
  TouchableRipple,
} from 'react-native-paper';
import { useRegisterUserMutation, useResendEmailForUserRegistrationMutation } from '../../../redux/reducers/user/userThunk';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import AuthAppbar from '../../../components/Appbars/AuthAbbar';
import GradientButton from '../../../components/GradientButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Google icon

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

const SignupWithEmail4 = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const [gender, setGender] = useState('male');
  const [workoutFrequency, setWorkoutFrequency] = useState('first');

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
        gender: gender, // Include gender in the request
        workoutFrequency: workoutFrequency, // Include workout frequency in the request
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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AuthAppbar title="Sign up today. Work tomorrow" />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.headerText}>CREATE PROFILE</Text>
        <Text style={styles.subHeaderText}>Tell us about your goals.</Text>

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

           
              {workoutOptions.map((option, index) => (
                <TouchableRipple
                  key={index}
                  onPress={() => setWorkoutFrequency(option.value)}
                  rippleColor="rgba(255, 255, 255, .32)"
                  style={[
                    styles.optionContainer,
                    workoutFrequency === option.value && styles.selectedOption,
                  ]}
                >
                  <>
                    <Text style={styles.optionText}>{option.label}</Text>
                    <RadioButton
                      value={option.value}
                      status={workoutFrequency === option.value ? 'checked' : 'unchecked'}
                      onPress={() => setWorkoutFrequency(option.value)}
                      color="lightgrey"
                      uncheckedColor="lightgrey"
                    />
                  </>
                </TouchableRipple>
              ))}

             
<TouchableOpacity
  onPress={() => navigation.navigate('SignupWithEmail5')}
  style={{ alignItems: 'center', marginTop: 80 }}
>
  <GradientButton
    textStyle={{ color: '#fff', fontSize: 20,textAlign:"center" }}
    style={{
      borderRadius: 20,
      width: '65%',
      height: 55,
      justifyContent: 'center', 
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

const workoutOptions = [
  { label: 'Lose Weight ', value: 'first' },
  { label: 'Gain Weight', value: 'second' },
  { label: 'Gain Muscle ', value: 'third' },
  { label: 'Maintain Weight', value: 'fourth' },
  { label: 'Use without a goal', value: 'fourth' },

];

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: '5%',
    paddingBottom: '5%',
  },
  headerText: {
    fontSize: 18,
    marginVertical: '5%',
    textAlign: 'center',
    fontWeight: '700',
  },
  subHeaderText: {
    fontSize: 18,
    marginVertical: '2%',
    textAlign: 'center',
    color: '#767676',
    marginTop: -2,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'black',
    borderRadius: 20,
    borderWidth: 2, // Adjust thickness here
    borderColor: 'grey', // Change to your preferred border color
    padding: 10,
    marginVertical: 8,
    
},

  selectedOption: {
    // backgroundColor: '#050505',
  },
  optionText: {
    color: '#ccc',
    fontSize: 16,
  },
  submitButtonContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign:"center",
    top:10,
  },
  submitButton: {
    width: 250,
    borderRadius: 20,
    height: 50,
    top:10,
  },
});

export default SignupWithEmail4;


