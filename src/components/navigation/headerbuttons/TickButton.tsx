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
import {AntDesign} from "@expo/vector-icons";
//@ts-ignore
import tick from '@assets/icons/tick.png';
const TickButton = () => {
    const hasNotch = DeviceInfo.hasNotch();
    const navigation =useNavigation()
    return  <Box ph={10} mt={10}>
        <TouchableOpacity onPress={()=>{navigation.navigate('AddMember' as never)}} activeOpacity={1} style={[styles.backArrow]}>
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

