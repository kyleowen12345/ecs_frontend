import React, { useEffect, useRef, useState } from "react";
import { useNavigate   } from "react-router-dom";
import {InputGroup, Input, InputLeftAddon, InputRightAddon,  Box, Button,Grid, GridItem, Text,Tooltip,Image,Icon,VStack   } from '@chakra-ui/react'
import { createMeeting, getToken, validateMeeting } from "../../lib/api";
import MeetingDetailsScreen from "./MeetingDetailsScreen";
import { useVideoCall } from "../../lib/callContext";
import Cookies from 'js-cookie'
import { BsFillMicFill,BsFillMicMuteFill,BsCameraVideoFill,BsCameraVideoOffFill } from 'react-icons/bs';
import {IoMdArrowRoundBack} from 'react-icons/io'
import nocam from '../../assets/images/nocam.png'



const JoiningScreen = ({ onClickStartMeeting}) => {
  const navigate = useNavigate();
  const {
          token,
          meetingId,
          participantName, 
          setParticipantName,
          micOn, 
          setMicOn,
          webcamOn, 
          setWebcamOn, 
          setMeetingStarted,
          readyToJoin,
        } = useVideoCall()
  const videoPlayerRef = useRef();
  const [videoTrack, setVideoTrack] = useState(null);

//   Toggle Mic
  const _handleToggleMic = () => {
    setMicOn(!micOn);
  };

//   Toggle Cam
  const _handleToggleWebcam = () => {
    if (!webcamOn) {
      getVideo();
    } else {
      if (videoTrack) {
        console.log(videoTrack)
        videoTrack.stop();
       
        setVideoTrack(null);
      }
    }
    setWebcamOn(!webcamOn);
  };

// User Video
const getVideo = async () => {
    if (videoPlayerRef.current) {
      const videoConstraints = {
        video: {
          width: 1280,
          height: 720,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );
      const videoTracks = stream.getVideoTracks();

      const videoTrack = videoTracks.length ? videoTracks[0] : null;

      videoPlayerRef.current.srcObject = new MediaStream([videoTrack]);
      videoPlayerRef.current.play();


      setVideoTrack(videoTrack);

    }
};



useEffect(() => {
  if (webcamOn && !videoTrack) {
    getVideo();
  }
}, [webcamOn,videoTrack]);

// submit Participant name
const submitParticipantName = (name) => {
   setParticipantName(name)
   Cookies.set('perps',name)
}

console.log(token)
   
  return (
     <VStack
      maxW={"100%"}
      spacing={10}
      padding={5}
     >
        
         {/* back button */}
            <Box
              width={"100%"}
              
            >
              <Button
                  backgroundColor={"black"}
                  _hover={{backgroundColor:"black"}}
                  padding={0}
                  onClick={() => {
                  navigate('/');
                  _handleToggleWebcam()
                  
                  }}>
                  <Icon as={IoMdArrowRoundBack} h={8} w={8} color={"brand.100"}/>
              </Button>
            </Box>
        
          
              {/* Video box */}
            <Box 
             width={"100%"}
             maxW={"1000px"}
             position="relative"
             display={"flex"}
             justifyContent="center"
             alignItems={"center"}
            >

                <Box 
                  width={"100%"}
                  height="500px"
                  borderRadius={"20px"}
                >
                      {
                      !webcamOn ?
                        <Box
                          height={"100%"}
                          display="flex"
                          justifyContent={"center"}
                          alignItems="center"
                        >
                            <Image 
                              objectFit={"contain"} 
                              src={nocam}
                            />
                        </Box> 
                          :
                        <video
                          autoPlay
                          playsInline
                          muted
                          ref={videoPlayerRef}
                          controls={false}
                          style={{
                            height:"100%",
                            width:"100%",
                            borderRadius:"10px",
                            objectFit:"cover"
                            
                          }}
                        />

                      }
              
                <Box
                  bottom= "16px"
                  position= "absolute"
                  display={"flex"}
                  justifyContent="center"
                  width={"100%"}
                  >
                    <Box
                      width={"130px"}
                      display={"flex"}
                      justifyContent="space-between"

                    >
                        <Box
                          maxW={"100px"}
                        >
                          <Tooltip
                            label={micOn ? "Turn off mic" : "Turn on mic"}
                            placement="top">
                            <Button
                              onClick={_handleToggleMic}
                              backgroundColor={"white"}
                              borderRadius="full"
                              _hover={{
                                backgroundColor:"brand.100"
                              }}
                              >
                              {micOn ? <Icon w={6} h={6}  as={BsFillMicMuteFill} /> : <Icon w={6} h={6} as={BsFillMicFill}/> }
                            </Button>
                          </Tooltip>
                        </Box>

                        <Box
                        maxW={"100px"}
                        >
                          <Tooltip
                            label={webcamOn ? "Turn off camera" : "Turn on camera"}
                            placement="top">
                            <Button
                              onClick={_handleToggleWebcam}
                              backgroundColor={"white"}
                              borderRadius="full"
                              _hover={{
                                backgroundColor:"brand.100"
                              }}
                              >
                              {webcamOn ? <Icon w={6} h={6} as={BsCameraVideoOffFill}/> : <Icon w={6} h={6} as={BsCameraVideoFill}/>}
                            </Button>
                          </Tooltip>
                        </Box>
                    </Box>
                    
                </Box>

                </Box>
            </Box>


            <InputGroup 
              maxW={"1000px"}
            >
                <InputLeftAddon 
                  children='Username'  
                  bg={"brand.100"}
                  color="white"
                  _hover={{color:"brand.100", bg:"white"}}
                />
                <Input placeholder='Enter your name here...' onChange={(e) => {submitParticipantName(e.target.value)}}/>
                <InputRightAddon 
                  bg={"brand.100"}
                  color="white"
                  _hover={{bg:"brand.100", color:"white"}} 
                  children={<Button
                        disabled={participantName.length < 3}
                        bg={"brand.100"}
                        color="white"
                        borderY={"1px solid white"}
                        borderRadius={0}
                        _active={{bg:"brand.100", color:"white"}}
                        _hover={{bg:"brand.100", color:"white"}}
                        onClick={(e) => {
                          if (videoTrack) {
                            videoTrack.stop();
                            setVideoTrack(null);
                          }
                          setMeetingStarted(true)
                          navigate(`/meeting/${meetingId}`)
                        }}
                        id={"btnJoin"}>
                      Start
                    </Button>} 
                />
            </InputGroup>
            
          

     </VStack>

  )

}

export default JoiningScreen