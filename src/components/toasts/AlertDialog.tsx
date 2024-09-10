import React, {} from 'react';
import {

    TouchableOpacity,
    View,
    StyleSheet,
    Platform, Modal, Image
} from "react-native";
import * as M2DColor from "react-native-paper/src/styles/themes/v2/colors";

//@ts-ignore
import error404 from '@assets/404.png'
import email from '@assets/email.png'
import phone from '@assets/phone.png'
import {Box,Flex, Text} from "@react-native-material/core";
import {sanFranciscoWeights} from "react-native-typography";
import signout from "@assets/signout.png";
import normalize from '../../utils/normalize';
interface  Types{
    visible:    boolean;
    message:string,
    setVisible:React.Dispatch<React.SetStateAction<any>>;
}

const AlertDialog :React.FC<Types>= ({message='None',visible=false,setVisible=()=>{}}) => {
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
                                    fontSize:normalize(12),
                                    letterSpacing:0.5,
                                    lineHeight:24,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#1F0900'
                                }]}>
                                    {message}
                                </Text>





                            </View>
                        </Box>


                        <Box mt={25}  ph={10}>
                            <TouchableOpacity onPress={()=>setVisible(false)} activeOpacity={1}
                                              style={[styles.button, {borderWidth: 1, borderColor: '#CC3017',backgroundColor:'#CC3017'}]}>
                                <Text style={[styles.typo,{color:'white'}]}>Done</Text>
                            </TouchableOpacity>



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
    }

});



export default AlertDialog;