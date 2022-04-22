import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Checkbox,
  

  } from '@chakra-ui/react'
  import MenuIcons from '../menu/MenuIcons';
import {MdHighQuality} from 'react-icons/md' 
import { useMeeting,useParticipant } from "@videosdk.live/react-sdk"; 

const VideoQuality = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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

    startVideo,
    stopVideo,
    resumeVideo,
    pauseVideo,
    seekVideo,
    startLivestream,
    stopLivestream,
  } = useMeeting({
  });
  const videoQualityList = ['low','med','high']

  return (
    <>
      <MenuIcons  icon={MdHighQuality} label={"Video Quality"} method={onOpen}   />
     <Modal size="sm" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Video Quality </ModalHeader>
            <ModalCloseButton />
            <ModalBody  >
              {
                videoQualityList.map(i=>(
                  <Box 
                   key={i}
                   width={'100%'}
                   display="flex"
                   justifyContent={"space-between"}
                   alignItems="center"
                   borderBottom={"1px solid #E2E8F0"}
                   marginY="10px"
                  >
                     <Text fontSize={"18px"} >{i}</Text>
                     <Checkbox defaultChecked={localParticipant?.quality === i}></Checkbox>
                  </Box>
                ))
              }
               
            </ModalBody>
            </ModalContent>
     </Modal>
   
 
    </>
  )
}

export default VideoQuality