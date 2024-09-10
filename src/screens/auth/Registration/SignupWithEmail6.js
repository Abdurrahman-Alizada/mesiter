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
  useTheme,
} from 'react-native-paper';
import {
  useRegisterUserMutation,
  useResendEmailForUserRegistrationMutation,
} from '../../../redux/reducers/user/userThunk';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import AuthAppbar from '../../../components/Appbars/AuthAbbar';
import GradientButton from '../../../components/GradientButton';
import { Checkbox } from 'react-native-paper';


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
        <Text style={styles.subHeaderText}>I Would Like To Avoid:.</Text>

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
              <Text style={{top: 25}}>Ingredients:</Text>
              <TextInput
                placeholder="Fish, Beans, ........."
                onChangeText={handleChange('firstOption')}
                value={values.firstOption}
                mode="outlined"
                theme={{roundness: 20}}
                style={{height: 60, marginTop: '9%'}}
                outlineColor={theme.colors.secondary}
              />
             
              <Text style={{top: 25}}>Meals/courses:</Text>

             
              <TextInput
                placeholder="Fish & chips, pizza, ........."
                onChangeText={handleChange('firstOption')}
                value={values.firstOption}
                mode="outlined"
                theme={{roundness: 20}}
                style={{height: 60, marginTop: '9%'}}
                outlineColor={theme.colors.secondary}
              />
              <Text style={{top: 10,color:"grey"}}>
                OBS: When writing foods to avoid (due to allergies or such),
                make sure to put a comma after every one. Like the example
                above.{' '}
              </Text>
              <Checkbox.Item label="I don’t have anything to avoid"
             color={"#839898"}
             labelStyle={styles.label}
             style={styles.checkboxItem}
              position="leading"
              status="checked" />
              <TouchableOpacity
                onPress={() => navigation.navigate('BottomTabs')}
                style={{alignItems: 'center', marginTop: 80}}>
                <GradientButton
                  textStyle={{color: '#fff', fontSize: 20, textAlign: 'center'}}
                  style={{
                    borderRadius: 20,
                    width: '65%',
                    height: 55,
                    justifyContent: 'center',
                    top:50, // Centers the text vertically
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
  textInput: {
    marginVertical: 15,
    backgroundColor: 'transparent',
    borderRadius: 20,
    color:"grey",
  },
  label: {
    // color: '#FFFFFF', 
    fontSize: 17, 
    left:-40,
    top:6,
  },
  checkboxItem: {

    top:20,
    right:20,
  
  },
});

export default SignupWithEmail4;
