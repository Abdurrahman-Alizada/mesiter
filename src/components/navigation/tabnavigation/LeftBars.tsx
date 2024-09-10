import React from 'react';
import barsIcon from '@assets/icons/bars.png'
import {Image, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
const LeftBars = () => {
    const navigation =useNavigation()
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('SettingRoutes')}>

        <Image source={barsIcon} style={{marginLeft:10,height:24,width:24}}/>
        </TouchableOpacity>
    )
}

export default LeftBars;
