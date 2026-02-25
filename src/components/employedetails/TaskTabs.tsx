import * as React from 'react';
import { Text, useWindowDimensions, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SceneMap,TabBar} from 'react-native-tab-view';
import { useTheme } from "@react-navigation/native";

import CompletedTask from '../dashboard/CompletedTask';
import InProcessTask from '../dashboard/InProcessTask';
import PendingTask from '../dashboard/PendingTask';
import SingleTask from '../dashboard/SingleTask';
import { FlashList } from "@shopify/flash-list";
import Attendence from '../taskdetails/Attendence';
import normalize from '../../utils/normalize';



const renderScene = SceneMap({
  first: CompletedTask,
  second: InProcessTask,
  third: PendingTask,
});




export default function TaskTabs() {
  const {colors}=useTheme()
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes,setRoutes] = React.useState(1);
  const data=[
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


  const renderContent=()=>{

    if(routes  ===1 ){
      return <InProcessTask/>
    }else if(routes === 2){
      return <CompletedTask/>
    }else{
      return <PendingTask/>
    }

  }


  return (
    <>
      <View style={styles.header}>

        <TouchableOpacity onPress={()=>setRoutes(1)} style={[styles.tab,{ borderBottomWidth:routes ===1 ? 2:0}]}>
          <Text style={[styles.tabTitle,{opacity:routes ===3 ?  1 :0.5}]}>Attendence</Text>

        </TouchableOpacity>


        <TouchableOpacity onPress={()=>setRoutes(2)} style={[styles.tab,{ borderBottomWidth:routes ===2 ? 3 :0}]}>
          <Text style={[styles.tabTitle,{opacity:routes ===2 ?  1 :0.5}]}>Completed</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setRoutes(3)} style={[styles.tab,{ borderBottomWidth:routes ===3 ? 2 :0}]}>
          <Text style={[styles.tabTitle,{opacity:routes ===1 ?  1 :0.5}]} >In-progress</Text>

        </TouchableOpacity>

      </View>
      <View style={{flex:1}}>
        {routes === 1 ?
          //inpogresss
          <Attendence/>
          :
          routes === 2 ?


          //compltes
          <FlatList
            data={data}

            keyExtractor={( _ ,index) => index.toString()}
            renderItem={({ item, index })=><SingleTask  data={item}/>}
          />

            :

          <FlatList
          data={data}

        keyExtractor={( _ ,index) => index.toString()}
        renderItem={({ item, index })=><SingleTask  data={item}/>}
      />


      }
      </View>




    </>
  );
}
const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    padding: 12,
    paddingTop:4,
    justifyContent:'space-between',
    alignItems: 'flex-start',
    margin:5,
  },
  tab:{
    paddingVertical:5,
  },
  tabTitle:{
    color:"#1F0900",
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  }
});
