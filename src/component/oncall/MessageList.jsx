import React from 'react'
import {useVideoCall} from '../../lib/callContext'

const MessageList = ({messages}) => {
  const {formatAMPM} = useVideoCall()
  return (
    <div>
    {messages?.map((message, i) => {
      const { senderName, message: text, timestamp } = message;

      return (
        <div
          style={{
            margin: 8,
            backgroundColor: "darkblue",
            borderRadius: 8,
            overflow: "hidden",
            padding: 8,
            color: "#fff",
          }}
          key={i}
        >
          <p style={{ margin: 0, padding: 0, fontStyle: "italic" }}>
            {senderName}
          </p>
          <h3 style={{ margin: 0, padding: 0, marginTop: 4 }}>{text}</h3>
          <p
            style={{
              margin: 0,
              padding: 0,
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            {formatAMPM(new Date(timestamp))}
          </p>
        </div>
      );
    })}
  </div>
  )
}

export default MessageList