import React from 'react'
import {  Box, Text,Icon,Badge   } from '@chakra-ui/react'

const MenuIcons = ({icon,label,method,withBadge,badgeCount,badgeAlert}) => {
  console.log(badgeCount)
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      cursor="pointer"
      onClick={method && method}
    >
      {
        withBadge === true ?
        <Box 
           position="relative" 
           display="inline-block"
           height={"23px"}
        > 
          {
            badgeCount &&
            <Badge size="sm" bg="red" color="white" position="absolute" top="-10px" right="-10px" borderRadius="50%">{badgeCount}</Badge> 
            
          }
          {
            badgeAlert === true && 
            <Box  bg="green" color="white" position="absolute" top="-10px" right="-10px" borderRadius="50%" width={"15px"} height={"15px"}></Box>
          }
           <Icon w={6} h={6} color="#ACACAC" as={icon} />
        </Box>
        
        :
        <Icon w={6} h={6} color="#ACACAC"  as={icon} />
      }
        
        <Text fontSize={"10px"}>{label}</Text>
    </Box>
  )
}

export default MenuIcons