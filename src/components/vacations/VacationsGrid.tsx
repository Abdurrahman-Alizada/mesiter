import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getMonthNameFromDate, getTotalDaysofMonth } from "../../utils/dateHelpers";
import { FlashList } from "@shopify/flash-list";
import calender from "../../assets/icons/calender.png";
import HighPriority from "../../assets/icons/HighPriority.png";
import MediumPriority from "../../assets/icons/MediumPriority.png";

import { useNavigation } from "@react-navigation/native";
import normalize from "../../utils/normalize";


const icons ={ HighPriority,MediumPriority}
const VacationsGrid = ({date}) => {
  const navigation = useNavigation()

  const [month,setMonth] =useState(getMonthNameFromDate(new Date))

  const [daysOfWeek,setdaysOfWeek] = useState( [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun',]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [daysTotalOfMonth,setTotalDaysOfMonth] = useState(30);

  const [firstDay,setFirstDay] =useState(new Date(2023, 8) .getDay())

  const [taskList,setTaskList] = useState([
    {
      id:1,
      icon:'lowPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:1
    },
    {
      id:1,
      icon:'lowPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:1
    },
    {
      id:1,
      icon:'lowPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:1
    },
    {
      id:1,
      icon:'MediumPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:2
    },
    {
      id:1,
      icon:'MediumPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:3
    },
    {
      id:1,
      icon:'MediumPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:3
    },
    {
      id:3,
      icon:'MediumPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:4
    },
    {
      id:4,
      icon:'MediumPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:4
    },
    {
      id:5,
      icon:'HighPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:5
    },
    {
      id:5,
      icon:'lowPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:5
    },
    {
      id:5,
      icon:'lowPriority',
      taskTitle:'Heading Task 1',
      location:'location you gave',
      day:5
    },

  ])



  const SingleTask=({data})=>{
    const colors={lowPriority:'#087B47', HighPriority:'#CC3017',MediumPriority:'#005E98'}
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('TaskDetails')}  style={[styles.taskContainer,{backgroundColor: '#218F89'}]}>
        <View style={{flexBasis:'20%'}}>
          <View style={{backgroundColor:'#F4F4F4' , height:40,width:40, justifyContent:'center',alignItems:'center',padding:4,borderRadius:10}}>
          <Image source={calender} style={styles.taskImg} />

          </View>

        </View>
        <View style={{flexBasis:'80%'}}>
          <Text style={styles.taskTitle}>{data.taskTitle}</Text>
          <Text style={styles.locationTitle}>{data.location}</Text>
        </View>
      </TouchableOpacity>
    )
  }




  const SingleRow = ({ item }) => {

    const tempdate = new Date(date.getFullYear(),date.getMonth(), item);
    const getTask=taskList.filter((task)=>task.day ==item  )

    return (
      <View style={{flexDirection:'row',paddingHorizontal:10,paddingVertical:10,borderBottomWidth:1,borderColor:'rgba(3, 1, 0, 0.08)'}}>
        <View style={{flexBasis:'20%'}}>

          <View style={styles.Day}>
            <Text style={styles.dateTitle}>{item}</Text>
            <Text style={[styles.dateTitle,{opacity:0.5}]}>{daysOfWeek[tempdate.getDay()]}</Text>
          </View>
        </View>
        <View style={{flexBasis:'80%'}}>
          {getTask.length>0 ?
            getTask.map((item,index)=>(
              <SingleTask key={index} data={item}/>

            ))
            :
            <></>
          }
        </View>
      </View>
    )
  };


  function rearrangeDaysOfWeek(dayIndex:number) {
    if (dayIndex >= 0 && dayIndex < 7) {
      const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      // Rotate the array to start from the specified day index
      const rearrangedDays = [...daysOfWeek.slice(dayIndex-1), ...daysOfWeek.slice(0, dayIndex-1)];

      setdaysOfWeek( rearrangedDays);
    } else {
      setdaysOfWeek( daysOfWeek);
    }
  }



  useEffect(()=>{

    setFirstDay(date.getDay())
    rearrangeDaysOfWeek(firstDay)
    setTotalDaysOfMonth(getTotalDaysofMonth(date.getFullYear(),date.getMonth()))

  },[date,firstDay])




  return (

    <View style={{flex:1}}>


      <FlashList
        nestedScrollEnabled={true}
        data={Array.from({ length: daysTotalOfMonth  }, (_, i) => i + 1)}
        estimatedItemSize={200}
        renderItem={({ item, index })=><SingleRow item={item}/>}

      />


    </View>
  );
}

const styles=StyleSheet.create({
  Day:{
    borderRadius: 4,
    backgroundColor:'#ECECEC',
    display: 'flex',
    width: 48,
    height: 48,
    flexDirection: 'column',
    justifyContent: 'center',

    alignItems: 'center',

  },
  dateTitle:{
    color:  '#1F0900',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5
  },
  taskContainer:{
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
    alignItems:' flex-start',
    margin: 8,
    borderRadius: 8,
    borderWidth:1,
    borderColor:'rgba(64, 48, 42, 0.15)',

  },
  taskImg:{
    height:24,
    width:24,
    borderRadius:16,
    borderColor:'#F4F4F4'
  },
  taskTitle:{
    color: '#FFFEFA',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(11),
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  locationTitle:{
    color: '#FFFEFA',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(8),
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.5,
  }


})
export default VacationsGrid;
