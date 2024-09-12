import React, {useEffect, useState} from 'react';
import {

  TouchableOpacity,
  View,
  StyleSheet,
  Platform, Modal, Image
} from "react-native";
import * as M2DColor from "react-native-paper/src/styles/themes/v2/colors";

//@ts-ignore
import error404 from '@assets/404.png'
//@ts-ignore
import tick from '../../assets/icons/tick.png'
import email from '../../assets/email.png'
import phone from '../../assets/phone.png'
import {Box,Flex, Text} from "@react-native-material/core";
import {sanFranciscoWeights} from "react-native-typography";
import { CommonActions } from "@react-navigation/native";
// import {Languages} from "../../services/languageList";
import i18next from "i18next";
// import * as SecureStore from 'expo-secure-store';
// import {StoreKeys} from "@config/constants";
import {useTranslation} from "react-i18next";
import normalize from '../../utils/normalize';
import { Languages } from '../../services/languageList';
interface  Types{
  visible:    boolean;
  setVisible:React.Dispatch<React.SetStateAction<any>>
}

const LanguageDialog :React.FC<Types>= ({visible=false,setVisible=()=>{}}) => {
  const [isGerman,setIsGerman] = useState(true)
 const {t} =  useTranslation()

  const changeLanguage=async()=>{
    i18next.changeLanguage(isGerman ? Languages?.sg: Languages?.en)
    setVisible(false)

    await SecureStore.setItemAsync(StoreKeys.AppLanguage, isGerman ? Languages?.sg: Languages?.en);
  }



  useEffect(() => {
    (async function() {
      const appLanguage = await SecureStore.getItemAsync(StoreKeys.AppLanguage);
      setIsGerman(appLanguage === Languages.sg ? true :false)
    })()

  }, []);




  return(
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={()=> {

        setVisible(false)
      }}
    >
      <TouchableOpacity
        style={{flex:1}}
        onPress={() => {
          setVisible(false)
        } }>
        <View style={[styles.modalContainer]}>
          <View style={[styles.modalContent, Platform.OS === "ios" &&  styles.iosExtras ]}>

            <Box ph={8}>

              <View style={{paddingHorizontal:5}}>

                <Text  style={{
                  fontFamily:'Poppins-SemiBold',
                  fontWeight:'600',
                  fontSize:normalize(15),
                  lineHeight:24,
                  letterSpacing:1,
                  color:"#1F0900"
                }}>{t('select-your-language')}</Text>
              </View>




            </Box>


            <Box mt={25}  p={10} >
              <TouchableOpacity onPress={()=>setIsGerman(false)} activeOpacity={1}
                                style={[styles.button, {borderWidth: 1, borderColor: '#0B335C', backgroundColor: !isGerman ? 'rgba(1, 37, 71, 0.10)' : 'transparent'}]}>
                {!isGerman &&
                <Image source={tick} resizeMode={'contain'} style={{height:23,width:23,transform:[{scale:1.5}]}}/>
                }

                <Text style={styles.typo}>English</Text>
              </TouchableOpacity>
              <Box mt={10} >
                <TouchableOpacity onPress={()=>setIsGerman(true)}activeOpacity={1}
                                  style={[styles.button, {borderWidth: 1, borderColor: '#0B335C',backgroundColor: isGerman ? 'rgba(1, 37, 71, 0.10)' : 'transparent'}]}>
                  {isGerman &&
                  <Image source={tick} resizeMode={'contain'} style={{height:24,width:24,transform:[{scale:1.5}]}}/>
                  }
                  <Text style={styles.typo}>German</Text>
                </TouchableOpacity>

              </Box>


            </Box>

            <Box mt={10}  p={10} >
              <TouchableOpacity onPress={changeLanguage} activeOpacity={1}
                                style={[styles.button, {borderWidth: 1, borderColor: '#0B335C', backgroundColor:  '#012547' }]}>


                <Text style={[styles.typo,{color:'white'}]}>Save</Text>
              </TouchableOpacity>
              <Box mt={10} >
                <TouchableOpacity onPress={()=>setVisible(false)} activeOpacity={1}
                                  style={[styles.button, {borderWidth: 1, borderColor: '#0B335C',backgroundColor: 'transparent'}]}>

                  <Text style={styles.typo}>Cancel</Text>
                </TouchableOpacity>

              </Box>


            </Box>

          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}


const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    padding:10,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#FFFEFA',
    paddingVertical:normalize(30),
    paddingHorizontal:normalize(10),
    borderRadius: 8,
  },
  modalHeader:{
    padding:normalize(5),
    marginBottom:10,
  },

  textArea: {
    height: 120,
    borderColor: M2DColor.grey400,
    borderRadius:4,
    borderWidth: 1,
    fontSize: 16,
    padding: 8,
  },

  iosExtras:{
    marginTop:'10%'
  },
  button:{
    flexDirection: 'row',

    height:50,
    borderRadius:7,
    justifyContent:'center',
    alignItems:'center'
  },
  typo:{
    color:'#012547',
    fontFamily:'Poppins-Medium',
    fontSize:normalize(13),
    marginLeft:5,marginTop:4,
    fontWeight:'500',
    letterSpacing:0.15,
  }



});

export default LanguageDialog;
