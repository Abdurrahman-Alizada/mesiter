import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {useTheme} from "@react-navigation/native";
import normalize from "../../utils/normalize";
import { getMonthNameFromDate } from "../../utils/dateHelpers";
import search from "../../assets/icons/search.png";
import redCalender from "../../assets/icons/calendar2.png";
import VacationsGrid from "../../components/vacations/VacationsGrid";
import DatePicker from "react-native-date-picker";
import HolidaysGrid from "../../components/holidays/HolidaysGrid";
const HolidaysPre = () => {
  const [date, setDate] = useState(new Date())

  const [open, setOpen] = useState(false)

  const [month,setMonth] =useState(getMonthNameFromDate(new Date))

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];




  return (



    <View style={[styles.card,{flex:1}]}>


      <View style={styles.header}>
        <Image source={search} style={{height:24,width:24,marginLeft:10}} resizeMode={'contain'}/>
        <TouchableOpacity onPress={() => setOpen(true)} style={{flexDirection:'row'}}>
          <Text style={styles.monthTitle}>{months[date.getMonth()]} {date.getFullYear() }</Text>
          <Image source={redCalender} style={{height:16,width:16,marginLeft:10,marginTop:2}} resizeMode={'contain'}/>

        </TouchableOpacity>



      </View>


      <HolidaysGrid date={date}/>


      <DatePicker
        maximumDate={new Date()}
        modal
        mode={ 'date'}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>



  );
}


const styles=StyleSheet.create({
  card:{
    marginTop:normalize(10),
    // backgroundColor:'red',
    backgroundColor:'white',
    shadowColor: 'white',
    borderRadius:10,
    shadowOpacity: 0.5,
    elevation:20,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom:20,
  },
  header:{
    flexDirection:'row',
    paddingTop:10,
    justifyContent:'space-between'


  },
  monthTitle:{
    color:'#1F0900',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  isGrid:{
    marginTop:-10,
    backgroundColor:'rgba(0, 94, 152, 0.20)',
    height:40,
    width:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  }


})



export default HolidaysPre;
