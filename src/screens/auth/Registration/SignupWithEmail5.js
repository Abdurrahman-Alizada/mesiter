import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput,
  Dialog,
  Text,
  Paragraph,
  Portal,
  Button,
  Checkbox,
  useTheme,
  TouchableRipple,
} from 'react-native-paper'; // Ensure Checkbox is imported
import {
  useRegisterUserMutation,
  useResendEmailForUserRegistrationMutation,
} from '../../../redux/reducers/user/userThunk';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import AuthAppbar from '../../../components/Appbars/AuthAbbar';
import GradientButton from '../../../components/GradientButton';

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
  const [selectedWorkoutOptions, setSelectedWorkoutOptions] = useState({}); // Store selected options

  const emailRef = useRef('');

  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const [resendEmailForUserRegistration, {isLoading: resendLoading}] =
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
        workoutFrequency: Object.keys(selectedWorkoutOptions).filter(
          key => selectedWorkoutOptions[key],
        ), // Include selected options
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
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <AuthAppbar title="Sign up today. Work tomorrow" />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.headerText}>CREATE PROFILE</Text>
        <Text style={styles.subHeaderText}>Dietary Preferences.</Text>

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
          onSubmit={(values, {resetForm}) => {
            submitHandler(values, {resetForm});
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
 onPress={() => {
                        setSelectedWorkoutOptions(prev => ({
                          ...prev,
                          [option.value]: !prev[option.value], // Toggle checkbox
                        }));
                      }}

                  key={index}
                  rippleColor="rgba(255, 255, 255, .32)"
                  style={styles.optionContainer}>

                    
                  <>
                  
                    <Text style={styles.optionText}>{option.label}</Text>
                    <Checkbox
                      status={
                        selectedWorkoutOptions[option.value]
                          ? 'checked'
                          : 'unchecked'
                      }
                    
                      color="lightgrey"
                      uncheckedColor="lightgrey"
                    />
                  </>
                </TouchableRipple>
              ))}
              <Checkbox.Item
                label="I don’t want follow a diet."
                color={'#839898'}
                labelStyle={styles.label}
                style={styles.checkboxItem}
                position="leading"
                status="checked"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('SignupWithEmail6')}
                style={{
                  alignItems: 'center',
                  marginTop: 80,
                }}></TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignupWithEmail6')}
                style={{alignItems: 'center', marginTop: 80}}>
                <GradientButton
                  textStyle={{color: '#fff', fontSize: 20, textAlign: 'center'}}
                  style={{
                    borderRadius: 20,
                    width: '65%',
                    height: 55,
                    top: -120,
                    justifyContent: 'center', // Centers the text vertically
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
  {label: 'Lazy Keto ', value: 'first'},
  {label: 'Gluten Free', value: 'second'},
  {label: 'Pescatarian ', value: 'third'},
  {label: 'Vegan', value: 'fourth'},
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
    // backgroundColor:
    // "black",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#989898',
    padding: 15,
    marginVertical: 8,
  },
  optionText: {
    color: '#989898',
    fontSize: 16,
  },
  label: {
    // color: '#FFFFFF',
    fontSize: 17,
    left: -40,
    top: 6,
  },
  checkboxItem: {
    top: 20,
    right: 20,
  },
});

export default SignupWithEmail4;
