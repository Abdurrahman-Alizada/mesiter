import React from 'react';
import Popover from 'react-native-popover-view';
import {Image, Keyboard, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Box,
  Flex,
  ListItem,
  Text as PaperText,
} from '@react-native-material/core';
import DeviceInfo from "react-native-device-info";
import {useNavigation} from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const BackArrow = () => {
    const hasNotch = DeviceInfo.hasNotch();
    const navigation =useNavigation()
  return  <Box ph={10} mt={10}>
      <TouchableOpacity onPress={()=>{Keyboard.dismiss();navigation.goBack()}} activeOpacity={1} style={[styles.backArrow]}>
          <AntDesign name="arrowleft" size={24} color="grey" />
      </TouchableOpacity>
  </Box>
};


const styles=StyleSheet.create({

    backArrow:{

        backgroundColor:'white',
        height:40,
        width:40,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:7,
    },


})

export default BackArrow;
