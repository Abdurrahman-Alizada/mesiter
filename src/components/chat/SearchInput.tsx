import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput as PaperInputText,
  TouchableOpacity,
  View,
} from 'react-native';
import {Box, Text} from '@react-native-material/core';
// @ts-ignore
import paperclip from '@assets/icons/paperclip.png';
// @ts-ignore
import send from '@assets/icons/send.png';
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../redux/chatbot/chatActions";
// @ts-ignore


interface IconsList {
  [key: string]: any;
}



interface inputprops {}

const SearchInput: React.FC<inputprops> = ({}): React.ReactElement => {
  const [numOfLines,setNumofLines] =useState(1)

  const conversation = useSelector(
    state => state.chat.conversation && state.chat.conversation,
  );

  const [value,setValue] =useState('')

  const dispatch = useDispatch()

  const ref= useRef(null)
  let Inputstyles = {
    flexDirection: 'row',
    backgroundColor:'#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    paddingHorizontal: 10,

  };





  const changeLine=(e)=>{


    setNumofLines(e.nativeEvent.contentSize.height / 18)
  }

  const sendMessage=()=>{

    const newMsg= {

      id:conversation.length + 1,
      sender: 'sender',
      message: value ,
      date:'02-09-2023',
      time:'09:00 PM'
    }

      const recMsg= {

        id:conversation.length + 2,
      sender: 'receiver',
      message: 'Man images for free download. Browse or use the filters to find your next picture for your project. Royalty-free images.' ,
      date:'02-09-2023',
      time:'09:00 PM'
    }
    co

    const newconversation =[...conversation,newMsg,recMsg]
      dispatch(setConversation(newconversation))
    setValue('')
  }

  return (
    <>
      {/*//@ts-ignore*/}
      <View style={Inputstyles}>

          <Image source={paperclip} style={{height: 24, width: 24,marginLeft:10}} />


        <PaperInputText
          multiline={true}
          ref={ref}
          numberOfLines={numOfLines}
          // onContentSizeChange={(e) => {
          //   numOfLinesCompany = e.nativeEvent.contentSize.height / 18;
          // }}
          onContentSizeChange={changeLine}
          style={[styles.input, {minHeight:50,textAlignVertical: "top",color: '#40302A',fontFamily: 'Poppins-Regular'}]}
          value={value}
          placeholderTextColor={'grey'}
          onChangeText={setValue}
          // onBlur={formikProps.handleBlur(formiKey)}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() =>sendMessage()}>

            <Image source={send} style={{height: 24, width: 24}} />

        </TouchableOpacity>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,

    borderRadius: 4,
    paddingHorizontal: 10,
  },

  icon: {
    marginRight: 10,
  },
  input: {
    fontFamily: 'Roboto-Bold',
    minHeight: 50,

    flex: 1,
    backgroundColor:'#F6F6F6',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  outlineInput:{
    borderRadius:7,
    borderColor:'#F6F6F6'
  },
  iconContainer: {
  marginRight:10,
  },
});

export default SearchInput;


