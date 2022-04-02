import React,{useState,useContext,createContext, useEffect} from 'react'

const vidoeCallContext = createContext()

export function VideoCallProvider({children}) {
    const videoCall = useProvideVideoCall()
    return <vidoeCallContext.Provider value={videoCall}>{children}</vidoeCallContext.Provider>
}

export const useVideoCall = () => {
    return useContext(vidoeCallContext)
}

const useProvideVideoCall = () =>{
    const [token, setToken] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);
    const [isMeetingStarted, setMeetingStarted] = useState(false);

    const chunk = (arr) => {
        const newArr = [];
        while (arr.length) newArr.push(arr.splice(0, 3));
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
        chunk,
        formatAMPM 

    }
}
