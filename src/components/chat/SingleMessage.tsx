
import {View,StyleSheet,Text ,Image} from 'react-native'
import SenderMessage from "../../components/chat/SenderMessage";
import { ReceiverMessage } from "../../components/chat/ReceiverMessage";
import trash from '../../assets/icons/trash.png'
import normalize from '../../utils/normalize';
const SingleMessage=({msg})=> {


  return (
    <View key={msg.id} style={[styles.messageBox, msg.sender === 'sender' ? styles.senderMessageBox : styles.receiverMessageBox ,{marginBottom:msg.sender === 'sender' ?  20 :0,minHeight: msg.sender === 'sender' ?  20 :20 }]}>
      {msg.sender === 'sender' &&
        <View style={{flex:1,alignItems:'flex-end',marginRight:20}}><SenderMessage  msg={msg} /></View>
      }

      {msg.sender === 'receiver' &&
        <View style={{flex:1}}><ReceiverMessage msg={msg} /></View>
      }
      </View>

  )
}

const styles=StyleSheet.create({
  messageBox: {
    marginVertical: normalize(5),
    position:'relative'
  },
  senderMessageBox: {
    // alignSelf: 'flex-end',
  },
  receiverMessageBox: {
    // alignSelf: 'flex-start',
  },
  avatar: {
    resizeMode:'contain',


    borderRadius: 20,
    marginRight: 10,

  },
  senderAvatar: {
    alignSelf: 'flex-end',
    transform: [{scale: 2}],
  },
  receiverAvatar: {
    alignSelf: 'flex-end',
  },
  typo:{
    color:'#40302A',
    fontSize: normalize(9),
    fontWeight:'600',
    fontFamily: "Poppins-Regular",
    lineHeight:24,
    letterSpacing:0.15,
  }
})
export default  SingleMessage
