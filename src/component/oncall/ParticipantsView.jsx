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
import ParticipantView from './ParticipantView'

const ParticipantsView = () => {
  const { participants } = useMeeting();
  const {chunk} = useVideoCall()
  console.log(participants)
  return (
    <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      padding: 8,
    }}
  >
    <Text>Participants</Text>
    {chunk([...participants.keys()]).map((k) => (
      <div style={{ display: "flex" }} key={k}>
        {k.map((l) => (
          <ParticipantView key={l} participantId={l} />
        ))}
      </div>
    ))}
  </div>
  )
}

export default ParticipantsView