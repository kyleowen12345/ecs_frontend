import React from 'react'
import {useVideoCall} from '../../../../lib/callContext'
import { Text,Box,Input,Button } from '@chakra-ui/react';
import { useMeeting,useParticipant } from "@videosdk.live/react-sdk";

const MessageList = ({messages}) => {
  const {formatAMPM} = useVideoCall()
  const {
 
    localParticipant,
   
  } = useMeeting({
    
  });
  return (
    <Box
      width={"100%"}
      height={"500px"}
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: "gray",
          borderRadius: '24px',
        },
      }}
      paddingX={5}
    >
    {messages?.map((message, i) => {
      const { senderName, message: text, timestamp } = message;

      return (
        <Box
          width={["100%","100%","55%","45%"]}
          bg={localParticipant?.displayName === senderName ? "blue": "green" }
          marginLeft={localParticipant?.displayName !== senderName && "auto"}
          key={i}
          paddingX={5}
          paddingY={2}
          color="white"
          borderRadius={10}
          marginTop={5}
        >
          <Box 
             display={"flex"}
             width="100%"
             justifyContent={"space-between"}
             alignItems="center"
             mb={5}
          >
          <Text
            margin={0}
            fontSize="20px"
          >
            {senderName}
          </Text>
          <Text
            style={{
              margin: 0,
              padding: 0,
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            {formatAMPM(new Date(timestamp))}
          </Text>
          </Box>
          <Text style={{ margin: 0, padding: 0, marginTop: 4 }}>{text}</Text>
         
        </Box>
      );
    })}
  </Box>
  )
}

export default MessageList