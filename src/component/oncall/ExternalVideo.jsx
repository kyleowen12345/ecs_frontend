import { Text } from '@chakra-ui/react';
import { useMeeting } from '@videosdk.live/react-sdk';
import React,{useState,useRef} from 'react'

const ExternalVideo = () => {
    const [{ link, playing }, setVideoInfo] = useState({
        link: null,
        playing: false,
      });

      const onVideoStateChanged = (data) => {
        const { currentTime, link, status } = data;
    
        switch (status) {
          case "stopped":
            console.log("stopped in switch");
            externalPlayer.current.src = null;
            setVideoInfo({ link: null, playing: false });
            break;
          case "resumed":
            if (typeof currentTime === "number") {
              externalPlayer.current.currentTime = currentTime;
            }
            externalPlayer.current.play();
            setVideoInfo((s) => ({ ...s, playing: true }));
            break;
          case "paused":
            externalPlayer.current.pause();
            setVideoInfo((s) => ({ ...s, playing: false }));
            break;
          case "started":
            setVideoInfo({ link, playing: true });
            break;
          default:
            break;
        }
      };

      const onVideoSeeked = (data) => {
        const { currentTime } = data;
        if (typeof currentTime === "number") {
          externalPlayer.current.currentTime = currentTime;
        }
      }; 

      useMeeting({ onVideoStateChanged, onVideoSeeked });
      const externalPlayer = useRef();

  return !link ? null : (
    <div
      style={{
        padding: 8,
        margin: 8,
        backgroundColor: "#3E84F6",
        display: "flex",
      }}
    >
      <Text >Externam Video</Text>

      <video
        style={{  backgroundColor: "black" }}
        autoPlay
        ref={externalPlayer}
        src={link}
      />
    </div>
  );
}

export default ExternalVideo