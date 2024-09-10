import React from 'react';
import {View,Text,StyleSheet} from 'react-native'
import {createShimmerPlaceholder} from "react-native-shimmer-placeholder";
import LinearGradient from 'react-native-linear-gradient';
import normalize from '../../utils/normalize';



const EmployeeCardShimmer = ({isLoaded}) => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    return (
        <View style={[styles.card,{alignItems:'center',justifyContent:'center',padding: 24, height:200, paddingTop: 24, paddingRight: 16, paddingBottom: 24, paddingLeft: 16}]}>
        <ShimmerPlaceholder
            visible={!isLoaded}
            style={{margin:10,height:120,width:120,borderRadius:120,}}></ShimmerPlaceholder>
            <ShimmerPlaceholder
                visible={!isLoaded}
                style={{margin:10,height:10,width:100,borderRadius:120,}}></ShimmerPlaceholder>
            <ShimmerPlaceholder
                visible={!isLoaded}
                style={{height:10,width:50,borderRadius:10,}}></ShimmerPlaceholder>
        </View>
    );
}

const styles=StyleSheet.create({
    card:{
        margin:10,
        marginTop:normalize(10),
        // backgroundColor:'red',
        backgroundColor:'white',
        shadowColor: 'white',
        borderRadius:10,
        shadowOpacity: 0.5,
        elevation:20,
        margin:10,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        padding: 5,
        paddingBottom:20,
    },
})
export default EmployeeCardShimmer;