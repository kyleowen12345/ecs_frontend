import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useEffect, useRef, useState } from "react";
import ExternalVideo from "./ExternalVideo";
import ParticipantsView from "./ParticipantsView";
import ConnectionsView from "./ConnectionsView";
import MeetingChat from "./MeetingChat";


const MeetingView = ({ onNewMeetingIdToken, onMeetingLeave }) => {
  
        const [participantViewVisible, setParticipantViewVisible] = useState(true);
      
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
        function onEntryRequested(participantId, name) {
          console.log(" onEntryRequested", participantId, name);
        }
        function onEntryResponded(participantId, name) {
          console.log(" onEntryResponded", participantId, name);
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
      
        const tollbarHeight = 120;
      
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#D6E9FE",
            }}
          >
            <div style={{ height: tollbarHeight }}>
              <button className={"button red"} onClick={leave}>
                LEAVE
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
            </div>
            <h1>Meeting id is : {meetingId}</h1>
            <div style={{ display: "flex", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  flex: 1,
                  overflowY: "scroll",
                  height: `calc(100vh - ${tollbarHeight}px)`,
                }}
              >
                
                <ExternalVideo />
                {/* <ParticipantsView /> */}
                {participantViewVisible ? <ParticipantsView /> : <ConnectionsView />}
              </div>
              <MeetingChat tollbarHeight={tollbarHeight} />
            </div>
          </div>
       
  )
}

export default MeetingView