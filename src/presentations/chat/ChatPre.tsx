import React, { useEffect, useRef } from "react";
import { Text, Box } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import SingleMessage from "../../components/chat/SingleMessage";
import normalize from "../../utils/normalize";
import { TextInput } from "react-native-paper";
import SearchInput from "../../components/chat/SearchInput";
import { useFocusEffect } from "@react-navigation/native";

const ChatPre = (props) => {
  const flatListRef = useRef(null);
  const taskId = props.taskId;
  const conversation = useSelector(
    (state) => state?.chat?.conversation && state?.chat?.conversation
  );
  const [text, setText] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
    
    }, [taskId])
  );

  return (
    <View style={{ flexGrow: 1, backgroundColor: "#FFFEFA" }}>
      <View
        style={{ flex: 1, backgroundColor: "#FFFEFA", paddingHorizontal: 10 }}
      >
        <FlatList
          ref={flatListRef}
          data={conversation}
          renderItem={({ item, index }) => <SingleMessage msg={item} />}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{ flex: 0.2, justifyContent: "flex-end", paddingBottom: 10 }}
      >
        <Box ph={10}>
          <SearchInput />
        </Box>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    fontSize: normalize(14),
    color: "#40302A",
    marginLeft: 10,
    fontWeight: "400",
    fontFamily: "Poppins-Medium",
    lineHeight: 24,
    letterSpacing: 1,
  },
});

export default ChatPre;
