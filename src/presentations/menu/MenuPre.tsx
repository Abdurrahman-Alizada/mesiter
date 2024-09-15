import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import {Box} from  '@react-native-material/core'
import normalize from "../../utils/normalize";
import { List ,Divider} from 'react-native-paper';
//@ts-ignore
import calender from '../../assets/icons/calender.png';
//@ts-ignore
import key from '../../assets/icons/key.png'
//@ts-ignore
import  chevrionRight from "../../assets/icons/chevron-right.png"
// import { AntDesign } from '@expo/vector-icons';
//@ts-ignore
import notifications from "../../assets/icons/bell.png";
//@ts-ignore
import employes from "../../assets/icons/employe.png";
//@ts-ignore
import logout from "../../assets/icons/logout.png";
//@ts-ignore
import vacations from "../../assets/icons/vacation.png";
//@ts-ignore
import language from "../../assets/icons/language.png";
import {CommonActions, useFocusEffect, useNavigation} from "@react-navigation/native";
import ProfileCard from "../../components/profilecard/ProfileCard";

import { useSelector } from "react-redux";

import CustomDialog from "../../components/signin/CustomDialog";

// import SignOutDialog from "@components/dialogs/SignOutDialog";
import SignOutDialog from "../../components/dialogs/SignOutDialog";

import LanguageDialog from "../../components/dialogs/LanguageDialog";
import {useTranslation} from "react-i18next";

const MenuPre = () => {
    const {  t} =useTranslation()

    const navigation = useNavigation()
    const [signOutvisible,setSignOutVisible] = useState(false)
    const [languagevisible,setLanguageVisible] = useState(false)

    let user = useSelector(state => state?.user?.user);

    // const {email,role}  = user
    // useFocusEffect(
    //     React.useCallback(() => {
    //         storage().ref(CollectionConstant.userImageDir+"/"+user?.docId+".png").getDownloadURL().then((res)=>{
    //             setProfilePic(res)
    //         }).catch((e)=>{})
    //     }, [refresh])
    // )


    return (
<>
      <SignOutDialog visible={signOutvisible}  setVisible={setSignOutVisible}/>
    <LanguageDialog visible={languagevisible} setVisible={setLanguageVisible}/>
    <ScrollView contentContainerStyle={{ backgroundColor: "#F4F4F4" }}>

          <View>
              <Box mt={20} ph={10}>
                  <Text style={styles.heading}>{t("Profile-Photo")}</Text>
              </Box>
              {/*//profile card*/}
                        <ProfileCard profileData={user}/>


              <Box mt={10   } ph={10}>
                  <Text style={styles.heading}>Settings</Text>
              </Box>
              <View style={[styles.card,{backgroundColor:'#FFFEFA',margin:10,borderRadius:10, padding: 24, paddingTop: 24, paddingRight: 16, paddingBottom: 24, paddingLeft: 16}]}>
                  <Box >
                      {/* { user?.role==="employee" && */}
                      { true &&
                        <>
                      <List.Item
                        title="Employs"
                        titleStyle={styles.listStyles}
                        onPress={()=>navigation.navigate('Access' as never)}
                        left={props => <View style={{backgroundColor:'#F6F6F6',borderRadius:4,padding:4}}><Image source={employes} style={{ height: 20, width: 20 }} /></View>}
                        right={props => <Image source={chevrionRight} style={{ height: 20, width: 20 }} />}

                      />
                      <Divider style={{ marginTop: 10, marginBottom: 10 }} />

                        </>
                      }
                      <List.Item
                        title="Vacations"
                        titleStyle={styles.listStyles}
                        onPress={()=>navigation.navigate('Vacations' as never)}
                        left={props => <View style={{backgroundColor:'#F6F6F6',borderRadius:4,padding:4}}><Image source={vacations} style={{ height: 20, width: 20 }} /></View>}
                        right={props => <Image source={chevrionRight} style={{ height: 20, width: 20 }} />}

                      />
                      <Divider style={{ marginTop: 10, marginBottom: 10 }} />

                      <List.Item
                        title="Holidays"
                        titleStyle={styles.listStyles}
                        onPress={()=>navigation.navigate('Holidays' as never)}
                        left={props => <View style={{backgroundColor:'#F6F6F6',borderRadius:4,padding:4}}><Image source={calender} style={{ height: 20, width: 20 }} /></View>}

                        right={props => <Image source={chevrionRight} style={{ height: 20, width: 20 }} />}

                      />
                      <Divider style={{ marginTop: 10, marginBottom: 10 }} />

                      <Box>
                          <List.Item
                            title="Notifications"
                            titleStyle={styles.listStyles}
                            onPress={()=>navigation.navigate('NotificationsSetting' as never)}
                            left={props => <View style={{backgroundColor:'#F6F6F6',borderRadius:4,padding:4}}><Image source={notifications} style={{ height: 20, width: 20 }} /></View>}

                            right={props => <Image source={chevrionRight} style={{ height: 20, width: 20 }} />}

                          />
                      </Box>
                      <Divider style={{ marginTop: 10, marginBottom: 10 }} />


                      <Box>
                          <List.Item
                            title="Language"
                            onPress={()=>setLanguageVisible(true)}
                            titleStyle={styles.listStyles}
                            left={props => <View style={{backgroundColor:'#F6F6F6',borderRadius:4,padding:4}}><Image source={language} style={{ height: 20, width: 20 }} /></View>}

                            right={props => <Image source={chevrionRight} style={{ height: 20, width: 20 }} />}

                          />
                      </Box>
                      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                  </Box>
              </View>
          </View>

          <TouchableOpacity  onPress={()=>setSignOutVisible(true)}  style={{flexDirection:'row',alignItems:'center',justifyContent:'center',margin:10,paddingBottom:20}}>
              <Image source={logout} style={{ height: 20, width: 20 ,marginRight:10 }} />
              <Text style={styles.typo}>Log out</Text>
          </TouchableOpacity>

      </ScrollView>
</>
    );
}
const styles=StyleSheet.create({

    heading:{
        color: "#40302A",
        fontFamily: "Poppins-SemiBold",
        fontSize: normalize(15),
        fontWeight: '600',
        lineHeight: 24,
     },
    listStyles:{
        color: '#1F0900',
        fontFamily: "Poppins-Regular",
        fontSize: normalize(13),
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0.1,
    },

    typo:{
        color: '#CC3017',
        fontFamily: "Poppins-Regular",
        fontSize: normalize(13),
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0.1,
    }


})

export default MenuPre;
