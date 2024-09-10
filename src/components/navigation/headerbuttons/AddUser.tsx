import React from 'react';
import Popover from 'react-native-popover-view';
import {Image, Keyboard, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {
    Box,
    Flex,
    ListItem,
    Text as PaperText,
} from '@react-native-material/core';
import {useNavigation} from "@react-navigation/native";
//@ts-ignore
import plusicon from '@assets/icons/userplus.png';
const AddUser = () => {
    const navigation =useNavigation()
    return  <Box ph={10} mt={10}>
        <TouchableOpacity onPress={()=>{navigation.navigate('AddMember' as never)}} activeOpacity={1} style={[styles.backArrow]}>
            <Image source={plusicon} style={{height:24,width:24}} resizeMode={'contain'} />
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

export default AddUser;
