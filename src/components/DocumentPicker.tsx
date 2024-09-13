import React, { useState } from "react";
import { Button, Dialog, Portal } from 'react-native-paper';
import { TouchableOpacity, View,Text} from "react-native";
interface Types{
  visible:boolean;
  setVisible:Function;
  setImage:Function;
}
import AntDesign from 'react-native-vector-icons/AntDesign';
import normalize from "../utils/normalize";

const DocumentPicker:React.FC<Types> = ({visible=false,setVisible=()=>{},setImage=()=>{}}) => {
  const [uploadedPic, setUploadPic] = useState('');

  const handleCameraPress = async () => {
    setVisible(false)
  
  };

  const handleFilePress = async () => {
    setVisible(false)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {

        if(Array.isArray(result.assets)){
          if(result.assets[0].uri){

            setImage(result.assets[0].uri)
            // setUploadPic(result.assets[0].uri);

          }
        }
      }
    }
  };



  return (
    <>
    <Portal>
    <Dialog visible={visible} onDismiss={() => setVisible(false)} style={{backgroundColor:'white'}}>
      <Dialog.Title style={{ fontFamily:'Poppins-Regular',color:"#40302A"}}>Choose</Dialog.Title>
      <Dialog.Content style={{alignItems:'center' ,backgroundColor:'white',padding:normalize(20)}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{marginRight:normalize(30)}}>
            <TouchableOpacity onPress={() =>handleCameraPress()}>
              {/* <AntDesign name="camerao" size={36} style={{marginLeft:10}} color="#40302A" /> */}

              <Text style={{color:"#40302A" ,marginTop:10}}>Camera</Text>
            </TouchableOpacity>

          </View>
          <View style={{marginLeft:normalize(30)}}>
            <TouchableOpacity onPress={() =>handleFilePress()}>
              <AntDesign name="folder1" size={36} style={{marginLeft:5}} color="#40302A" />
              <Text style={{color:"#40302A" ,marginTop:10}}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => setVisible(false)}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>


    </>
  )
}
export default DocumentPicker;
