import React from 'react'
import {  Box, Text,Icon   } from '@chakra-ui/react'

const MenuIcons = ({icon,label}) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
    >
        <Icon w={6} h={6} color="#ACACAC"  as={icon} />
        <Text fontSize={"10px"}>{label}</Text>
    </Box>
  )
}

export default MenuIcons