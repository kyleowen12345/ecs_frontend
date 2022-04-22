import React from 'react'
import { Grid,Box } from '@chakra-ui/react'
import { BsUiChecksGrid,BsFillRecordCircleFill } from 'react-icons/bs';
import {MdScreenShare,MdStopScreenShare} from 'react-icons/md'
import {AiFillStop,} from 'react-icons/ai'
import Participants from '../../modals/Participants';
import Messages from '../../modals/Messages';
import VideoQuality from '../../modals/VideoQuality';
import FirstMenuSection from './FirstMenuSection';
import ThirdMenuSection from './ThirdMenuSection';
import MenuIcons from '../MenuIcons';

const SmallScreenMenu = ({
    micOn,
    webcamOn,
    toggleMic,
    toggleWebcam,
    decoded,
    endMeeting,
    leaveMeeting,
    screenShareOn,
    isRecording,
    toggleScreenShare,
    handleStopRecording,
    handleStartRecording
}) => {
  return (
    <Box
       bg={"#1B1B1B"}
       p={5}
       pt={[5,3,3]}
       height={["300px","250px","250px"]}
       display={["block","block","block","none"]}
     >
        <Box 
         display={"flex"}
         justifyContent="space-between"
         alignItems={"center"}
        >
            <FirstMenuSection 
            micOn={micOn}
            webcamOn={webcamOn}
            toggleMic={toggleMic}
            toggleWebcam={toggleWebcam}
            />

              <ThirdMenuSection 
            decoded={decoded} 
            endMeeting={endMeeting} 
            leaveMeeting={leaveMeeting}
            />
        </Box>
        
        <Grid
           mt={10}
           templateColumns={['repeat(2, 1fr)','repeat(3, 1fr)' ,'repeat(3, 1fr)'  ]}gap={6}
         >   
            
            <Participants/>
            
            <MenuIcons  icon={screenShareOn ? MdStopScreenShare : MdScreenShare  } label={screenShareOn ? "Stop Screen Share" :"Share Screen" } method={toggleScreenShare}/>
            
            
            <Messages/>
           
            <MenuIcons  icon={isRecording ? AiFillStop: BsFillRecordCircleFill} label={isRecording ? "Stop Recording":"Record"} method={isRecording?handleStopRecording: handleStartRecording}/>
           
            <VideoQuality/>

            <MenuIcons  icon={BsUiChecksGrid} label={"View" }/>
      </Grid>
     </Box>
  )
}

export default SmallScreenMenu