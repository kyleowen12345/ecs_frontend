import React from 'react'
import {  Box,  } from '@chakra-ui/react'
import { BsUiChecksGrid,BsFillRecordCircleFill } from 'react-icons/bs';
import {MdScreenShare,MdStopScreenShare} from 'react-icons/md'
import MenuIcons from '../MenuIcons';
import {AiFillStop} from 'react-icons/ai'
import Participants from '../../modals/Participants';
import Messages from '../../modals/Messages';
import VideoQuality from '../../modals/VideoQuality';

const SecondMenuSection = ({screenShareOn,isRecording,toggleScreenShare,handleStopRecording,handleStartRecording}) => {
  return (
    <Box
           width={["30%","30%","60%","50%","30%","30%"]}
           display={["none","flex","none","flex","flex","flex"]}
           justifyContent="space-between"
           alignItems={"center"}
           minWidth="400px"
         >   
            <Participants/>
            
            <MenuIcons  icon={screenShareOn ? MdStopScreenShare : MdScreenShare  } label={screenShareOn ? "Stop Screen Share" :"Share Screen" } method={toggleScreenShare}/>
            
            <Messages/>
           
            <MenuIcons  icon={isRecording ? AiFillStop: BsFillRecordCircleFill} label={isRecording ? "Stop Recording":"Record"} method={isRecording?handleStopRecording: handleStartRecording}/>
           
            <VideoQuality/>

            <MenuIcons  icon={BsUiChecksGrid} label={"Layout" }/>
      </Box>
  )
}

export default SecondMenuSection