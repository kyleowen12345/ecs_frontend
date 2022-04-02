import React, { useEffect, useRef, useState } from "react";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    useConnection,
    usePubSub,
  } from "@videosdk.live/react-sdk";
import { getToken } from "../../lib/api";

const ParticipantView = ({ participantId }) => {
    const webcamRef = useRef(null);
    const micRef = useRef(null);
    const screenShareRef = useRef(null);
  
    const onStreamEnabled = (stream) => {};
    const onStreamDisabled = (stream) => {};

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
    <div
      style={{
        backgroundColor: "#3E84F6",
        borderRadius: 8,
        overflow: "hidden",
        margin: 8,
        padding: 8,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <audio ref={micRef} autoPlay muted={isLocal} />

      <div
        style={{
          position: "relative",
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "pink",
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
            ref={webcamRef}
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
                color: webcamOn ? "green" : "red",
                fontSize: 16,
                fontWeight: "bold",
                opacity: 1,
              }}
            >
              WEB CAM
            </p>
          </div>

          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
            }}
          >
            <button
              className="button blue"
              style={
                {
                  // height: 50,
                  // width: 200,
                }
              }
              onClick={async () => {
                const meetingId = prompt(
                  `Please enter meeting id where you want to switch ${displayName}`
                );
                const token = await getToken();
                if (meetingId && token) {
                  try {
                    await switchTo({
                      meetingId,
                      payload: "Im Switching",
                      token: token,
                    });
                  } catch (e) {
                    console.log("swithc To Error", e);
                  }
                } else {
                  alert("Empty meetingId!");
                }
              }}
            >
              Switch Participant
            </button>
          </div>
        </div>
      </div>

      <div
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
      </div>
      <table>
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
      </table>
    </div>
  )
}

export default ParticipantView