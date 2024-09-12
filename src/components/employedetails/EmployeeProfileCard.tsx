import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from "react-native";

// @ts-ignore
import Email from '../../assets/icons/email_red.png'
import phone from '../../assets/icons/phone.png'
import { transform } from "@babel/core";
import chervienRight from "../../assets/icons/chevron-right.png";
import { Flex ,Box } from "@react-native-material/core";
import UserForm from "../../components/profilecard/UserForm";
import EmployeForm from "../../components/employedetails/EmployeForm";
import normalize from "../../utils/normalize";

const EmployeeProfileCard = (props) => {
  const imgUri = 'data:image/jpeg;base64,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'
  const isOnline=true
  return  (
    <ScrollView style={styles.card}>
      {/*//Profile*/}
      <View style={{justifyContent:'center',alignItems:'center'}}>

        <View style={{position:'relative',marginTop:20}}>
          <TouchableOpacity onPress={()=>navigation.navigate('EmployeeDetails' as never,{name:data.Name})}>

            <Image source={{uri:imgUri}} resizeMode={'contain'}
                    style={styles.img}/>

          </TouchableOpacity>
          <View style={{position:'absolute',justifyContent:'center',alignItems:'center',bottom:-10,right:-15,height:22,width:22,borderRadius:11,backgroundColor:'#F4F4F4'}}>
            <View style={{height:14,width:14,backgroundColor: isOnline ? '#0FD97E' :'#CC3017' ,borderRadius:8}}></View>
          </View>
        </View>
        {/*//Employer Name*/}
        <View style={{marginTop:30}}>
          <Text style={styles.employeTitle}>Name of Employ</Text>
        </View>
        {/*//Icons*/}
        <View style={{marginTop:5,flexDirection:'row'}}>
          <View style={styles.iconHolder}>
            <Image source={phone}  style={{transform:[{scale:1.9}],height:16,width:16}}/>
          </View>
          <View style={styles.iconHolder}>
            <Image source={Email}  style={{transform:[{scale:1.4}],height:16,width:16}}/>
          </View>
        </View>


      </View>

        {/*//More Infor*/}

        <Flex direction={'row'} ph={10} mt={10} justify={'between'}>
          <Text style={[styles.moreDetailsTitle,{color:'#40302A'}]}>More Info</Text>

        </Flex>
          {/*<ScrollView style={{flexGrow:1}} contentContainerStyle={{flexGrow:1,paddingHorizontal:20}} >*/}

          <Box ph={10} pb={20}>

          <EmployeForm/>
          </Box>
          {/*</ScrollView>*/}


    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginTop: normalize(10),
    // backgroundColor:'red',
    backgroundColor: 'white',
    shadowColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.5,
    elevation: 20,
    margin: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom: 20,
  },
  img:{
    transform: [{scale: 1.2}],
    borderRadius: 60,
    height: 110,
    width: 110
  },
  employeTitle:{
    color:'#1F0900',
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(12),
    marginLeft:20,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  iconHolder:{
    backgroundColor:'#F6F6F6',
    height:40,
    padding:8,
    paddingHorizontal:12,
    justifyContent:'center',
    margin:8,
    borderRadius:8,
  },
  moreDetailsTitle:{
    fontSize: normalize(13),
    fontWeight:'500',
    fontFamily: "Poppins-Regular",
    lineHeight:20,
    letterSpacing:0.1,
  }

})


  export default EmployeeProfileCard;
