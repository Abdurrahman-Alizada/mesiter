import React from "react";
import { View,Text,StyleSheet } from "react-native";
import normalize from "../../utils/normalize";

const SingleChip = ({count=7256,status='Present',type='red'}) => {
  return (
        <View style={[styles.container,{borderLeftWidth:7,borderColor:type === 'red' ? '#CC3017' : '#0FD97E' ,
          backgroundColor:type === 'red' ? 'rgba(204, 48, 23, 0.10)' :'rgba(15, 217, 126, 0.10)' }]}>
          <Text style={styles.number}>{count}</Text>
          <Text style={styles.status}>{status}</Text>

        </View>
  );
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:8,
    margin:10,
    borderRadius:7,
    borderBottomLeftRadius:4,
    borderTopLeftRadius:4,

  },
  status:{
    color:'#40302A',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(10),
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.4,
    opacity:0.7,

  },

  number:{
    color:'#40302A',
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(12),
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 1,

  }







})
export default SingleChip;
