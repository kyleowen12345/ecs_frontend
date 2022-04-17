import React from 'react'
import {  Box, Image  } from '@chakra-ui/react'
import ecs_logo from '../../assets/images/ECS-Logo-300dpi.png';

const Navbar = () => {
  return (
    <Box 
      padding={[2,2,2,5,5]}
      display="flex"
      justifyContent={"end"}
    >
        <Image 
            src={ecs_logo}
            width={"100px"}
            objectFit={"contain"}
        />
  </Box>
  )
}

export default Navbar