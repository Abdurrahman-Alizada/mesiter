import React from "react";
import ChatPre from "../../presentations/chat/ChatPre";
import { useRoute } from "@react-navigation/native";

const ChatContainer = (props) => {
  const route = useRoute();
  const taskId = route.params?.taskId;

  return <ChatPre taskId={taskId} />;
};

export default ChatContainer;
