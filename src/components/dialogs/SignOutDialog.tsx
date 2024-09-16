import React, {} from 'react';
import {

  TouchableOpacity,
  View,
  StyleSheet,
  Platform, Modal, Image
} from "react-native";
import * as M2DColor from "react-native-paper/src/styles/themes/v2/colors";

//@ts-ignore
import signout from '../../assets/signout.png'
import email from '../../assets/email.png'
import phone from '../../assets/phone.png'
import {Box,Flex, Text} from "@react-native-material/core";
import {sanFranciscoWeights} from "react-native-typography";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {useDispatch} from "react-redux";
// import {setUser} from "../../redux/user/userActions";
import normalize from '../../utils/normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreKeys } from '../../config/constants';
interface  Types{
  visible:    boolean;
  setVisible:React.Dispatch<React.SetStateAction<any>>;
}

const SignOutDialog :React.FC<Types>= ({visible=false,setVisible=()=>{}}) => {
  const navigation = useNavigation()
  const dispatch=useDispatch()
  const signOut = async ()=>{
    // navigation.navigate('Access' as never)
    await  AsyncStorage.removeItem(StoreKeys.UserData)
    // dispatch(setUser({},false))
    setVisible(false)

  }


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
            <View style={styles.modalHeader}>

              <Image source={signout} resizeMode={'contain'}/>

            </View>

            <Box ph={5}>

              <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: normalize(5)}}>
                <Text variant={'subtitle2'} style={[sanFranciscoWeights.regular, {
                  fontFamily:'Poppins-Regular',
                  fontWeight:'400',
                  fontSize:normalize(15),
                  letterSpacing:0.5,
                  lineHeight:24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1F0900'
                }]}>
                  Do you want to logout from
                </Text>


                <Text variant={'subtitle2'} style={[sanFranciscoWeights.regular, {
                  fontFamily:'Poppins-SemiBold',
                  fontWeight:'600',
                  fontSize:normalize(15),
                  marginTop:5,
                  letterSpacing:1,
                  lineHeight:20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3F302A'
                }]}>
                  “Meister & Reinigungs”?
                </Text>



              </View>
            </Box>


            <Box mt={25}  ph={10}>
              <TouchableOpacity onPress={()=>signOut()} activeOpacity={1}
                                style={[styles.button, {borderWidth: 1, borderColor: '#CC3017',backgroundColor:'#CC3017'}]}>
                <Text style={[styles.typo,{color:'white'}]}>Logout</Text>
              </TouchableOpacity>
              <Box mt={10} >
                <TouchableOpacity  onPress={()=>setVisible(false)} activeOpacity={1}
                                  style={[styles.button, {borderWidth: 1, borderColor: '#0B335C',}]}>
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

    height:45,
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

export default SignOutDialog;
