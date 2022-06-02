import React from 'react'
import { useMeeting,MeetingProvider } from "@videosdk.live/react-sdk";
import {  Box, Text,Icon,Badge, Button,useToast,useDisclosure,AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,   } from '@chakra-ui/react'
    import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import { useVideoCall } from '../../lib/callContext';
import { validateMeeting } from '../../lib/api';
import {useParams,useNavigate,useLocation,useSearchParams } from "react-router-dom";

const RequestJoin = () => {
    const {meetingID} = useParams()
  const {
      token,
    entryRequestLoading,
    setEntryRequestLoading,
    myCookie
   } = useVideoCall()

   const {
    meetingId,
    //
    join,
    
  } = useMeeting({});
    const handleJoinConference = async() => {
        setEntryRequestLoading(true)
         try {
          
          const valid = await validateMeeting({meetingId:meetingID,token:token? token:  myCookie})
          console.log(valid)
           if(valid){
           
              join()
              setEntryRequestLoading(false)
           }else{
            setEntryRequestLoading(false)
             alert('token or meetingId is invalid')
           }
         } catch (error) {
           console.log(error)
           setEntryRequestLoading(false)
         }
         
      }

     

  return (
    <Box
    width={"100%"}
    height="100%"
    display={"flex"}
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    mt={10}
  >
    
      <Button
          w={"300px"}
          bg={"brand.100"}
          color="white"
          _hover={{color:"brand.100", bg:"white"}}
          onClick={handleJoinConference}
          isLoading={entryRequestLoading}
      >
          Request to join
      </Button>
      <Text  mt={5}>Meeting id is : {meetingId || meetingID}</Text>
  </Box>  
  )
}

export default RequestJoin