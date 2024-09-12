
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MenuRoutes from './MenuRoutes';
import NotficationsContainer from '../containers/notfications/NotficationsContainer';

import { Platform } from 'react-native';
import ChatContainer from '../containers/chat/ChatContainer';
import TaskDetailsContainer from '../containers/taskdetails/TaskDetailsContainer';
import EmployeeDetailContainer from '../containers/employedetails/EmployeeDetailContainer';
import BackArrow from '../components/navigation/headerbuttons/BackArrow';
import ActionsButtons from '../components/navigation/headerbuttons/ActionsButtons';
const Stack = createStackNavigator();

const CardForFade = ({current}: {current: any}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='SettingRoutes' >


  

          <Stack.Screen
            name="SettingRoutes"
            component={MenuRoutes}
            options={{
              cardStyleInterpolator: CardForFade,

              headerShown: false,
              headerTitleAlign: 'left',
              headerTitle: '',

              headerStyle: {height: Platform.OS === 'ios' ? 50 : 50},
              headerTransparent: true,
                  }}
              />

              <Stack.Screen
                name="Notifications"
                component={NotficationsContainer}
                options={{

                  unmountOnBlur: true,
                  tabBarActiveTintColor: '#1b3065',
                  headerStyle: {
                    borderColor:'#F4F4F4',
                    backgroundColor: 'white',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  tabBarIcon: ({size, focused, color}) => {

                    return (
                      <AntDesign name="plus" size={24} color="white" />
                    );
                  },
                  tabBarButton:(props) => (<AddNewTaskButton {...props}/>)
                }}
              />

<Stack.Screen
                name="Chat"
                component={ChatContainer}
                options={{

                  unmountOnBlur: true,
                  tabBarActiveTintColor: '#1b3065',
                  headerStyle: {
                    borderColor:'#FFFEFA',
                    backgroundColor: '#FFFEFA',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },





                  tabBarIcon: ({size, focused, color}) => {

                    return (
                      <AntDesign name="plus" size={24} color="white" />
                    );
                  },
                  tabBarButton:(props) => (<AddNewTaskButton {...props}/>)
                }}
              />



              <Stack.Screen
                name="TaskDetails"
                component={TaskDetailsContainer}
                options={{

                  unmountOnBlur: true,
                  headerTitle: 'Details',
                  headerTitleAlign: 'center',
                  tabBarLabel:(({focused})=> <Text style={{ fontSize: 12,color:focused ? '#1b3065' : 'grey',fontWeight:'600' }}>  </Text>),
                  tabBarActiveTintColor: '#1b3065',
                  headerStyle: {
                    borderColor:'#F4F4F4',
                    backgroundColor: 'white',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },


                  headerLeft:()=><BackArrow/>,
                  headerRight:()=><ActionsButtons/>,



                  tabBarIcon: ({size, focused, color}) => {

                    return (
                      <AntDesign name="plus" size={24} color="white" />
                    );
                  },
                  tabBarButton:(props) => (<AddNewTaskButton {...props}/>)
                }}
              />

              <Stack.Screen
                name="EmployeeDetails"
                component={EmployeeDetailContainer}
                options={{

                  unmountOnBlur: true,
                  tabBarActiveTintColor: '#1b3065',
                  headerStyle: {
                    borderColor:'#F4F4F4',
                    backgroundColor: 'white',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },





                  tabBarIcon: ({size, focused, color}) => {

                    return (
                      <AntDesign name="plus" size={24} color="white" />
                    );
                  },
                  tabBarButton:(props) => (<AddNewTaskButton {...props}/>)
                }}
              />

    </Stack.Navigator>
  );
};

export default HomeStack;
