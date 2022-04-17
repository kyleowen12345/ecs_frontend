import React, { useState } from "react";
import {InputGroup, Input, InputLeftAddon, InputRightAddon,  Box, Button, Text,useToast, VStack, Image  } from '@chakra-ui/react'
import { useVideoCall } from "../../lib/callContext";


const MeetingDetailsScreen = ({ 
    onClickJoin,
    onClickCreateMeeting,
}) => {
  const {  
    createMeetingLoad,
    joinMeetingLoad,
   } = useVideoCall()
  const toast = useToast()
  const [meetingId, setMeetingId] =useState("");

  return (
        <Box 
           height={"90vh"} 
           display="flex"
           justifyContent={"center"}
           alignItems="center"
           >
              
                <VStack
                    maxH={"400px"}
                    spacing='24px'
                    paddingX={"10px"}
                    width="700px"
                >
                    <Button
                      bg={"brand.100"}
                      color="white"
                      _hover={{color:"brand.100", bg:"white"}}
                      width={"70%"}
                      maxW="200px"
                      fontWeight="normal"
                      isLoading={createMeetingLoad}
                      loadingText='Creating..'
                      onClick={onClickCreateMeeting}>
                      Create Meeting
                    </Button>

                    <Text 
                    color="white"
                    >OR</Text>

                    <InputGroup 
                      width={"100%"}
                    >
                          <InputLeftAddon 
                            children='Meeting ID'  
                            bg={"brand.100"}
                            color="white"
                            _hover={{color:"brand.100", bg:"white"}}
                          />
                          <Input 
                            placeholder='Enter meeting ID here..' 
                            onChange={(e) => {setMeetingId(e.target.value);}}
                          />
                          <InputRightAddon
                            bg={"brand.100"}
                            color="white"
                            _hover={{bg:"brand.100", color:"white"}} 
                            children={ <Button
                              disabled={!meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")}
                              bg={"brand.100"}
                              color="white"
                              borderY={"1px solid white"}
                              borderRadius={0}
                              _active={{bg:"brand.100", color:"white"}}
                              isLoading={joinMeetingLoad}
                              _hover={{bg:"brand.100", color:"white"}} 
                              onClick={(e) => {
                                if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}"))
                                  onClickJoin(meetingId);
                                else toast({
                                  title: 'Meeting ID is incorrect',
                                  description: "We've created your account for you.",
                                  status: 'error',
                                  duration: 3000,
                                  isClosable: true,
                                  position:"top"
                                })
                              }}
                              id={"btnJoin"}>
                              Join
                            </Button>} 
                          />
                    </InputGroup>
                </VStack>
            
        </Box>
  )
}

export default MeetingDetailsScreen