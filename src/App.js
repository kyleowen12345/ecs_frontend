import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider  } from "react-helmet-async";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MeetingConsumer,
} from "@videosdk.live/react-sdk";
import JoiningScreen from "./component/staging/JoiningScreen";
import  MeetingView from "./component/oncall/MeetingView"
import { useVideoCall } from "./lib/callContext";
import AppRoutes from "./routes";



function App() {
  // const { 
  //         token,
  //         setToken,
  //         meetingId,
  //         setMeetingId,
  //         participantName, 
  //         setParticipantName,
  //         micOn, 
  //         setMicOn,
  //         webcamOn, 
  //         setWebcamOn,
  //         isMeetingStarted, 
  //         setMeetingStarted
  //       } = useVideoCall()
  // console.log(isMeetingStarted)

  //  return isMeetingStarted ? (
  //   <MeetingProvider
  //     config={{
  //       meetingId,
  //       micEnabled: micOn,
  //       webcamEnabled: webcamOn,
  //       name: participantName ? participantName : "TestUser",
  //     }}
  //     token={token}
  //     reinitialiseMeetingOnConfigChange={true}
  //     joinWithoutUserInteraction={false}
  //   >
  //     <MeetingView
  //       onNewMeetingIdToken={({ meetingId, token }) => {
  //         setMeetingId(meetingId);
  //         setToken(token);
  //       }}
  //       onMeetingLeave={() => {
  //         setToken("");
  //         setMeetingId("");
  //         setWebcamOn(false);
  //         setMicOn(false);
  //         setMeetingStarted(false);
  //       }}
  //     />
  //   </MeetingProvider>
  //   // <p>Meeting Started</p>
  // ) : (
  //   <JoiningScreen/>
  // );
  return (
    <HelmetProvider>
      <AppRoutes/>
    </HelmetProvider>
) 
}

export default App;
