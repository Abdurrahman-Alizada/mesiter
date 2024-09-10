import React from 'react';
//@ts-ignore
import notificationIcon from '@assets/icons/notification.png'
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Notifications = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity  onPress={()=>navigation.navigate('Notifications')} style={{marginRight:10, position:'relative',zIndex:-9999}}>
            <View style={styles.notificationCount}>
                <Text style={{color:'white'}}>2</Text>
            </View>
        <Image source={notificationIcon} style={{height:24,width:24}}/>

        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    notificationCount:{
        zIndex:1,
        backgroundColor:'red',
        height:20,
        width:20,
        position:'absolute',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:50,
        top:-10,
        right:-3,
    }

})

export default Notifications;
