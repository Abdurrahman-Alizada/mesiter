import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import SingleTask from "../../components/profilecard/SingleTask";
import normalize from "../../utils/normalize";
import { Divider } from "react-native-paper";
import SingleNotification from "../../components/notifications/SingleNotification";
const NotficationsPre = (props) => {
  const detailsdata=[
    {
      id:1,
      icons:'LowPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
      notificationType:'positive',
      notifcationSenderName:'New task assigned to you',
      notifcationDesc:'',
      isRead:true,


    },

    {
      id:2,
      icons:'HighPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
      notificationType:'medium',
      notifcationSenderName:'Holiday added on',
      notifcationDesc:'on 23-Aug-2023',
      isRead:true,
    },{
      id:2,
      icons:'HighPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
      notificationType:'neutral',
      notifcationSenderName:'John Smith',
      notifcationDesc:'Check this image to make  to ..',
      isRead:true,
    },{
      id:2,
      icons:'HighPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
      notificationType:'neutral',
      notifcationSenderName:'John Smith',
      notifcationDesc:'Check this image to make  to ..',
      isRead:false,
    },
    {
      id:3,
      icons:'MediumPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
      notificationType:'neutral',
      notifcationSenderName:'John Smith',
      notifcationDesc:'Check this image to make  to ..',
      isRead:false,
    },
    {
      id:3,
      icons:'MediumPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
      notificationType:'negative',
      notifcationSenderName:'Absent',
      notifcationDesc:'Marked kala marked self absetn',
      isRead:false,

    },
    {
      id:3,
      icons:'MediumPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
      notificationType:'postive',
      notifcationSenderName:'No time input today by',
      notifcationDesc:'John Smith',
      isRead:false,

    },

  ]


  return (
    <View style={[{marginTop:20,flex:1,minHeight:200,backgroundColor:   '#F2F2F2' }]}>

      <FlashList
        data={detailsdata}
        estimatedItemSize={200}
        keyExtractor={( _ ,index) => index.toString()}
        renderItem={({ item, index })=> {
          return (
            <>
              <SingleNotification data={item} />
            <Divider style={{borderWidth:0.4,borderColor:'rgba(64, 48, 42, 0.15)'}} />

            </>
          )
        }}
      />
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
    margin:10,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    padding: 5,
    paddingBottom:20,
  },

})



export default NotficationsPre;
