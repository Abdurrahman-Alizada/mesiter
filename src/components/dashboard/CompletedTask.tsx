import React from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import SingleTask from "./SingleTask";

const CompletedTask = ({ data }) => {
  return (
    <View style={{ minHeight: 200 }}>
      <FlashList
        data={data}
        estimatedItemSize={200}
        // keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <SingleTask data={item} />}
      />
    </View>
  );
}

export default CompletedTask;
