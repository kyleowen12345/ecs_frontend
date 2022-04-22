import React from 'react'
import { useNavigate   } from "react-router-dom";
import { useMeeting,useParticipant } from "@videosdk.live/react-sdk";
import {useMediaQuery ,useDisclosure,Box, Icon   } from '@chakra-ui/react'
import { BsChevronDoubleDown,BsChevronDoubleUp } from 'react-icons/bs';
import { useVideoCall } from '../../../lib/callContext';
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import FirstMenuSection from './bottommenusections/FirstMenuSection';
import SecondMenuSection from './bottommenusections/SecondMenuSection';
import ThirdMenuSection from './bottommenusections/ThirdMenuSection';
import SmallScreenMenu from './bottommenusections/SmallScreenMenu';

const BottomMenu = () => {
  const navigate = useNavigate();
  const {token} = useVideoCall()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const boxRef = React.useRef()
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const {
    meetingId,
    meeting,
    localParticipant,
    mainParticipant,
    activeSpeakerId,
    participants,
    presenterId,
    localMicOn,
    localWebcamOn,
    localScreenShareOn,
    messages,
    isRecording,
    isLiveStreaming,
    pinnedParticipants,
    //
    join,
    leave,
    connectTo,
    end,
  
    // 
    startRecording,
    stopRecording,
    //
    respondEntry,
    //
    muteMic,
    unmuteMic,
    toggleMic,
    //
    disableWebcam,
    enableWebcam,
    toggleWebcam,
    //
    disableScreenShare,
    enableScreenShare,
    toggleScreenShare,
    //
    getMics,
    getWebcams,
    changeWebcam,
    changeMic,

  
  } = useMeeting({
    
  });

  const {
    webcamOn,
    micOn,
    screenShareOn,
   
  } = useParticipant(localParticipant && localParticipant.id, {
    
  });
  const handleStartRecording = () => {
    meeting?.startRecording()
    startRecording();
  };
  const handleStopRecording = () => {
    meeting?.startRecording()
    stopRecording();
  };

const decoded = jwt_decode(token ? token : Cookies.get('validation'))

const endMeeting = () => {
     end()
    //  navigate('/')
}
const leaveMeeting = () => {
     leave()
     navigate('/')
}
  
  return (
    <Box
     display={"flex"}
     flexDirection="column"
     width={"100%"}
     position="fixed"
     ref={boxRef}
     className={!isLargerThan768 && isOpen ? "drawer-translate-y-8\/10" : "drawer-translate-y-0"}
     bottom={0}
     maxH={"500px"}
    >
      <Box  
        display={"flex"}
        justifyContent="center" 
        width={"100%"} 
        onClick={isOpen ? onClose : onOpen}
      >
          <Box
            display={["flex","flex","flex","none"]}
            justifyContent="center" 
            width={"20%"} 
            bg={"#1B1B1B"}
            borderTopRadius={20}
            p={1}
          >
            <Icon w={6} h={6} color="#ACACAC" as={isOpen ? BsChevronDoubleUp : BsChevronDoubleDown} />
          </Box>
         
      </Box>

     {/* Large Screen */}
      <Box
        display={["none","none","none","flex"]}
        bg={"#1B1B1B"}
        justifyContent="space-between"
        alignItems={"center"}
        p={5}
      >
   
         
         <FirstMenuSection 
         micOn={micOn}
         webcamOn={webcamOn}
         toggleMic={toggleMic}
         toggleWebcam={toggleWebcam}
         />
         

        
         <SecondMenuSection 
          screenShareOn={screenShareOn}
          isRecording={isRecording}
          toggleScreenShare={toggleScreenShare}
          handleStopRecording={handleStopRecording}
          handleStartRecording={handleStartRecording}
         />
         


       
         <ThirdMenuSection 
         decoded={decoded} 
         endMeeting={endMeeting} 
         leaveMeeting={leaveMeeting}
         />
         
      </Box>

     {/* Small Screen */}

     <SmallScreenMenu
      micOn={micOn}
      webcamOn={webcamOn}
      toggleMic={toggleMic}
      toggleWebcam={toggleWebcam}
      decoded={decoded}
      endMeeting={endMeeting}
      leaveMeeting={leaveMeeting}
      screenShareOn={screenShareOn}
      isRecording={isRecording}
      toggleScreenShare={toggleScreenShare}
      handleStopRecording={handleStopRecording}
      handleStartRecording={handleStartRecording}
     />
         
    </Box>
  )
}

export default BottomMenu


 