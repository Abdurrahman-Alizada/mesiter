import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import chevronRight from '@assets/icons/chevron-right.png'
import cricleGreen from '@assets/icons/greenCircle.png'

import { FlashList } from "@shopify/flash-list";
import SingleTask from "@components/profilecard/SingleTask";
import { useNavigation } from "@react-navigation/native";
import normalize from "../../utils/normalize";
const SingleEmployeCard = ({data}) => {
  const [isCollapse,setCollapse]=useState()
  const detailsdata=[
    {
      id:1,
      icons:'LowPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
    },

    {
      id:2,
      icons:'HighPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
    },{
      id:2,
      icons:'HighPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
    },{
      id:2,
      icons:'HighPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
    },
    {
      id:3,
      icons:'MediumPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
    }
  ]

  const navigation = useNavigation()

  return (
    <>
    <View style={styles.container}>

        {/*// @ts-ignore*/}
      <View style={{position:'relative'}}>
         <TouchableOpacity onPress={()=>navigation.navigate('EmployeeDetails' as never,{name:data.Name})}>

        <Image  source={{uri:data.imgUri}} resizeMode={'contain'}
               style={styles.img}/>

         </TouchableOpacity>
        <View style={{position:'absolute',justifyContent:'center',alignItems:'center',bottom:0,right:-4,height:16,width:16,borderRadius:8,backgroundColor:'#F4F4F4'}}>
          <View style={{height:10,width:10,backgroundColor: data.isOnline ? '#0FD97E' :'#CC3017' ,borderRadius:8}}></View>


        </View>
      </View>
      <View style={{flexBasis:"75%"}}>
      <Text style={styles.employeName}>{data.Name}</Text>
      <Text style={styles.taskTitle}>{'Total assigned task today '+data.taskAssing}</Text>

      </View>
      <TouchableOpacity onPress={()=>setCollapse(!isCollapse)}>
      <Image source={chevronRight} style={{height:24,width:24,transform: [{rotate: isCollapse ? '270deg' :'90deg'}],}} />

      </TouchableOpacity>

    </View>
      {/*//details*/}


      {isCollapse &&
      <View style={{minHeight:200}}>
          <FlashList
            data={detailsdata}
            estimatedItemSize={200}
            keyExtractor={( _ ,index) => index.toString()}
            renderItem={({ item, index })=> {
              return (
                <View style={{minHeight:70,flexDirection:'row'}} key={index}>
                <View style={{flexBasis:'20%',alignItems:'flex-end'}}>
                  <View style={{top:index !== 0 ? -((index*7) + 35) :10 , height:index !== 0 ? ( index+45)+ 50 :50,borderColor:'#E2E2E2',borderBottomStartRadius:10,borderLeftWidth:1,borderBottomWidth:1,width:30,}}></View>
                </View>
                  <View style={{flexBasis:'80%'}}>
                <SingleTask data={item} />

                  </View>
                </View>
              )
            }}
          />
    </View>
      }
    </>
  );
}

const styles=StyleSheet.create({
  img:{
    transform: [{scale: 1.2}],
    borderRadius: 50,
    height: 60,
    width: 60
  },
  container:{
    paddingLeft:10,
    paddingTop:8,
    margin:8,
    alignItems:'center',
    flexDirection:'row'
  },
  employeName:{
    color:'#1F0900',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(13),
    marginLeft:20,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,

  },
  taskTitle:{
    color:'#40302A',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(10),
    marginLeft:20,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.5,
  }

})
export default SingleEmployeCard;
