import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import {useParams,useNavigate,useLocation, } from "react-router-dom";
import ExternalVideo from "./ExternalVideo";
import ParticipantsView from "./ParticipantsView";
import ConnectionsView from "./ConnectionsView";
import { validateMeeting } from "../../lib/api";
import { useVideoCall } from "../../lib/callContext";
import BottomMenu from "./menu/BottomMenu";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import {  Box, Button,useToast,Text  } from '@chakra-ui/react'
import Navbar from "../header/Navbar";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import RequestEntryDialog from "./RequestEntryDialog";
import Askjoin from "./modals/Askjoin";
import RequestJoin from "./RequestJoin";


const MeetingView = ({ onNewMeetingIdToken, onMeetingLeave }) => {
        const {meetingID} = useParams()
        const toast = useToast()
       
        const {
          token,
          entryRequestLoading,
          setEntryRequestLoading,
          entryRequest,
          setEntryRequest,
          participantViewVisible,
          setParticipantViewVisible,
          myCookie,
          participantRequestAccepted,
          setParticipantRequestAccepted,
        } = useVideoCall()
        const navigate = useNavigate();
     
     
       
       
      
        function onParticipantJoined(participant) {
          toast({
           
            status: 'info',
            isClosable: true,
            position:"top-right",
            description:`${participant?.displayName} - joined the meeting`
          })
        }
        function onParticipantLeft(participant) {
          toast({
            status: 'info',
            isClosable: true,
            position:"top-right",
            description:`${participant?.displayName} - left the meeting`
          })
        }
        const onSpeakerChanged = (activeSpeakerId) => {
          console.log(" onSpeakerChanged", activeSpeakerId);
        };
        function onPresenterChanged(presenterId) {
          console.log(" onPresenterChanged", presenterId);
          // presenterId ? 
          // toast({
          //   status: 'info',
          //   isClosable: true,
          //   position:"top-right",
          //   description:`is presenting`
          // })
          // :
          // toast({
          //   status: 'info',
          //   isClosable: true,
          //   position:"top-right",
          //   description:`stopped presenting `
          // })
        }
        function onMainParticipantChanged(participant) {
          console.log(" onMainParticipantChanged", participant);
          // toast({
          //   status: 'info',
          //   isClosable: true,
          //   position:"top-right",
          //   description:`${participant.displayName} `
          // })
        }
       
        
        function onEntryRequested({participantId, name,allow,deny}) {
          
         const userperm= window.confirm(`do you want ${name} to join`)

         if(userperm === true){
          setEntryRequest(false)
          allow()

        
         console.log('wutanga')
        }else{
          setEntryRequest(false)
          deny()
          
        }
      }
        
        function onRecordingStarted() {
          console.log(" onRecordingStarted");
        }
        function onRecordingStopped() {
          console.log(" onRecordingStopped");
        }
        function onChatMessage(data) {
          console.log(" onChatMessage", data);
        }
        function onMeetingJoined({}) {
          toast({
           
            status: 'info',
            isClosable: true,
            position:"top-right",
            description:`Joined the meeting successfully`
          })
        }
        function onMeetingLeft() {
          console.log("onMeetingLeft");
          navigate('/')
          onMeetingLeave();
        }
        const onLiveStreamStarted = (data) => {
          console.log("onLiveStreamStarted example", data);
        };
        const onLiveStreamStopped = (data) => {
          console.log("onLiveStreamStopped example", data);
        };
      
        const onVideoStateChanged = (data) => {
          console.log("onVideoStateChanged", data);
        };
        const onVideoSeeked = (data) => {
          console.log("onVideoSeeked", data);
        };
      
        const onWebcamRequested = (data) => {
          console.log("onWebcamRequested", data);
          const {accept} = data
          accept()
        };
        const onMicRequested = (data) => {
          console.log("onMicRequested", data);
          // const {accept} = data
          // accept()
        };
        const onPinStateChanged = (data) => {
          console.log("onPinStateChanged", data);
        };
        const onSwitchMeeting = (data) => {
          window.focus();
          alert({
            title: "Confirm to submit",
            message: "Are you sure you want to switch Meeting ?",
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                  onNewMeetingIdToken(data);
                },
              },
              {
                label: "No",
                onClick: () => {},
              },
            ],
          });
        };
      
        const onConnectionOpen = (data) => {
          console.log("onConnectionOpen", data);
        };
    
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
          onParticipantJoined,
          onParticipantLeft,
          onSpeakerChanged,
          onPresenterChanged,
          onMainParticipantChanged,
          onEntryRequested,
          onEntryResponded,
          onRecordingStarted,
          onRecordingStopped,
          onChatMessage,
          onMeetingJoined,
          onMeetingLeft,
          onLiveStreamStarted,
          onLiveStreamStopped,
          onVideoStateChanged,
          onVideoSeeked,
          onWebcamRequested,
          onMicRequested,
          onPinStateChanged,
          onSwitchMeeting,
          onConnectionOpen,
        });
        console.log(mainParticipant)
        function onEntryResponded(participantId, name) {
      
          name === "denied" ?
          toast({
           
            status: 'error',
            isClosable: true,
            position:"top-right",
            description:"Request denied"
          })
            :
            toast({
           
              status:'success',
              isClosable: true,
              position:"top-right",
              description:`Request accepted`
            }) 
         
        }
        const handlestartVideo = () => {
          console.log("handlestartVideo");
      
          startVideo({
            link: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
          });
        };
        const handlestopVideo = () => {
          stopVideo();
        };
        const handleresumeVideo = () => {
          resumeVideo();
        };
        const handlepauseVideo = () => {
          pauseVideo({ currentTime: 2 });
        };
        const handlesseekVideo = () => {
          seekVideo({ currentTime: 5 });
        };
        const handleStartLiveStream = () => {
          startLivestream([
            {
              url: "rtmp://a.rtmp.youtube.com/live2",
              streamKey: "key",
            },
          ]);
        };
        const handleStopLiveStream = () => {
          stopLivestream();
        };
        const handleStartRecording = () => {
          meeting?.startRecording()
          startRecording();
        };
        const handleStopRecording = () => {
          meeting?.startRecording()
          stopRecording();
        };

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

        const getOut = async() => {
          try {
            leave()
            navigate('/')
          } catch (error) {
            console.log(error)
          }
         
        }
        const decoded = jwt_decode(token ? token : Cookies.get('validation'))

        // useEffect(()=>{
        //      if(!decoded?.permissions.includes('allow_join')){
        //        return setEntryRequest(true)
        //      }
        // })
        return (
          <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          color="white"
        >
          <Navbar/>
          {decoded?.permissions.includes('allow_join') && 
          <CopyToClipboard text={meetingId || meetingID}
          onCopy={()=> {
            toast({
              title: 'Meeting Id copied.',
              description: "You can share that meeting ID",
              status: 'success',
              duration: 3000,
              isClosable: true,
              position:"top-right",
            })
          }}
        >
        <Button 
           maxW={"150px"} 
           bg={"brand.100"} 
           ml={5}
           _hover={{
             bg:"brand.100"
           }}>Copy Meeting ID</Button>
      </CopyToClipboard>}
         
              <Box 
               display={"flex"}
               flex={1}
              >

            {
                  participants.size === 0 && !decoded?.permissions.includes('allow_join')  ?
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
            :
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  position={"relative"}
                  flex={1}
                  pl={2}
                  overflowY="scroll"
                  mb={20}
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: "gray",
                      borderRadius: '24px',
                    },
                  }}
                >
            
                  <ExternalVideo />
                  {participantViewVisible ? <ParticipantsView /> : <ConnectionsView />}
                </Box>
            }
                  
      
            
            
          </Box>
         {participants.size > 0 && <BottomMenu />}
        </Box>
       
  )
}

export default MeetingView 
