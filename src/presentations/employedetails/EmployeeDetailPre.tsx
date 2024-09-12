import React, { useState,useEffect } from "react";
import { Text } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import normalize from "../../utils/normalize";
import exportIcon from '../../assets/icons/export.png'
import AttendenceCalender from "../../components/employedetails/AttendenceCalender";
import TaskTabs from "../../components/employedetails/TaskTabs";
import EmployeeProfileCard from "../../components/employedetails/EmployeeProfileCard";

const EmployeeDetailPre = (props) => {
  const { params }=useRoute()
  const emplyerName = params?.hasOwnProperty('name') ? params.name : 'Employe Name'
  const navigation = useNavigation()
  const [headerTitle, setHeaderTitle] = useState(params?.name);
  const [routes,setRoutes] = React.useState(1);

  useEffect(() => {
    navigation.setOptions({
      title: headerTitle,
    });
  }, [headerTitle, navigation]);

  return (
    <View style={{flex:1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>setRoutes(1)} style={[styles.tab,{ backgroundColor:routes ===1 ? '#012547' :'white'}]}>
          <Text style={[styles.tabTitle,{color:routes ===1 ? "#FFFEFA"  :"#40302A",opacity:routes ===1 ?  1 :0.5}]} >Work History</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setRoutes(2)} style={[styles.tab,{ backgroundColor:routes ===2 ? '#012547' :'white'}]}>
          <Text style={[styles.tabTitle,{color:routes ===2 ? "#FFFEFA"  :"#40302A",opacity:routes ===2 ?  1 :0.5}]}>Profile</Text>

        </TouchableOpacity>

      </View>

      {routes  ===1 ?
        <>
      <View style={[styles.card,{paddingHorizontal:10}]}>
        <View style={{flexDirection:'row',marginTop:5}}>
          <Image source={exportIcon} style={{height:16,width:16}}/>
          <Text style={[styles.exportLabel,{alignSelf:'center',marginLeft:5,marginTop:2,}]}>Export Payroll</Text>
        </View>
        <AttendenceCalender/>
      </View>

      <View style={[styles.card,{flex:1}]}>
        <TaskTabs/>
      </View>
    </>
    :
      //Employee Profile

        <EmployeeProfileCard/>

      }

    </View>
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









  header:{
    backgroundColor:'white',
    flexDirection:'row',
    padding: 8,
    height:64,
    flexWrap:'wrap',
    paddingTop:4,
    justifyContent:'space-around',
    alignItems: 'center',
    margin:8,
    borderWidth:1,
    borderColor:'rgba(3, 1, 0, 0.08)',
    borderRadius:10,
  },




  tab:{
    paddingVertical:5,
    height:48,
    flexBasis:'50%',
    borderRadius:4,
    paddingLeft:14,
    paddingTop:16,
    paddingRight:14,
    padddingBottom:16,
    marginTop:10,
  },


  tabTitle:{

    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    fontWeight: '500',
    textAlign:'center',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  exportLabel:{
    color:'#005E98',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(11),
    fontWeight: '400',
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.4,
  }

})


export default EmployeeDetailPre;
