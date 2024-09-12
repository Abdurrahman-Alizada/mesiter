import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
//@ts-ignore
import redCalender from "../../assets/icons/calendar2.png";
import DatePicker from "react-native-date-picker";
import normalize from "../../utils/normalize";

const AttendenceCalender = () => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  return (
    <View style={styles.header}>
      <Text style={styles.attendTitle}>Monthly Report of</Text>

      <TouchableOpacity onPress={() => setOpen(true)} style={{flexDirection:'row'}}>
        <Text style={styles.dateTitle}>{months[date.getMonth()]} {date.getFullYear() }</Text>
        <Image source={redCalender} style={{height:16,width:16,marginLeft:10,marginTop:2}} resizeMode={'contain'}/>

      </TouchableOpacity>
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
  header:{
    flexDirection:'row',
    paddingTop:10,
    justifyContent:'space-between'


  },
  attendTitle:{
    color:'#40302A',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
  },

  dateTitle:{
    color:'#40302A',
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
  }
})



export default AttendenceCalender;
