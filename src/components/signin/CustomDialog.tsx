import React, {} from 'react';
import {

    TouchableOpacity,
    View,
    StyleSheet,
    Platform, Modal, Image
} from "react-native";
import * as M2DColor from "react-native-paper/src/styles/themes/v2/colors";

//@ts-ignore
import error404 from "../../assets/404.png"
import email from '../../assets/email.png'
import phone from '../../assets/phone.png'
import {Box, Text} from "@react-native-material/core";
import {sanFranciscoWeights} from "react-native-typography";
import normalize from '../../utils/normalize';

interface  Types{
    visible:    boolean;
    setVisible:React.Dispatch<React.SetStateAction<any>>;
}

const CustomDialog :React.FC<Types>= ({visible=false,setVisible=()=>{}}) => {
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

                <Image source={error404} resizeMode={'contain'}/>

                    </View>

            <Box ph={5}>

                    <View style={{paddingHorizontal:5,marginTop:normalize(7)}}>

                       <Text variant={'h6'} style={{ fontFamily:'Poppins-SemiBold',
                           fontWeight:'400',
                           fontSize:normalize(15),
                           lineHeight:24,
                           letterSpacing:1,
                           color:"#C8301E"
                       }}


                       >Your Account  is not authorized</Text>
                    </View>



                        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: normalize(5)}}>
                            <Text variant={'subtitle2'} style={[sanFranciscoWeights.regular, {
                                fontFamily:'Poppins-Regular',
                                fontWeight:'400',
                                fontSize:14,
                                marginTop:10,
                                letterSpacing:0.25,
                                lineHeight:20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3F302A'
                            }]}>
                                Contact us via email or phone number to receive authorization for access to this app. Once approved, you can try again.
                            </Text>




                        </View>
            </Box>


                    <Box mt={25}  ph={10}>
                        <TouchableOpacity activeOpacity={1}
                                          style={[styles.button, {borderWidth: 1, borderColor: '#0B335C',}]}>
                            <Image source={email} resizeMode={'contain'} style={{height:18,width:18}}/>
                            <Text style={{ fontFamily:'Poppins-SemiBold',fontSize:12,color: '#0B335C',marginLeft:5,marginTop:4}}>Email</Text>
                        </TouchableOpacity>
                        <Box mt={10} >
                        <TouchableOpacity activeOpacity={1}
                                          style={[styles.button, {borderWidth: 1, borderColor: '#0B335C',}]}>
                            <Image source={phone} resizeMode={'contain'} style={{height:18,width:18}}/>
                            <Text style={{ fontFamily:'Poppins-SemiBold',fontSize:12,color: '#0B335C',marginLeft:5,marginTop:4}}>Phone</Text>
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
    }

});

export default CustomDialog;
