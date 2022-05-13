import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useEffect, useRef, useState } from "react";
import {useParams,useNavigate,useLocation,useSearchParams } from "react-router-dom";
import ExternalVideo from "./ExternalVideo";
import ParticipantsView from "./ParticipantsView";
import ConnectionsView from "./ConnectionsView";
// import MeetingChat fro./modals/messagecomponents/MeetingChathat";
import { validateMeeting } from "../../lib/api";
import { useVideoCall } from "../../lib/callContext";
import BottomMenu from "./menu/BottomMenu";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import {  Box, Text,Icon,Badge, Button,useToast   } from '@chakra-ui/react'
import Pagination from "./Pagination";
import Navbar from "../header/Navbar";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import {
//   useParams,
//   useLocation,
//   useHistory,
//   useRouteMatch,
// } from "react-router-dom";


const MeetingView = ({ onNewMeetingIdToken, onMeetingLeave }) => {
        const {meetingID} = useParams()
        const toast = useToast()
        // const [searchParams, setSearchParams] = useSearchParams();
        let location = useLocation();
        const {
          token,
          entryRequestLoading,
          setEntryRequestLoading,
          entryRequest,
          setEntryRequest,
          participantViewVisible,
          setParticipantViewVisible,
          myCookie
        } = useVideoCall()
        const navigate = useNavigate();
        console.log(meetingID)
        // console.log(location.search)
       
       
      
        function onParticipantJoined(participant) {
          console.log(" onParticipantJoined", participant);
        }
        function onParticipantLeft(participant) {
          console.log(" onParticipantLeft", participant);
        }
        const onSpeakerChanged = (activeSpeakerId) => {
          console.log(" onSpeakerChanged", activeSpeakerId);
        };
        function onPresenterChanged(presenterId) {
          console.log(" onPresenterChanged", presenterId);
        }
        function onMainParticipantChanged(participant) {
          console.log(" onMainParticipantChanged", participant);
        }
        function onEntryRequested({participantId, name,allow,deny}) {
          
          // console.log(" onEntryRequested x", participantId);
          // console.log(name)
          setEntryRequest(participantId)
         const userperm= prompt(`do you want ${name} to join`,'yes')

          
         userperm == "yes" ? allow():deny()
        
        //  setEntryRequestLoading(false)
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
        function onMeetingJoined() {
          console.log("onMeetingJoined");
        }
        function onMeetingLeft() {
          console.log("onMeetingLeft");
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
        };
        const onMicRequested = (data) => {
          console.log("onMicRequested", data);
          const {accept} = data
          accept()
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
        console.log(entryRequest)
        function onEntryResponded(participantId, name) {
          console.log(" onEntryResponded", participantId, name);
          console.log(participants)
          if(name === "denied") return alert(`Request rejected`)
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
        const tollbarHeight = 120;
        console.log(participants.size === 0 )
        return (
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"center"}
            color="white"
          >
            {/* <div style={{ height: tollbarHeight }}>
              
              <button className={"button red"} onClick={getOut}>
                LEAVE
              </button>
              <button className={"button blue"} onClick={handleJoinConference}>
                join
              </button>
              <button className={"button blue"} onClick={()=>end()}>
                end
              </button>
              <button className={"button blue"} onClick={()=>muteMic()}>
                Mute mic
              </button>
              <button className={"button blue"} onClick={toggleMic}>
                toggleMic
              </button>
              <button className={"button blue"} onClick={toggleWebcam}>
                toggleWebcam
              </button>
              <button className={"button blue"} onClick={toggleScreenShare}>
                toggleScreenShare
              </button>
              <button className={"button blue"} onClick={handlestartVideo}>
                startVideo
              </button>
              <button className={"button blue"} onClick={handlestopVideo}>
                stopVideo
              </button>
              <button className={"button blue"} onClick={handleresumeVideo}>
                resumeVideo
              </button>
              <button className={"button blue"} onClick={handlepauseVideo}>
                pauseVideo
              </button>
              <button className={"button blue"} onClick={handlesseekVideo}>
                seekVideo
              </button>
              <button className={"button blue"} onClick={handleStartLiveStream}>
                Start Live Stream
              </button>
              <button className={"button blue"} onClick={handleStopLiveStream}>
                Stop Live Stream
              </button>
              <button className={"button blue"} onClick={handleStartRecording}>
                start recording
              </button>
              <button className={"button blue"} onClick={handleStopRecording}>
                stop recording
              </button>
              <button
                className={"button blue"}
                onClick={() => setParticipantViewVisible((s) => !s)}
              >
                Switch to {participantViewVisible ? "Connections" : "Participants"}{" "}
                view
              </button>
      
              <button
                className={"button blue"}
                onClick={async () => {
                  const meetingId = prompt(
                    `Please enter meeting id where you want Connect`
                  );
                  if (meetingId) {
                    try {
                      await connectTo({
                        meetingId,
                        payload: "This is Testing Payload",
                      });
                    } catch (e) {
                      console.log("Connect to Error", e);
                    }
                  } else {
                    alert("Empty meetingId!");
                  }
                }}
              >
                Make Connections
              </button>
            </div> */}
            
            {/* <Text>Meeting id is : {meetingId || meetingID}</Text> */}
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
                position:"top"
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
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      position={"relative"}
                      flex={1}
                      pl={2}
                      overflowY="scroll"
                      // height={120}
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
                      {/* <ConnectionsView /> */}
                      {/* <ParticipantsView /> */}
                      {participantViewVisible ? <ParticipantsView /> : <ConnectionsView />}
                      {/* <Pagination marginPages={1} pageRange={2} initialPage={0} pageCount={Math.ceil(participants.size / 4)}/>    */}
                    </Box>
              {/* <MeetingChat tollbarHeight={tollbarHeight} /> */}
              
              
            </Box>
            { participants.size === 0 && !decoded?.permissions.includes('allow_join') && 
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
            }
           {participants.size > 0 && <BottomMenu />}
          </Box>
       
  )
}

export default MeetingView 
