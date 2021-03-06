import React,{useState,useContext,createContext, useEffect} from 'react'
import { getToken,createMeeting,validateMeeting } from './api'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const vidoeCallContext = createContext()

export function VideoCallProvider({children}) {
    const videoCall = useProvideVideoCall()
    return <vidoeCallContext.Provider value={videoCall}>{children}</vidoeCallContext.Provider>
}

export const useVideoCall = () => {
    return useContext(vidoeCallContext)
}

const useProvideVideoCall = () =>{
    // const navigate = useNavigate()
    const [token, setToken] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);
    const [isMeetingStarted, setMeetingStarted] = useState(false);
    const [readyToJoin, setReadyToJoin] = useState(false);

    // Loaders
    const [createMeetingLoad,setCreateMeetingLoad] = useState(false)
    const [joinMeetingLoad,setJoinMeetingLoad] = useState(false)
    // const [createMeetingLoad,setCreateMeetingLoad] = useState(false)
    // const [createMeetingLoad,setCreateMeetingLoad] = useState(false)

    // Chat
    const [messageAlert,setMessageAlert] = useState(false)

    // User Entry Permission
    const [entryRequestLoading,setEntryRequestLoading] = useState(false)
  

    //  To view paticipant conditional
    const [participantViewVisible, setParticipantViewVisible] = useState(true);
     
    // Request for non-host
    const [entryRequest,setEntryRequest] = useState(false)
    
    // Request participant status
    const [participantRequestAccepted, setParticipantRequestAccepted] = useState(false)

    const myCookie = Cookies.get('validation')

    const chunk = (arr) => {
        const newArr = [];
        while (arr.length) newArr.push(arr.splice(0, 1));
        return newArr;
      };

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
      }

      
     
    useEffect(() => {
       if(myCookie){
        return setToken(myCookie)
       } 
    }, [myCookie])


      


    return {
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
        readyToJoin,
        setReadyToJoin,
        createMeetingLoad,
        setCreateMeetingLoad,
        joinMeetingLoad,
        setJoinMeetingLoad,
        messageAlert,
        setMessageAlert,
        entryRequestLoading,
        setEntryRequestLoading,
        entryRequest,
        setEntryRequest,
        participantViewVisible,
        setParticipantViewVisible,
        participantRequestAccepted,
        setParticipantRequestAccepted,
        chunk,
        formatAMPM, 
        myCookie
        
    }
}
