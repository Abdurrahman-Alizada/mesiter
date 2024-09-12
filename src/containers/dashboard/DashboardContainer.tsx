import React from 'react';
import {View,Text} from "react-native";
// import DashboardPre from "@presentations/dashboard/DashboardPre";

import Swipeable from 'react-native-gesture-handler/Swipeable';
import DashboardPre from '../../presentations/dashboard/DashboardPre';
import Dashboard from '../../screens/Dashboard/Dashboard';
const DashboardContainer = () => {
  const swipeFromLeftOpen = () => {
    alert('Swipe from left');
  };
  const swipeFromRightOpen = () => {
    alert('Swipe from right');
  };


  return (
    // <Swipeable
    //   renderLeftActions={()=><Text>ia m left</Text>}
    //   renderRightActions={()=><Text>ia m left</Text>}
    //   onSwipeableRightOpen={swipeFromRightOpen}
    //   onSwipeableLeftOpen={swipeFromLeftOpen}
    // >
    //   <View
    //     style={{
    //       paddingHorizontal: 30,
    //       paddingVertical: 20,
    //       backgroundColor: 'white',
    //     }}
    //   >
    //     <Text style={{ fontSize: 24 }} style={{ fontSize: 20 }}>
    //      see me
    //     </Text>
    //   </View>
    // </Swipeable>


    <DashboardPre/>
  );
}

export default DashboardContainer;
