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
import { Grid,Box } from '@chakra-ui/react'

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
    {/* <Text>Participants</Text> */}
    <Grid 
      templateColumns={['repeat(2, 1fr)','repeat(2, 1fr)' ,'repeat(2, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)'  ]}
    >
    {chunk([...participants.keys()]).map((k) => (
      <Box key={k}>
        {k.map((l) => (
          <ParticipantView key={l} participantId={l} />
        ))}
      </Box>
    ))}
    </Grid>
  </div>
  )
}

export default ParticipantsView