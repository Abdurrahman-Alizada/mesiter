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
import copy from '../../assets/icons/copy.png';

import {useTheme} from "@react-navigation/native";
import normalize from '../../utils/normalize';
// @ts-ignore


interface IconsList {}


interface inputprops {
  isRightIcon?: boolean;
  label: string;
  formikProps: any;
  formiKey: string;
  [key: string]: any;
}

const SingleInput: React.FC<inputprops> = ({
                                             isRightIcon = false,
                                             label='label',
                                             formiKey,
                                             formikProps,
                                             ...rest
                                           }): React.ReactElement => {
  const [sec, setSec] = useState(true);
  const ref= useRef(null)
  const {colors} =useTheme()
  let Inputstyles = {
    backgroundColor:'#F6F6F6',
    borderWidth: 1,
    paddingLeft:8,
    paddingTop:8,
    paddingRight:8,
    borderColor: '#F6F6F6',
    borderRadius: 7,
  };



  if (formikProps.touched[formiKey] && formikProps.errors[formiKey]) {
    Inputstyles.borderColor = 'red';
  }

  useEffect(() => {

  }, []);

  return (
    <>
      {/*//@ts-ignore*/}
      <View style={Inputstyles}>
        <Text style={[styles.label,{color:colors.text}]}>{label}</Text>

        {/*<View style={Inputstyles}>*/}
        <View style={{flexDirection:'row',alignItems: 'center',}}>
          <PaperInputText
            ref={ref}
            style={styles.input}
            // onFocus={()=>setFocus()}
            value={formikProps.values[formiKey]}
            placeholderTextColor={'#1F0900'}

            onChangeText={formikProps.handleChange(formiKey)}
            onBlur={formikProps.handleBlur(formiKey)}
            secureTextEntry={sec}
            {...rest}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSec(!sec)}>
            {isRightIcon && (
              <Image source={copy}  resizeMode={'contain'} style={{transform:[{scale:1.5}],marginRight:10,height: 30, width: 20}} />
            )}
          </TouchableOpacity>
        </View>

        {formikProps.touched[formiKey] && formikProps.errors[formiKey] &&

          <Box ph={10} mt={2}>
            <Text color={'red'} variant={'subtitle2'}>
              {formikProps.touched[formiKey] && formikProps.errors[formiKey]}
            </Text>
          </Box>
        }
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
    height: 50,
    color: '#22609D',
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
    padding: 8,
  },

  label:{
    color:'red',
    fontFamily: 'Poppins-Regular',
    fontSize:normalize(11),
    fontWeight:'600',
    letterSpacing:0.4,
    lineHeight:16,
    marginLeft:15,

  }
});


export default SingleInput;
