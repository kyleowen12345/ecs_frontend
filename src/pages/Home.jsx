import React from "react";
import { useNavigate   } from "react-router-dom";
import MeetingDetailsScreen from "../component/staging/MeetingDetailsScreen";
import { getToken,validateMeeting,createMeeting } from "../lib/api";
import { useVideoCall } from '../lib/callContext'
import {useToast,Box } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Navbar from '../component/header/Navbar'



const Home = () => {
  const navigate = useNavigate();
  const toast = useToast()
  const {
          setToken,
          setMeetingId, 
          setMicOn, 
          setWebcamOn,
          setReadyToJoin,
          setCreateMeetingLoad,
          setJoinMeetingLoad,
  } = useVideoCall()

  // onClickJoin
  const onClickJoin = async (id) => {
    try {
      setJoinMeetingLoad(true)
      const token = await getToken(false);
      const valid = await validateMeeting({ meetingId: id, token });
      if (valid) {
        Cookies.set('validation',token,{expires:1,secure:true})
        setReadyToJoin(true);
        setToken(token);
        setMeetingId(id);
        setWebcamOn(true);
        setMicOn(true);
        navigate('/join-meeting')
        setJoinMeetingLoad(false)
      } else alert("Invalid Meeting Id");
    } catch (error) {
      console.log(error)
      toast({
        title: 'Meeting ID is incorrect',
        description: "Please make sure the meetingId is correct.",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position:"top"
      })
    }
    
  }

  // onClickCreateMeeting
 const onClickCreateMeeting = async () => {
    try {
      setCreateMeetingLoad(true)
      const token = await getToken(true);
      const _meetingId = await createMeeting({token,region:"sg001"});
      Cookies.set('validation',token,{expires:1,secure:true})
      setToken(token);
      setMeetingId(_meetingId);
      setReadyToJoin(true);
      setWebcamOn(true);
      setMicOn(true);
      navigate('/create-meeting')
      setCreateMeetingLoad(false)
    } catch (error) {
      toast({
        title: "Can't create a meeting",
        description: "Please try again",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position:"top"
      })
    }
    
  }

  return (
  <Box 
  height={"100vh"}
  css={{
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }}>
    <Navbar/>
     <MeetingDetailsScreen onClickJoin={onClickJoin} onClickCreateMeeting={onClickCreateMeeting}/>
  </Box>
  )
}

export default Home