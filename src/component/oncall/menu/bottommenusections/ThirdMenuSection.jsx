import React from 'react'
import {  Box, Button   } from '@chakra-ui/react'

const ThirdMenuSection = ({decoded,endMeeting,leaveMeeting}) => {
  return (
    <Box
    width={["30%","30%","20%","14%","12%","10%"]}
    display={"flex"}
    justifyContent="flex-end"
    alignItems={"center"}
  >
   {
     decoded?.permissions.includes('allow_join') ? 
    <Button
      bg={"red"}
      color="white"
      _hover={{
        color:"red",
        bg:"white"
      }}
      onClick={endMeeting}
    >End</Button>
    :
    <Button
    bg={"red"}
    color="white"
    _hover={{
      color:"red",
      bg:"white"
    }}
    onClick={leaveMeeting}
  >Leave</Button>
   }
    
  </Box>
  )
}

export default ThirdMenuSection