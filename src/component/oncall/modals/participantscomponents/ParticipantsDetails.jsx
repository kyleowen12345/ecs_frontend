import React from 'react'
import { useMeeting,useParticipant } from "@videosdk.live/react-sdk";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const ParticipantsDetails = ({participantId}) => {
    const {
        displayName,
        participant,
        webcamStream,
        micStream,
        screenShareStream,
        webcamOn,
        micOn,
        screenShareOn,
        isLocal,
        isActiveSpeaker,
        isMainParticipant,
        switchTo,
        pinState,
        setQuality,
        enableMic,
        disableMic,
        enableWebcam,
        disableWebcam,
        pin,
        unpin,
      } = useParticipant(participantId, {
       
      });
  return (
    
     <>
        <Td >{isLocal ? "YES" : "NO"}</Td>
        <Td>{displayName}</Td>
        <Td >{micOn ? "ON" : "OFF"}</Td>
        <Td>{webcamOn ? "ON" : "OFF"}</Td>
        <Td >{screenShareOn ? "ON" : "OFF"}</Td>
        <Td>{isActiveSpeaker ? "YES" : "NO"}</Td>
        <Td >{isMainParticipant ? "YES" : "NO"}</Td>
     </>
 
   
  
  )
}

export default ParticipantsDetails

