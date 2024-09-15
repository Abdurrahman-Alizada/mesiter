import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import statusup from '../assets/icons/statusup.png'
import home from '../assets/icons/home.png'
import plusicon from '../assets/icons/plusicon.png'
const Tab = createBottomTabNavigator();

// import AntDesign from 'react-native-vector-icons/AntDesign';


import DashboardContainer from '../screens/Dashboard/DashboardContainer';
import LeftBars from '../components/navigation/tabnavigation/LeftBars';
import Notifications from '../components/navigation/tabnavigation/Notifications';
import AddTaskContainer from '../containers/addtask/AddTaskContainer';
import ProfileContainer from '../containers/profiles/ProfileContainer';
import BackArrow from '../components/navigation/headerbuttons/BackArrow';
import TickButton from '../components/navigation/headerbuttons/TickButton';
import normalize from '../utils/normalize';
import AntDesign from "react-native-vector-icons/AntDesign"

const AddNewTaskButton=({children,onPress})=>(
    <TouchableOpacity
        style={{
            top:-12,
            // ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{height:50,justifyContent: 'center',
            alignItems: 'center',width:50,backgroundColor:'#012547',borderRadius:50}}>
        {/*{children}*/}
            <AntDesign name="plus" size={24} color="white" />

        </View>
    </TouchableOpacity>

)


const HomeTab = () => {


    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { position: 'absolute',
                    borderTopEndRadius: 25,
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    elevation:20,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 4,
                    borderColor:'white',
                    padding:10,
                    height:55,
                    paddingTop:10,
                    paddingBottom:5,
                    borderTopStartRadius: 25,
                },

            }}

        >
            <Tab.Screen

                name="Dashboard"
                component={DashboardContainer}

                options={{

                    unmountOnBlur: true,
                    headerTitle: 'MW Hausmeister & Reinigungs',
                    headerTitleAlign: 'center',
                    tabBarLabel:(({focused})=> <Text style={{ fontSize: 12,color:focused ? '#1b3065' : 'grey',fontWeight:'600' }}> Tasks </Text>),
                    tabBarActiveTintColor: '#1b3065',
                  headerTitleStyle: {

                      color:'#012547',
                      textAlign: 'center',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: normalize(10),
                      fontWeight: '600',
                      lineHeight: 32,
                      letterSpacing:0.48
                  },


                    headerLeft:()=><LeftBars/>,
                    headerRight:()=><Notifications/>,


                    tabBarIcon: ({size, focused, color}) => {

                        return (
                            <View style={{ opacity : focused ? 1 : 0.5 , backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                                <Image
                                    style={{width: size, height: size}}
                                    source={home}
                                />
                            </View>
                        );
                    },


                }}
            />

            <Tab.Screen

                name="AddNewTask"
                component={AddTaskContainer}

                options={{

                    unmountOnBlur: true,
                    headerTitle: 'Add Task',
                    headerTitleAlign: 'center',
                    tabBarLabel:(({focused})=> <Text style={{ fontSize: 12,color:focused ? '#1b3065' : 'grey',fontWeight:'600' }}>  </Text>),
                    tabBarActiveTintColor: '#1b3065',
                    headerStyle: {
                        borderColor:'#F4F4F4',
                        backgroundColor: '#F4F4F4',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },


                    headerLeft:()=><BackArrow/>,
                    headerRight:()=><TickButton/>,



                    tabBarIcon: ({size, focused, color}) => {

                        return (
                                <AntDesign name="plus" size={24} color="white" />
                        );
                    },
                    tabBarButton:(props) => (<AddNewTaskButton {...props}/>)
                }}
            />





            <Tab.Screen

                name="Profiles"
                component={ProfileContainer}

                options={{
                    tabBarHideOnKeyboard: true,
                    unmountOnBlur: true,
                    headerTitle: 'Meister & Reinigungs',
                    headerTitleAlign: 'center',
                    tabBarLabel:(({focused})=> <Text style={{ fontSize: 12,color:focused ? '#1b3065' : 'grey',fontWeight:'600' }}> Profiles </Text>),
                    tabBarActiveTintColor: '#1b3065',



                    headerLeft:()=><LeftBars/>,
                    headerRight:()=><Notifications/>,



                    tabBarIcon: ({size, focused, color}) => {

                        return (
                            <View style={{opacity:focused ? 1 :0.5,  backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                                <Image
                                    style={{width: size, height: size}}
                                    source={statusup}
                                />
                            </View>
                        );
                    },
                }}
            />

        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabIcons: {
        flexDirection: 'row',
        marginRight: 15,
        padding: 10,
    },
});
export default HomeTab;
