import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Dimensions } from "react-native";
import {useTheme} from "@react-navigation/native";
//@ts-ignore
import logo from '@assets/logo.jpeg';

const SplashScreenPre = () => {
  const { colors } = useTheme();


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
export default SplashScreenPre;
