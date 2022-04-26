import React,{useState} from 'react'
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    useConnection,
    usePubSub,
  } from "@videosdk.live/react-sdk";
import { Text,Box,Button,InputGroup, Input, InputLeftAddon, InputRightAddon, } from '@chakra-ui/react';
import MessageList from './MessageList'
import { useVideoCall } from '../../../../lib/callContext';

const MeetingChat = ({tollbarHeight}) => {
  const {setMessageAlert} = useVideoCall
  const { publish, messages } = usePubSub("CHAT", {
    onMessageReceived,
    onOldMessagesReceived,
  });
  const [message, setMessage] = useState("");

  function onMessageReceived(message) {
    console.log("New Message:", message);
    // setMessageAlert(true)
    // setTimeout(() => {
    //   console.log('Hello, World!')
    // }, 3000);
    
  }
  
  function onOldMessagesReceived(messages) {
    console.log("Old Messages:", messages);
  }
  console.log(messages)
  return (
    <Box
      width={"100%"}
    >

      <Box 
        display={"flex"}
        mb={5}
      >
         <InputGroup 
          width={"100%"}
         >
            <Input
              color="white"
              value={message}
              onChange={(e) => {
                const v = e.target.value;
                setMessage(v);
              }}
            />
            <InputRightAddon
                bg={"brand.100"}
                color="white"
                _hover={{bg:"brand.100", color:"white"}} 
                children={ 
                  <Button
                    bg={"brand.100"}
                    color="white"
                    borderY={"1px solid white"}
                    borderRadius={0}
                    _active={{bg:"brand.100", color:"white"}}
                    _hover={{bg:"brand.100", color:"white"}}
                    onClick={() => {
                      const m = message;
          
                      if (m.length) {
                        publish(m, { persist: true });
                        setMessage("");
                        console.log('this worked')
                      }
                    }}
                >
                  Send
                </Button>} 
              />
         </InputGroup>
       
        
      </Box>
      <MessageList messages={messages} />
    </Box>
  )
}

export default MeetingChat