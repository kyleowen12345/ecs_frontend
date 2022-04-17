import React from 'react'
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MeetingConsumer,
} from "@videosdk.live/react-sdk";
import {useParams} from "react-router-dom";
import { useNavigate   } from "react-router-dom";
import { useVideoCall } from '../lib/callContext';
import MeetingView from '../component/oncall/MeetingView';
import { validateMeeting } from '../lib/api';
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

const Meeting = () => {
  const navigate = useNavigate();
  const {meetingID} = useParams()
  const nameOfParticipant = Cookies.get('perps')
  
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
            setMeetingStarted,
            setReadyToJoin
          } = useVideoCall()

  // validateParticipant
 const onClickValidate= async (id) => {
  try {
      const valid = await validateMeeting({ meetingId: id, token:token });
      if (valid) {
        setReadyToJoin(true);
        setToken(token);
        setMeetingId(id);
        setWebcamOn(true);
        setMicOn(true);
        navigate(`/meeting/${id}`)
      } else {
          alert("Invalid Meeting Id");
          navigate(`/`)
      }
    } catch (error) {
       console.log(error)
       navigate(`/`)
    }
    
  
}
const decoded = jwt_decode(token ? token : Cookies.get('validation'));
console.log(decoded.permissions.includes('allow_join'))
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