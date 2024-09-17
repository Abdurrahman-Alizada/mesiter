import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput as PaperInputText,
  TouchableOpacity,
  View,
} from 'react-native';
import {Box, Text} from '@react-native-material/core';
// @ts-ignore
import redClock from '../../assets/icons/red-clock.png';
// @ts-ignore
import greenClock from '../../assets/icons/green-clock.png';
// @ts-ignore
import greenCalender from '../../assets/icons/green-calender.png';
// @ts-ignore

import redCalender from '../../assets/icons/red-calender.png';
import DatePicker from "react-native-date-picker";
import { getDateByFormated, getHourFromDate, getHourWithMinutesFromDate } from "../../utils/dateHelpers";
import normalize from '../../utils/normalize';

interface Types {
  iconName:string;
  isDate?:boolean;
  type?:number;
  [key: string]: any;
  date:any,
    formikProps: any;
    formiKey: string;
}

const icons_list = {redClock, greenClock,redCalender,greenCalender};



const CustomDatePicker: React.FC<Types> = ({ formikProps, formiKey,date=new Date(), setDate=()=>{},type=1,iconName='redClock',isDate=true}): React.ReactElement => {

  const [open, setOpen] = useState(false)


  let Boxstyles = {
      borderWidth: 1,
      borderColor: "#012547",
      borderRadius: 7,
      color: "#CC3017",
    };



  // if (formikProps.touched[formiKey] && formikProps.errors[formiKey]) {
  //   Inputstyles.borderColor = 'red';
  // }


  return (
    <>
      {/*//@ts-ignore*/}
      <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={1} style={[styles.inputContainer,Boxstyles]}>

        {/*//@ts-ignore*/}
          <Image source={icons_list[iconName]} style={{height: 24, width: 24}} />
        <Text style={[styles.date,{color:type>0 ? '#087B47' :'#CC3017'}]}>{ isDate ? getDateByFormated(date) : getHourWithMinutesFromDate(date)}</Text>



      </TouchableOpacity>
      <DatePicker
        modal

        mode={isDate ? 'date' :'time'}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
            formikProps.setFieldValue(formiKey,date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer:{
    display: 'flex',
    height: 56,
    padding: 16,
    flexDirection:'row',
    justifyContent: 'flex-start',
    aligItems: 'flex-start',
  },

  date:{

    fontFamily: 'Poppins-Regular',
    fontSize: normalize(11),
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
    alignSelf:'center',
    marginLeft:12,
    marginTop:2,
  }
});


export default CustomDatePicker;
