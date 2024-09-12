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
//@ts-ignore
import tick from '../../../assets/icons/tick.png';

const TickButton = () => {
    const hasNotch = DeviceInfo.hasNotch();
    const navigation =useNavigation()
    return  <Box ph={10} mt={10}>
{/* { name: "Main", params: { screen: "FreeflexerStack", params: { screen: "FreeflexerHomeScreen" } } } */}
        {/* <TouchableOpacity onPress={()=>{navigation.navigate({name:"HomeStack",params: {name:"SettingRoutes", params:{ screen: 'AddMember'}}})}} activeOpacity={1} style={[styles.backArrow]}> */}
        <TouchableOpacity onPress={()=>navigation.navigate({ name: "HomeStack", params: { screen: "SettingRoutes", params: { screen: "AddMember" } } })} activeOpacity={1} style={[styles.backArrow]}>
            <Image source={tick} style={{height:40,width:40}} resizeMode={'contain'} />
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

export default TickButton;

