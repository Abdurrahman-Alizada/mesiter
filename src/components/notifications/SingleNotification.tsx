import React,{useState} from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { Box ,Flex} from "@react-native-material/core";
// @ts-ignore
import HighPriority from '@assets/icons/HighPriority.png'
// @ts-ignore
import LowPriority from '@assets/icons/lowPriority.png'
// @ts-ignore
import MediumPriority from '@assets/icons/MediumPriority.png'
import normalize from "../../utils/normalize";


// @ts-ignore
  const SingleNotification = ({ data }) => {

    const iconsList = { HighPriority, LowPriority, MediumPriority }


    return (
      <View style={[styles.container, { backgroundColor: data.isRead ? 'white' : '#F2F2F2' }]}>
        <View style={styles.content}>
          <View style={styles.img}>
            {/*// @ts-ignore*/}
            <Image source={iconsList[data.icons]} style={[{ height: 50, width: 65 }]} />
          </View>
          <View style={styles.details}>
            <Box mt={5}>
              <Text style={styles.taskTitle}>{data.title}</Text>
            </Box>
            <Box mt={2}>
              <Text style={styles.taskLocation}>{data.slug}</Text>
            </Box>
            <Flex mt={2} direction={'row'}>
              <Text style={[styles.taskLocation, {
                color: data.notificationType === 'negative' ? '#CC3017' :
                  data.notificationType === 'positive' ? '#005E98' :
                    data.notificationType === 'medium' ? '#7A6C04' : '#1F0900'


              }]}>{data.notifcationSenderName}</Text>
              <Text style={[styles.taskLocation, { marginLeft: 10, width: 250, }]}>{data.notifcationDesc}</Text>
            </Flex>


          </View>
        </View>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'flex-start',

    },
    content: {

      flexDirection: 'row'
    },

    img: {
      backgroundColor: '#F6F6F6',
      borderWidth: 1,
      justifyContent: 'center',
      padding: 2,
      borderColor: '#F6F6F6',
      borderRadius: 4,
      height: 66,
    },

    details: {
      flexBasis: '80%',

      paddingHorizontal: 15,
    },
    taskTitle: {
      color: '#1F0900',
      fontFamily: 'Poppins-Regular',
      fontSize: normalize(12),
      fontWeight: '500',
      lineHeight: 16, /* 133.333% */
      letterSpacing: 0.5,
    },
    taskLocation: {
      color: '#1F0900',
      fontFamily: 'Poppins-Regular',
      fontSize: normalize(10),
      fontWeight: '500',
      lineHeight: 16, /* 133.333% */
      letterSpacing: 0.5,
    },

    typo: {

      fontFamily: 'Poppins-Regular',
      fontSize: normalize(9),
      fontWeight: '500',
      lineHeight: 16, /* 133.333% */
      letterSpacing: 0.5,
    },
    employesContainer: {
      marginTop: 10,
      marginLeft: 5,
      flexDirection: 'row'
    },
    employesPic: {
      height: 24,
      width: 24,
      marginLeft: -5,

      borderRadius: 50,
    },
    picTranparent: {
      backgroundColor: 'red',
    },

    employesPicLast: {
      height: 25,
      width: 24,
      marginLeft: -5,
      borderRadius: 50,
      overflow: 'hidden',
      // width: '100%',
    },
    totalTitle: {
      color: '#FFFEFA',
      fontFamily: 'Poppins-Regular',
      fontSize: 8,
      fontWeight: '500',
      lineHeight: 16, /* 200% */
      letterSpacing: 0.5
    },
    percpercentAgent: {
      color: '#1F0900',
      fontFamily: 'Poppins-Regular',
      fontSize: normalize(10),
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 0.5
    },


  })





export default SingleNotification;





