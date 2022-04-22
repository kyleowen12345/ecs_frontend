import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
  } from '@chakra-ui/react'
  import { useMeeting,useParticipant } from "@videosdk.live/react-sdk";
import MenuIcons from '../menu/MenuIcons';
import {RiGroupFill} from 'react-icons/ri'
import { useVideoCall } from '../../../lib/callContext';
import ParticipantsDetails from './participantscomponents/ParticipantsDetails';

const Participants = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {chunk} = useVideoCall()

    const {
        meetingId,
        meeting,
        localParticipant,
        mainParticipant,
        activeSpeakerId,
        participants,
        presenterId,
        localMicOn,
        localWebcamOn,
        localScreenShareOn,
        messages,
        isRecording,
        isLiveStreaming,
        pinnedParticipants,
        //
        join,
        leave,
        connectTo,
        end,
      
        // 
        startRecording,
        stopRecording,
        //
        respondEntry,
        //
        muteMic,
        unmuteMic,
        toggleMic,
        //
        disableWebcam,
        enableWebcam,
        toggleWebcam,
        //
        disableScreenShare,
        enableScreenShare,
        toggleScreenShare,
        //
        getMics,
        getWebcams,
        changeWebcam,
        changeMic,
    
        startVideo,
        stopVideo,
        resumeVideo,
        pauseVideo,
        seekVideo,
        startLivestream,
        stopLivestream,
      } = useMeeting({
       
      });
    
      const {
        displayName,
        participant,
        webcamStream,
        micStream,
        screenShareStream,
        webcamOn,
        micOn,
        screenShareOn,
        isLocal,
        isActiveSpeaker,
        isMainParticipant,
        switchTo,
        pinState,
        setQuality,
        enableMic,
        disableMic,
        // enableWebcam,
        // disableWebcam,
        pin,
        unpin,
      } = useParticipant(localParticipant && localParticipant.id, {
        
      });
   
      
  return (
    <>
    <MenuIcons icon={RiGroupFill} label={"Participants"} method={onOpen} withBadge={true} badgeCount={participants.size || 0}/>
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
             bg={"black"}
             color="white"
            >
            <ModalHeader>Participants {`(${participants.size})`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody
             
            >
              <TableContainer>
              <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Local</Th>
                  <Th>Display Name</Th>
                  <Th>Mic</Th>
                  <Th >Cam</Th>
                  <Th >Screen Share</Th>
                  <Th >Active Speaker</Th>
                  <Th >Main Participant</Th>   
                </Tr>
    </Thead>
            {chunk([...participants.keys()]).map((k) => (
                <Tbody  key={k}>
                    {k.map((l) => (
                      <Tr key={l}>
                         <ParticipantsDetails  participantId={l} />
                      </Tr>
                     
                    ))}
                </Tbody>
            ))}
             </Table>
            </TableContainer>
            </ModalBody>

            </ModalContent>
     </Modal>
     </>
  )
}

export default Participants