import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Checkbox,
  

  } from '@chakra-ui/react'
  import MenuIcons from '../menu/MenuIcons';
import {MdOutlineCameraswitch} from 'react-icons/md' 
import { useMeeting,useParticipant } from "@videosdk.live/react-sdk"; 

const SwitchCamera = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [myCameras,setMyCameras] = useState(null)
    const {
        meetingId,
        meeting,
       
      } = useMeeting({
      });
      const onPress = async () => {
        // Enable Webcam in Meeting
        // meeting?.enableWebcam();
        onOpen()
      
        // Disable Webcam in Meeting
        // meeting?.disableWebcam();
      
        // Change Webcam in Meeting
        const webcams = await meeting?.getWebcams(); // returns all webcams
      
        const { deviceId, label } = webcams[0];
      
        // meeting?.changeWebcam(deviceId);
        setMyCameras(webcams)
      };
  return (
    <>
    <MenuIcons  icon={MdOutlineCameraswitch} label={"Switch Camera"} method={onPress}   />
   <Modal size="sm" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            bg={"black"}
            color="white"
            border="1px solid white"
          >
          <ModalHeader>Select Camera</ModalHeader>
          <ModalCloseButton />
          <ModalBody  >
            {
              myCameras?.map(i=>(
                <Box 
                 key={i.deviceId}
                 width={'100%'}
                 display="flex"
                 justifyContent={"space-between"}
                 alignItems="center"
                 borderBottom={"1px solid #E2E8F0"}
                 marginY="10px"
                 onClick={()=>{
                     meeting?.changeWebcam(i.deviceId)
                 }}
                >
                   <Text fontSize={"18px"} >{i.label}</Text>
                </Box>
              ))
            }
             
          </ModalBody>
          </ModalContent>
   </Modal>
 

  </>
  )
}

export default SwitchCamera