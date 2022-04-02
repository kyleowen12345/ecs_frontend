import React from 'react'
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    useConnection,
    usePubSub,
  } from "@videosdk.live/react-sdk";
import ConnectionParticipant from './ConnectionParticipant';

const ConnectionView = ({ connectionId }) => {
    const { connection } = useConnection(connectionId, {
        onMeeting: {
          onChatMessage: ({ message, participantId }) => {
            alert(
              `A Person ${participantId} from ${connectionId} Wants to say : ${message}`
            );
          },
        },
      });

    const connectionParticipants = [...connection.meeting.participants.values()];  
  return (
     <div
      style={{
        width,
        backgroundColor: primary,
        borderRadius: borderRadius,
        overflow: "hidden",
        margin: borderRadius,
        padding: borderRadius,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <button
        onClick={() => {
          connection.close();
        }}
        className={"button"}
      >
        Close Connection
      </button>

      <button
        onClick={() => {
          const message = prompt("Enter You Message");
          if (message) {
            connection.meeting.sendChatMessage(message);
          } else {
            alert("Empty Message ");
          }
        }}
        className={"button"}
      >
        Send Meessage
      </button>

      <button
        onClick={() => {
          connection.meeting.end();
        }}
        className={"button"}
      >
        End Meeting
      </button>
      <p>
        {connection.id} : {connection.payload}
      </p>
      {connectionParticipants.map((participant) => {
        return (
          <ConnectionParticipant
            key={`${connection.id}_${participant.id}`}
            participant={participant}
          />
        );
      })}
    </div>
  )
}

export default ConnectionView