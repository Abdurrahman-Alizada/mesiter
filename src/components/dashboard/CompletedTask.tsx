import React from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
// import SingleTask from "@components/dashboard/SingleTask";
import SingleTask from "./SingleTask";

const CompletedTask=()=>{

  const data=[
    {
      id:1,
      icons:'LowPriority',
      title:'Heading Text You Gave',
      slug:'location you gave',
      start:'23-09-2023',
      startTime:'05:55 PM',
      end:'23-09-2023',
      endTime:'05:55 PM',
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
    }
  ]

  console.log(data.length)

  return (
    <View style={{minHeight:200}}>
      <FlashList
        data={data}
        estimatedItemSize={200}
        keyExtractor={( _ ,index) => index.toString()}
        renderItem={({ item, index })=><SingleTask  data={item}/>}
      />


    </View>
  )
}

export default CompletedTask;
