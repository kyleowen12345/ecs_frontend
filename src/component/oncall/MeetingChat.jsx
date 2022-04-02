import React,{useState} from 'react'
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    useConnection,
    usePubSub,
  } from "@videosdk.live/react-sdk";
import { Text } from '@chakra-ui/react';
import MessageList from './MessageList'

const MeetingChat = ({tollbarHeight}) => {
  const { publish, messages } = usePubSub("CHAT", {});
  const [message, setMessage] = useState("");

  return (
    <div
      style={{
        marginLeft: 8,
        width: 400,
        backgroundColor: "#3E84F6",
        overflowY: "scroll",
        borderRadius:8,
        height: `calc(100vh - ${120 + 2 * 8}px)`,
        padding: 8,
      }}
    >
      <Text >Chat</Text>

      <div style={{ display: "flex" }}>
        <input
          value={message}
          onChange={(e) => {
            const v = e.target.value;
            setMessage(v);
          }}
        />
        <button
          className={"button default"}
          onClick={() => {
            const m = message;

            if (m.length) {
              publish(m, { persist: true });
              setMessage("");
            }
          }}
        >
          Send
        </button>
      </div>
      <MessageList messages={messages} />
    </div>
  )
}

export default MeetingChat