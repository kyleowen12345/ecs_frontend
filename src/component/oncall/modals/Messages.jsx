import React,{useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    
  } from '@chakra-ui/react'
  import {BsFillChatLeftFill} from 'react-icons/bs'
  import {AiOutlineClose} from "react-icons/ai"
import MenuIcons from '../menu/MenuIcons';
import MeetingChat from './messagecomponents//MeetingChat';

const Messages = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
     <MenuIcons  icon={BsFillChatLeftFill} label={"Chat"} withBadge={true} method={onOpen} />
     <Modal size="full" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
             bg={"black"}
             color="white"
            >
            <ModalHeader>Chat </ModalHeader>
            <ModalCloseButton />
            <ModalBody  >
               <MeetingChat/>
            </ModalBody>
            </ModalContent>
     </Modal>
    </>

  )
}

export default Messages