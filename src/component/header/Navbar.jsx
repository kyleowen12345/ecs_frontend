import React from 'react'
import {  Box, Image  } from '@chakra-ui/react'
import ecs_logo from '../../assets/images/ECS-Logo-300dpi.png';
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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
            onClick={()=>{
              navigate('/')
            }}
        />
  </Box>
  )
}

export default Navbar