import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, Text, ImageBackground, StatusBar, Animated, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const Onboarding = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  return (
    <ImageBackground
      source={require("../../assets/bakgrund.png")}
      style={{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />

      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'AnekBangla' }}>
          WELCOME TO
        </Text>
        <Text style={{ fontSize: 30, color: '#fff', fontFamily: 'Modak-Regular' }}>
          PREFORMLY
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("WelcomeScreen")} style={{width:"60%", padding: 12, alignItems:"center",marginTop:10, backgroundColor:theme.colors.primary, borderRadius:10}}>
          <Text style={{ color: "#fff" }}>Continue to app</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;
