import React, { useEffect, useRef, useState } from "react";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    useConnection,
    usePubSub,
  } from "@videosdk.live/react-sdk";
import { getToken } from "../../lib/api";
import { Grid,Box,Icon, Text,Image } from '@chakra-ui/react'
import {GoPrimitiveDot} from 'react-icons/go'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import nocam from '../../assets/images/nocam.png'
import { BsFillMicFill,BsFillMicMuteFill,BsCameraVideoFill,BsCameraVideoOffFill} from 'react-icons/bs';

const ParticipantView = ({ participantId }) => {
    const webcamRef = useRef(null);
    const micRef = useRef(null);
    const screenShareRef = useRef(null);
    const decoded = jwt_decode(Cookies.get('validation'))
    console.log(participantId)
    const onStreamEnabled = (stream) => {
      console.log('onStreamEnabled',stream)
    };
    const onStreamDisabled = (stream) => {
      console.log('onStreamDisabled',stream)
    };

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
        onStreamEnabled,
        onStreamDisabled,
      });

      useEffect(() => {
        if (webcamRef.current) {
          if (webcamOn) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
    
            webcamRef.current.srcObject = mediaStream;
            webcamRef.current
              .play()
              .catch((error) =>
                console.error("videoElem.current.play() failed", error)
              );
          } else {
            webcamRef.current.srcObject = null;
          }
        }
      }, [webcamStream, webcamOn]);
    
      useEffect(() => {
        if (micRef.current) {
          if (micOn) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(micStream.track);
    
            micRef.current.srcObject = mediaStream;
            micRef.current
              .play()
              .catch((error) =>
                console.error("videoElem.current.play() failed", error)
              );
          } else {
            micRef.current.srcObject = null;
          }
        }
      }, [micStream, micOn]);
    
      useEffect(() => {
        if (screenShareRef.current) {
          if (screenShareOn) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
    
            screenShareRef.current.srcObject = mediaStream;
            screenShareRef.current
              .play()
              .catch((error) =>
                console.error("videoElem.current.play() failed", error)
              );
          } else {
            screenShareRef.current.srcObject = null;
          }
        }
      }, [screenShareStream, screenShareOn]);
  return (
    <Box
     bg={"brand.100"}
     borderRadius={8}
     overflow="hidden"
     margin={1}
     padding={1}
     display={"flex"}
     flex={1}
     flexDirection={"column"}
     position="relative"
     maxW={"450px"}
    //  border={"1px solid"}
    //  borderColor={"brand.100"}
    >
      <audio ref={micRef} autoPlay muted={isLocal} />

      <Box
        position={"relative"}
        borderRadius={8}
        overflow="hidden"
        width={"100%"}
        h={"300px"}
      >
        <Box
           height={"100%"}
           width={"100%"}
           position={"absolute"}
           top={0}
           left={0}
           right={0}
           bottom={0}
          // style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
         { webcamOn ?
          <video
            height={"100%"}
            width={"100%"}
            ref={screenShareOn ? screenShareRef : webcamRef}
            style={{
              backgroundColor: "black",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "contain",
              minHeight:"300px"
            }}
            autoPlay
          />
          :
          <Image 
            objectFit={"contain"} 
            src={nocam}
            height={"100%"}
            width={"100%"}
            bg="black"
          />}
          <Box
           position={"absolute"}
           top={2}
           right={2}
          >
            <Icon w={6} h={6} color={webcamOn ? "green" : "red"} as={GoPrimitiveDot} />
          </Box>
          
        
           <Box
            position={"absolute"}
            bottom={2}
            left={2}
            bg={"black"}
            p={1}
            borderRadius={8}
          >
            {/* <Icon w={5} h={5} color={"brand.100"} as={BsFillMicFill} />
            <Icon w={5} h={5} color={"brand.100"} as={BsCameraVideoFill} /> */}
            <Text
             fontSize={"12px"}
             maxW={"200px"}
             isTruncated
            >{displayName}</Text>
            {/* <button
              className="button blue"
              style={
                {
                  // height: 50,
                  // width: 200,
                }
              }
              onClick={async () => {
                console.log(participantId)
                disableMic()
              }}
            >
              disableMic
            </button>
            <button
              className="button blue"
              style={
                {
                  // height: 50,
                  // width: 200,
                }
              }
              onClick={() => 
                
                enableMic()
                
              }
            >
              enableMic
            </button> */}

          </Box>

        </Box>
      </Box>

      {/* <Box
        style={{
          marginTop: 8,
          position: "relative",
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "lightgreen",
          width: "100%",
          height: 300,
        }}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <video
            height={"100%"}
            width={"100%"}
            ref={screenShareRef}
            style={{
              backgroundColor: "black",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "contain",
            }}
            autoPlay
          />
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <p
              style={{
                color: screenShareOn ? "green" : "red",
                fontSize: 16,
                fontWeight: "bold",
                opacity: 1,
              }}
            >
              SCREEN SHARING
            </p>
          </div>
        </div>
      </Box> */}
      {/* <table>
        {[
          { k: "Name", v: displayName },
          { k: "webcamOn", v: webcamOn ? "YES" : "NO" },
          { k: "micOn", v: micOn ? "YES" : "NO" },
          { k: "screenShareOn", v: screenShareOn ? "YES" : "NO" },
          { k: "isLocal", v: isLocal ? "YES" : "NO" },
          { k: "isActiveSpeaker", v: isActiveSpeaker ? "YES" : "NO" },
          { k: "isMainParticipant", v: isMainParticipant ? "YES" : "NO" },
        ].map(({ k, v }) => (
          <tr key={k}>
            <td style={{ border: "1px solid #fff", padding: 4 }}>
              <h3 style={{ margin: 0, padding: 0, color: "#fff" }}>{k}</h3>
            </td>
            <td style={{ border: "1px solid #fff", padding: 4 }}>
              <h3 style={{ margin: 0, padding: 0, color: "#fff" }}>{v}</h3>
            </td>
          </tr>
        ))}
      </table> */}
    </Box>
  )
}

export default ParticipantView