import React from 'react'
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    useConnection,
    usePubSub,
  } from "@videosdk.live/react-sdk";
  import { Text  } from '@chakra-ui/react'
import { useVideoCall } from '../../lib/callContext';
import ConnectionView from './ConnectionView'

const ConnectionsView = () => {
  const { connections, meetingId } = useMeeting();
  const {chunk} = useVideoCall()
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        // padding: borderRadius,
      }}
    >
      <Text  >Connections</Text>
      {chunk([...connections.keys()]).map((k) => (
        <div style={{ display: "flex" }} key={k}>
          {k.map((l) => (
            <ConnectionView key={`${meetingId}_${l}`} connectionId={l} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ConnectionsView