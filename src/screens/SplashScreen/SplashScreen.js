import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { handleCurrentLoaginUser } from '../../redux/reducers/user/userReducer';
import logo from '../../assets/logo.jpeg';

const SplashScreen = ({ navigation }) => {
  const isAppFirstLaunched = useRef(true);
  const userRole = useRef(null);
  const dispatch = useDispatch()
 

  useEffect(() => {
    const firstLaunch = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched1');
      if (appData) {
        isAppFirstLaunched.current = false;
      } else {
        isAppFirstLaunched.current = true;
        await AsyncStorage.setItem('isAppFirstLaunched1', '1');
      }
    };
    firstLaunch();
  }, []);

  useEffect(() => {
    const userRoleHandler = async () => {
      const role = await AsyncStorage.getItem('role');
      userRole.current = role;
    };
    userRoleHandler();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        let screenTo = "Onboarding";

        if (isAppFirstLaunched.current) {
          screenTo = { name: "Onboarding" };
        } else if (!isLoggedIn) {
          screenTo = { name: "WelcomeScreen" };
        }
        //  else if (isLoggedIn && userRole.current === "freeflexer") {
        //   screenTo = { name: "Main", params: { screen: "FreeflexerStack", params: { screen: "FreeflexerHomeScreen" } } };
        // }

        navigation.replace(screenTo.name, screenTo.params);
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      checkLoginStatus();
    }, 2000);
  
  }, []);

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const email = await AsyncStorage.getItem('email');
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      const role = await AsyncStorage.getItem('role');
      dispatch(handleCurrentLoaginUser({ email: email, token: token, id: userId, role: role }))
    }
    getUserInfo()
  })
 

  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = () => {
      rotateValue.setValue(0);
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000, // Adjust duration for speed
        useNativeDriver: true,
      }).start(() => rotateAnimation());
    };

    rotateAnimation();
  }, [rotateValue]);

 
  return (
    <View style={[styles.ImageView,{backgroundColor:'#F7F7F7'}]}>
        <Image source={logo} resizeMode={'contain'} style={{height:200}}/>
      </View>
  );
};

const styles = StyleSheet.create({
  ImageView: {
    flex: 1,
    // backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoImage: {
    height: 250,
    width: 300,
  },
});

export default SplashScreen;
