import React from 'react';

//***********Custom Imports
import {createStackNavigator} from '@react-navigation/stack';
import MenuContainer from "../containers/menu/MenuContainer";
import BackArrow from "../components/navigation/headerbuttons/BackArrow";
import EmployeeContainer from "../containers/menu/EmployeeContainer";
import NotificationSettingContainer from "../containers/menu/NotificationSettingContainer";
import HolidaysContainer from "../containers/menu/HolidaysContainer";
import AddUser from "../components/navigation/headerbuttons/AddUser";
import AddMemberContainer from "../containers/menu/AddMemberContainer";
import VacationsContainer from "../containers/menu/VacationsContainer";
import {useTranslation} from "react-i18next";

const Stack = createStackNavigator();


const MenuRoutes = () => {
    const {t} =useTranslation()
    return (
        <Stack.Navigator initialRouteName='Settings'>
            <Stack.Screen
                name="Settings"
                component={MenuContainer}

                options={{headerShown: true,
                    headerTitle:'',
                    headerStyle: {
                    borderColor:'#F4F4F4',
                        backgroundColor: '#F4F4F4',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                headerLeft:()=><BackArrow/>,
                }}
            />
            <Stack.Screen
                name="Holidays"
                component={HolidaysContainer}

                options={{headerShown: true,
                    headerTitle:'Holidays',
                    headerTitleAlign: 'center',
                        headerTitleStyle:{color:'#40302A'},
                    headerStyle: {
                        borderColor:'#F4F4F4',
                        backgroundColor: '#F4F4F4',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerLeft:()=><BackArrow/>,
                }}
            />

          <Stack.Screen
            name="Vacations"
            component={VacationsContainer}

            options={{headerShown: true,
              headerTitle:'Vacations',
              headerTitleAlign: 'center',
              headerTitleStyle:{color:'#40302A'},
              headerStyle: {
                borderColor:'#F4F4F4',
                backgroundColor: '#F4F4F4',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerLeft:()=><BackArrow/>,
            }}
          />


          <Stack.Screen
            name="NotificationsSetting"
            component={NotificationSettingContainer}

            options={{headerShown: true,
              headerTitle:'Notifications',
              headerTitleAlign: 'center',
                headerTitleStyle:{color:'#40302A'},
              headerStyle: {
                borderColor:'#F4F4F4',
                backgroundColor: '#F4F4F4',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerLeft:()=><BackArrow/>,
            }}
          />
 <Stack.Screen
            name="Access"
            component={EmployeeContainer}

            options={{headerShown: true,
                headerTitle:t('Employee'),
                headerTitleAlign: 'center',
                headerTitleStyle:{color:'#40302A'},
              headerStyle: {
                borderColor:'#F4F4F4',
                backgroundColor: '#F4F4F4',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerLeft:()=><BackArrow/>,
                //Button to add new user
              headerRight:()=><AddUser/>,
            }}
          />

            <Stack.Screen
                name="AddMember"
                component={AddMemberContainer}

                options={{headerShown: true,
                    headerTitle:'',
                    headerStyle: {
                        borderColor:'#F4F4F4',
                        backgroundColor: '#F4F4F4',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerLeft:()=><BackArrow/>,
                    //Button to add new user
                }}
            />




        </Stack.Navigator>
    );
};

export default MenuRoutes;
