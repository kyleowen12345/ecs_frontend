import React from 'react'
import {InputGroup, Input, InputLeftAddon, InputRightAddon,  Box, Button,Grid, GridItem, Text,Tooltip,Image,Icon,VStack   } from '@chakra-ui/react'
import { BsFillMicFill,BsFillMicMuteFill,BsCameraVideoFill,BsFillRecordCircleFill,BsFillChatLeftFill } from 'react-icons/bs';
import {MdGroups,MdScreenShare,MdHighQuality} from 'react-icons/md'
import {RiGroupFill} from 'react-icons/ri'
import MenuIcons from './MenuIcons';

const BottomMenu = () => {
  return (
    <Box
      display={"flex"}
      bg={"#1B1B1B"}
      justifyContent="space-between"
      alignItems={"center"}
      width={"100%"}
      p={5}
    >
         <Box
           width={"6%"}
           display={"flex"}
           justifyContent="space-between"
           alignItems={"center"}
           marginRight={20}
         >  
            <MenuIcons  icon={BsFillMicFill} label={"Mute"}/>

            <MenuIcons  icon={BsCameraVideoFill} label={"Stop Video"}/> 
         </Box>
         
         <Box
           width={"30%"}
           display={"flex"}
           justifyContent="space-between"
           alignItems={"center"}
         >   
            <MenuIcons  icon={RiGroupFill} label={"Participants"}/>

            <MenuIcons  icon={MdScreenShare} label={"Share Screen"}/>
            
            <MenuIcons  icon={BsFillChatLeftFill} label={"Chat"}/>
           
            <MenuIcons  icon={BsFillRecordCircleFill} label={"Record"}/>
           
            <MenuIcons  icon={MdHighQuality} label={"Video Quality"}/>
         </Box>
         
         <Box
           width={"10%"}
           display={"flex"}
           justifyContent="flex-end"
           alignItems={"center"}
         >
           <Button
             bg={"red"}
             color="white"
           >Leave</Button>
         </Box>
         
    </Box>
  )
}

export default BottomMenu