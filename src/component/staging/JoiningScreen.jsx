import React, { useEffect, useRef, useState } from "react";
import {InputGroup, Input, InputLeftAddon, InputRightAddon,  Box, Button,Grid, GridItem, Text,Tooltip   } from '@chakra-ui/react'
import { createMeeting, getToken, validateMeeting } from "../../lib/api";
import MeetingDetailsScreen from "./MeetingDetailsScreen";
import { useVideoCall } from "../../lib/callContext";


const JoiningScreen = ({ 
    onClickStartMeeting,
}) => {
  const {
          token,
          setToken,
          meetingId,
          setMeetingId,
          participantName, 
          setParticipantName,
          micOn, 
          setMicOn,
          webcamOn, 
          setWebcamOn,
          isMeetingStarted, 
          setMeetingStarted
        } = useVideoCall()
  const [readyToJoin, setReadyToJoin] = useState(false);
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

// onClickJoin
const onClickJoin = async (id) => {
  console.log('onClickJoin')
  const token = await getToken();
  const valid = await validateMeeting({ meetingId: id, token });
  if (valid) {
    setReadyToJoin(true);
    setToken(token);
    setMeetingId(id);
    setWebcamOn(true);
    setMicOn(true);
  } else alert("Invalid Meeting Id");
}

// onClickCreateMeeting
const onClickCreateMeeting = async () => {
  console.log('onClickCreateMeeting')
  const token = await getToken();
  const _meetingId = await createMeeting({token,region:"sg001"});
  setToken(token);
  setMeetingId(_meetingId);
  setReadyToJoin(true);
  setWebcamOn(true);
  setMicOn(true);
  console.log(_meetingId)
}

useEffect(() => {
  if (webcamOn && !videoTrack) {
    getVideo();
  }
}, [webcamOn,videoTrack]);


   
  return (
     <Box>
        {readyToJoin && 
            <Box>
              <Button
                  onClick={() => {
                  setReadyToJoin(false);
                  videoPlayerRef.current.pause()
                  }}>
                  back
              </Button>
            </Box>
        }
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {readyToJoin ? (
          <Box
            m={6}
            style={{
              display: "flex",
              flex: 1,
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // padding: padding,
            }}
            >
            <Box >
              <video
                autoPlay
                playsInline
                muted
                ref={videoPlayerRef}
                controls={false}
                // className={styles.video + " flip"}
              />

              {!webcamOn && 
                <Box
                  position="absolute"
                  style={{
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    right: 0,
                    left: 0,
                  }}
                  >
                  <Text>Camera is Turned Off</Text>
                </Box>
               }

              <Box
                position="absolute"
                // bottom={theme.spacing(2)}
                left="0"
                right="0">
                <Grid
                  alignItems="center"
                  justify="center"
                  spacing={2}>

                  <GridItem>
                    <Tooltip
                      label={micOn ? "Turn off mic" : "Turn on mic"}
                      placement="top">
                      <Button
                        onClick={() => _handleToggleMic()}
                        variant="contained"
                        style={
                          micOn
                            ? {}
                            : {
                                backgroundColor: "red",
                                color: "white",
                              }
                        }
                        >
                        {micOn ? <Text>On</Text> : <Text>Off</Text> }
                      </Button>
                    </Tooltip>
                  </GridItem>

                  <GridItem>
                    <Tooltip
                      label={webcamOn ? "Turn off camera" : "Turn on camera"}
                      placement="top">
                      <Button
                        onClick={() => _handleToggleWebcam()}
                        variant="contained"
                        style={
                          webcamOn
                            ? {}
                            : {
                                backgroundColor: "red",
                                color: "white",
                              }
                        }
                        >
                        {webcamOn ? <Text>CamOn</Text> : <Text>CamOff</Text>}
                      </Button>
                    </Tooltip>
                  </GridItem>

                </Grid>

              </Box>
            </Box>
            <InputGroup >
                <InputLeftAddon children='Name'  />
                <Input placeholder='mysite' onChange={(e) => {setParticipantName(e.target.value);}}/>
                <InputRightAddon 
                children={<Button
                      disabled={participantName.length < 3}
                      color="primary"
                      variant="contained"
                      onClick={(e) => {
                        if (videoTrack) {
                          videoTrack.stop();
                          setVideoTrack(null);
                        }
                        setMeetingStarted(true)
                      }}
                      id={"btnJoin"}>
                      Start
                    </Button>} 
                />
            </InputGroup>
            
          </Box>
        ) : (
          <MeetingDetailsScreen
            onClickJoin={onClickJoin}
            onClickCreateMeeting={onClickCreateMeeting}
          />
        )}
        </Grid>
     </Box>

  )

}

export default JoiningScreen