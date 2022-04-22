import React from 'react'
import {  Box  } from '@chakra-ui/react'
import { BsFillMicFill,BsFillMicMuteFill,BsCameraVideoFill,BsCameraVideoOffFill} from 'react-icons/bs';
import MenuIcons from '../MenuIcons';

const FirstMenuSection = ({micOn,webcamOn,toggleMic,toggleWebcam}) => {
  return (
    <Box
        width={["30%","120px","120px","14%","12%","8%"]}
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        marginRight={[0,0,0,20]}
    >  
     <MenuIcons  icon={micOn ? BsFillMicFill : BsFillMicMuteFill} label={micOn ? "Mute" : "Unmute"} method={toggleMic} />

     <MenuIcons  icon={webcamOn ? BsCameraVideoFill : BsCameraVideoOffFill} label={webcamOn ?  "Stop Video" : "Start Video"} method={toggleWebcam}/> 
    </Box>
  )
}

export default FirstMenuSection