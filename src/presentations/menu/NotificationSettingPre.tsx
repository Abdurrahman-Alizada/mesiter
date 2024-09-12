import React from 'react';
import {Text,View,StyleSheet,Image} from 'react-native'
import {Box} from  '@react-native-material/core'
import normalize from "../../utils/normalize";
import { List ,Divider} from 'react-native-paper';
//@ts-ignore
import calender from '../../assets/icons/calendar.png'
//@ts-ignore
import key from '@assets/icons/key.png'
//@ts-ignore
import  chevrionRight from "../../assets/icons/chevron-right.png"
//@ts-ignore
import notifications from "../../assets/icons/bell.png";
import { useNavigation } from "@react-navigation/native";
import { Switch } from 'react-native-paper';





const NotificationSettingPre = () => {
  const navigation = useNavigation()
  const [isPushOn, setIsPushOn] = React.useState(false);
  const [isChatOn, setIsChatOn] = React.useState(false);
  const onPushSwitch = () => setIsPushOn(!isPushOn);
  const onChatSwitch = () => setIsChatOn(!isChatOn);


  return (
    <View style={{ backgroundColor: "#F4F4F4" }}>

      <View>
        <View style={[styles.card,{marginTop:40}]}>
          <Box ph={20}>

            <List.Item
              title="Push Notifications"
              description='Show notification anywhere'
              titleStyle={styles.listStyles}
              right={props => <Switch value={isPushOn} onValueChange={onPushSwitch} />}

            />
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />

            <Box>
            <List.Item
              title="Chat Notifications"
              description='Receive chat notifications'
              titleStyle={styles.listStyles}
              right={props => <Switch  value={isChatOn} onValueChange={onChatSwitch} />}

            />
            </Box>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          </Box>
        </View>
      </View>

    </View>

  );
}
const styles=StyleSheet.create({
  card:{
    margin:10,
    marginTop:normalize(10),
    // backgroundColor:'red',
    backgroundColor:'white',
    shadowColor: 'white',
    borderRadius:10,
    shadowOpacity: 0.5,
    elevation:20,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom:20,
  },
  heading:{
    color: "#40302A",
    fontFamily: "Poppins-SemiBold",
    fontSize: normalize(15),
    fontWeight: '600',
    lineHeight: 24,
  },
  listStyles:{
    color: '#1F0900',

    /* pop 14 med */
    fontFamily: "Poppins-Regular",
    fontSize: normalize(13),

    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1
  }
})

export default NotificationSettingPre;

