import React,{useState} from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import edit from '../../assets/icons/edit.png'
// import edit from '../../assets'
import normalize from "../../utils/normalize";
//table styling constants
const largeWidth=200
const mediumWidth=150
const smallWidth=80



const Attendence = () => {
  const [items] = React.useState([
    {
      key: 12,
      date: 11,
      day: 'Tue',
      site: 'John Building',
      code:828292,
      checkIN:'09:55 AM',
      checkOut:'04:55 PM',
      totalHrs:'8h 30m',

    },
    {
      key: 12,
      date: 12,
      day: 'Wed',
      site: 'John Building',
      code:828292,
      checkIN:'09:55 AM',
      checkOut:'04:55 PM',
      totalHrs:'8h 30m',

    },
    {
      key: 13,
      date: 13,
      day: 'Thu',
      site: 'John Building',
      code:828292,
      checkIN:'Absent',
      checkOut:'Absent',
      totalHrs:'-- --',

    },
    {
      key: 13,
      date: 14,
      day: 'Fri',
      site: 'John Building',
      code:828292,
      checkIN:'Holiday',
      checkOut:'Holiday',
      totalHrs:'-- --',

    },
    {
      key: 13,
      date: 15,
      day: 'Sat',
      site: 'John Building',
      code:828292,
      checkIN:'09:55 AM',
      checkOut:'04:55 PM',
      totalHrs:'8h 30m',

    },



  ]);
  const [scrollX, setScrollX] = useState(0);
  // const translateX = useSharedValue(0);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setScrollX(contentOffset.x);
  }
  //
  // const animatedStyles = useAnimatedStyle(() => ({
  //   // transform: [{ translateX: withSpring(translateX.value * 2) }],
  //   left: withSpring(scrollX)
  // }));

  return (
    <>
      <ScrollView onScroll={handleScroll} horizontal={true} showsHorizontalScrollIndicator={false} indicatorStyle={{'color':'red'}} contentContainerStyle={{marginTop:10,flexGrow:1,flexDirection:'row'}}>
        {/*const [headers,setHeaders]=useState(['Date','Site Name & Code','','Check Out','Total Hrs'])*/}
        <View style={styles.table}>
        {/*//Table Header*/}
          <View style={styles.header}>
            <View style={[styles.column,{width:smallWidth}]}>
              <Text style={styles.headerTitle}>Date</Text>
            </View>
            <View style={[styles.column,{width:largeWidth}]}>
              <Text style={styles.headerTitle}>Site Name & Code</Text>
            </View>
            <View style={[styles.column,{width:mediumWidth}]}>
              <Text style={styles.headerTitle}> Check Out</Text>
            </View>
            <View style={[styles.column,{width:mediumWidth}]}>
              <Text style={styles.headerTitle}> Check In</Text>
            </View>
            <View style={[styles.column,{width:mediumWidth}]}>
              <Text style={styles.headerTitle}>Total Hrs</Text>
            </View>
            <View style={[styles.column,{width:mediumWidth,alignItems:'center'}]}>
              <Text style={styles.headerTitle}>Edit</Text>
            </View>

          </View>
          <View style={{flex:1}}>
            {items.map((item,index)=><TableRow  data={item} key={index}/>)}


          </View>


        </View>
       </ScrollView>
      {/*//custom indicator*/}
      <View style={{padding:3,backgroundColor:'#DBDBDB' ,width:'90%',marginTop:10,marginHorizontal:20,borderRadius:16,overflow:'hidden'}}>


        <View style={[{ left:scrollX, width: 68,  height: 8, backgroundColor: '#40302A',borderRadius:16}]} />

      </View>
    </>


  );
}


const TableRow=({data})=>{
  return (
  <View style={{flexDirection:'row'}}>
    <View style={[styles.row,{width:smallWidth}]}>
      <View style={styles.Day}>
        <Text style={styles.dateTitle}>{data.date}</Text>
        <Text style={[styles.dateTitle,{opacity:0.5}]}>{data.day}</Text>
      </View>
    </View>
    <View style={[styles.row,{width:largeWidth}]}>
      <Text style={[styles.rowTitle,{color:'#40302A'}]}>{data.site +" "+ data.code}</Text>
    </View>
    <View style={[styles.row,{width:mediumWidth}]}>
      <Text style={[styles.rowTitle,{color:data.checkIN === 'Absent' ? '#CC3017' : '#40302A'}]}>{data.checkIN}</Text>
    </View>
    <View style={[styles.row,{width:mediumWidth}]}>
      <Text style={[styles.rowTitle,{color:data.checkIN === 'Absent' ? '#CC3017' : '#40302A'}]}>{data.checkOut}</Text>
    </View>
    <View style={[styles.row,{width:mediumWidth}]}>
      <Text style={[styles.rowTitle,{color:'#40302A'}]}>{data.totalHrs}</Text>
    </View>
    <View style={[styles.row,{width:mediumWidth,alignItems:'center'}]}>
      <Image source={edit} style={{height:24,width:24}}/>
    </View>

  </View>
  )
}

const CustomScrollIndicator=()=>(
  <TouchableOpacity>
    <View style={{
      width: 30,  // Set the width as needed
      height: 3,  // Set the height as needed
      backgroundColor: 'blue',
      // Set the desired background color
    }} />
  </TouchableOpacity>
)

const styles=StyleSheet.create({
  table:{
    flex:1,

  },

  header:{
    flexWrap:'wrap',
    flexDirection:'row',
    backgroundColor:'#005E98',
    borderTopStartRadius:10,
    borderTopEndRadius:10,
    borderWidth:1,
    borderColor:"#005E98",
  },
  headerTitle:{
    color:'#FFFEFA',
    fontFamily:'Poppins-Regular',
    fontSize:normalize(11),
    fontWeight:'500',
    lineHeight:16,
    letterSpacing:0.5,



  },
  rowTitle:{

    fontFamily:'Poppins-Regular',
    fontSize:normalize(11),
    fontWeight:'500',
    lineHeight:16,
    letterSpacing:0.5,
  },


  column:{
    padding:8,
    justifyContent:'center',
    margin:10,
  },
  row:{
    padding:8,
    justifyContent:'center',
    marginHorizontal:10,
  },
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
})

export default Attendence;
