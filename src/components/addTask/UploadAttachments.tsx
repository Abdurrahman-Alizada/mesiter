import {Image, Platform, StyleSheet, TouchableOpacity, View,Text} from "react-native";
import React, { useState} from 'react';
import DocumentPicker from "../../components/DocumentPicker";
//@ts-ignore
import paperclip from '../../assets/icons/paperclip.png'
//@ts-ignore
import cross from '../../assets/icons/cross.png'
//@ts-ignore
import {Box} from "@react-native-material/core";

const UploadAttachments=({uploadedPics=[], setUploadPics})=>{
  const [visible, setVisible] = useState(false);


  const deleteIndex=(index:number)=>{

    const updatedPics = [...uploadedPics];

    // Use the splice method to remove the element at the specified index
    updatedPics.splice(index, 1);

    // Update the state with the modified array
    setUploadPics(updatedPics);

  }
  const setImage=(receivedImg:any)=>{
    const items=[receivedImg,...uploadedPics]
    //@ts-ignore
    setUploadPics(items)



  }


  return (
    <View  >
        <DocumentPicker visible={visible} setVisible={setVisible} setImage={setImage}/>
        <Box ph={10} mt={10} mb={5}>
        <Text style={styles.title}>Attachments</Text>

        </Box>
      <View style={[styles.container]}>
        <ImagePickerPlaceHolder handler={()=>setVisible(true)}/>
        {uploadedPics.map((item,index)=>(
        <ImageHolder key={index} handler={()=>deleteIndex(index)} imgUri={uploadedPics[index]} />

        ))}

      </View>
       </View>


  )
}
//@ts-ignore
const ImagePickerPlaceHolder=({handler})=>(
  <TouchableOpacity onPress={()=>handler()} style={styles.pickerHolder}>
      <Image source={paperclip} resizeMode={'contain'} style={styles.clipIcon} />
    <Text style={styles.plaholderText}>Add to System</Text>
  </TouchableOpacity>
)

//@ts-ignore
export const ImageHolder=({handler,imgUri})=>(
  <TouchableOpacity onPress={()=>handler()} style={[styles.pickerHolder,{position:'relative',paddingVertical:20}]}>
    <Image source={{uri:imgUri}} resizeMode={'contain'} style={{height:100,width:100}} />
    <View style={styles.deleteHolder}>
      <Image source={cross} resizeMode={'contain'} style={{height:24,width:24}} />
    </View>
  </TouchableOpacity>
)


const styles = StyleSheet.create({

  container:{
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'flex-start'
  },
  pickerHolder:{
    justifyContent:'center',
    display: 'flex',
    height: 120,
    paddingHorizontal: 15,
    alignItems:'center',
    margin: 10,
    borderRadius: 8,
    borderWidth:1.5,
    borderColor:'#40302A',
    borderStyle:'dashed',

    opacity: 0.8,
  },
  clipIcon:{
    height:24,
    width:24
  },
  plaholderText:{
  color:  '#40302A',
  fontFamily: 'Poppins-Regular',
  fontSize: 10,
  fontWeight: '400',
  lineHeight: 16,
  letterSpacing: 0.5,
},
  deleteHolder:{
    position:'absolute',
    borderLeftRadius:8,
    borderTopStartRadius:8,
    borderBottomStartRadius:8,
    right:-8,
    top:-10,
    display: 'flex',
    width: 48,
    height: 48,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor:'rgba(3, 1, 0, 0.08)',
  },
  title:{
    color: '#40302A',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16, /* 133.333% */
    letterSpacing: 0.5,
  }





});



export default UploadAttachments;
