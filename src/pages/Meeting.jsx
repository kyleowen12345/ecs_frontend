import React from 'react'
import {
  MeetingProvider,
} from "@videosdk.live/react-sdk";
import {useParams} from "react-router-dom";
import { useVideoCall } from '../lib/callContext';
import MeetingView from '../component/oncall/MeetingView';
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

const Meeting = () => {
  const {meetingID} = useParams()
  const nameOfParticipant = Cookies.get('perps')
  
  const { 
            token,
            setToken,
            meetingId,
            setMeetingId,
            participantName, 
            micOn, 
            setMicOn,
            webcamOn, 
            setWebcamOn,
            setMeetingStarted,
          } = useVideoCall()


const decoded = jwt_decode(token ? token : Cookies.get('validation'));

  return (
    <MeetingProvider
        config={{
          meetingId:meetingId ? meetingId : meetingID,
          micEnabled: micOn,
          webcamEnabled: webcamOn,
          name: participantName ? participantName : nameOfParticipant,
        }}
        token={token ? token : Cookies.get('validation')}
        reinitialiseMeetingOnConfigChange={true}
        joinWithoutUserInteraction={decoded.permissions.includes('allow_join') ? true : false}
      >
        <MeetingView
          onNewMeetingIdToken={({ meetingId, token }) => {
            setMeetingId(meetingId);
            setToken(token);
          }}
          onMeetingLeave={() => {
            setToken("");
            setMeetingId("");
            setWebcamOn(false);
            setMicOn(false);
            setMeetingStarted(false);
          }}
        />
      </MeetingProvider>
  )
}

export default Meeting