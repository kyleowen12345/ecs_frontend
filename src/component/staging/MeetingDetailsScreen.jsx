import React, { useState } from "react";
import {InputGroup, Input, InputLeftAddon, InputRightAddon,  Box, Button,Grid, GridItem, Text,Tooltip   } from '@chakra-ui/react'

const MeetingDetailsScreen = ({ 
    onClickJoin,
    onClickCreateMeeting,
}) => {
  const [meetingId, setMeetingId] =useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);

  return (
        <Box
          m={6}
          style={{
            display: "flex",
            flex: 1,
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // padding: padding,
          }}>

            <Button
              style={{
                  marginBottom:"1rem"
              }}
              // color="primary"
              // variant="contained"
              onClick={onClickCreateMeeting}>
              Create Meeting
            </Button>

            <Text >OR</Text>

            <InputGroup >
                  <InputLeftAddon children='Name'  />
                  <Input placeholder='mysite' onChange={(e) => {setMeetingId(e.target.value);}}/>
                  <InputRightAddon 
                  children={ <Button
                      disabled={!meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")}
                      color="primary"
                      variant="contained"
                      onClick={(e) => {
                        if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}"))
                          onClickJoin(meetingId);
                        else setMeetingIdError(true);
                      }}
                      id={"btnJoin"}>
                      Join
                    </Button>} 
                  />
            </InputGroup>
        </Box>
  )
}

export default MeetingDetailsScreen