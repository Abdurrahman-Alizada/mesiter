import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/Login/LoginScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />

      {/* <Stack.Screen
        name="SignUpwithEmail"
        options={{
          presentation: 'modal',
          headerShown: false,
          title: 'Sign up with email',
        }}
        component={SignUpwithEmail}
      /> */}
     
    </Stack.Navigator>
  );
};

export default AuthStack;
