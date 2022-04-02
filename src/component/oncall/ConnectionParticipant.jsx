import React from 'react'
import { getToken } from '../../lib/api';

const ConnectionParticipant = ({ participant }) => {
    return (
        <div style={{ padding: 4, border: "1px solid blue" }}>
          <p>{participant.displayName}</p>
          <button
            onClick={async () => {
              const meetingId = prompt(
                `In Which meetingId you want to switch ${participant.displayName} ?`
              );
              const payload = prompt("enter payload you want to pass");
  
              const token = await getToken();
              if ((meetingId, token, payload)) {
                participant
                  .switchTo({ meetingId, token, payload })
                  .catch(console.log);
              } else {
                alert("Empty meetingId or payload ");
              }
            }}
            className={"button "}
          >
            Switch
          </button>
        </div>
      );
}

export default ConnectionParticipant