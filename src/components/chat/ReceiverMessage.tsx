import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,Image,Text
} from 'react-native';
import receiverImage from '../../assets/receiver.png'

import senderImage from "../../assets/sender.png";
import trash from "../../assets/icons/trash.png";
import normalize from '../../utils/normalize';
export const ReceiverMessage = ({msg}) => {





  useEffect(() => {

  }, []);

  return (
    <>
    <View
      style={[
        styles.firstView,
        {backgroundColor: '#FFFEFA', marginBottom: 1},
      ]}>


      <Image
        resizeMode={'contain'}
        source={senderImage}
        style={{height: 24, width: 24,marginTop:2}}
      />
      <View style={{paddingHorizontal:10,justifyContent:'center'}}>
        <Text style={[styles.text,{marginTop:3,marginRight:2,textAlign:'justify'}]}>{msg.message}</Text>
      </View>
    </View>

  <View style={{backgroundColor:'#FFFEFA',flexDirection:'row',justifyContent:'space-around',width:'70%',marginTop:5}}>
    <Text style={styles.typo}>{msg.date}</Text>
    <Text style={[styles.typo,{marginLeft:10}]}>{msg.time}</Text>
    <Image source={trash} style={{height:20,width:20,transform:[{scale:1.3}]}} />
  </View>
    </>


  );
};


const styles = StyleSheet.create({
  firstView: {
    flexDirection:'row',
    maxWidth: '70%',
    padding: 5,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    elevation:20,
    shadowOpacity: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
    padding: 5,
    paddingHorizontal: 15,
    paddingBottom:20,
    borderWidth:0.4,
    borderColor:"rgba(0, 0, 0, 0.08)"
  },


  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: normalize(10),
    color: '#40302A',
    marginLeft:10,
    fontWeight:'400',
    fontFamily: "Poppins-Regular",
    lineHeight:16,
    letterSpacing:0.4,
  },

});
