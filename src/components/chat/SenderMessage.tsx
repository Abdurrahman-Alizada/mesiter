import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
// import senderImage from "../../assets/sender.png";
import senderImage from "../../assets/sender.png";

import trash from "../../assets/icons/trash.png";
import normalize from "../../utils/normalize";
const SenderMessage = ({msg}) => (
  <>
  <View
    style={[
      styles.firstView,
      {backgroundColor: '#005E98', marginBottom: 1,marginTop:10},
    ]}>



    <View style={{paddingHorizontal:0}}>
      <Text style={[styles.text,{color:'#FFFEFA',marginTop:3,marginRight:2,textAlign:'justify'}]}>{msg.message}</Text>
    </View>
  </View>
<View style={{backgroundColor:'white',flexDirection:'row',justifyContent:'space-around',width:'75%',marginLeft:10,backgroundColor:'#FFFEFA'}}>
  <Image source={trash} style={{height:20,width:20,transform:[{scale:1.3}]}} />
  <Text style={[styles.typo]}>{msg.date}</Text>
  <Text style={[styles.typo,{marginLeft:10}]}>{msg.time}</Text>
  <View style={{flexDirection:'row'}}>

    <Text style={[styles.typo,{marginLeft:15}]}>Seen</Text>
  <Image
    resizeMode={'contain'}
    source={senderImage}
    style={{height: 16, width: 16,marginTop:2}}
  />
  </View>
</View>
</>
);


const styles = StyleSheet.create({
  firstView: {
    flexDirection:'row',
    maxWidth: '70%',
    paddingHorizontal: 15,
    padding: 5,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    elevation:4,
    shadowOpacity: 1,

    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    paddingBottom:20,
    borderWidth:0.4,
    borderColor:'rgba(0, 0, 0, 0.08)'
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


export default SenderMessage;
