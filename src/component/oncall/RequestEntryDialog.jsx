import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button
  } from '@chakra-ui/react'
import { useVideoCall } from '../../lib/callContext'
import { useMeeting } from "@videosdk.live/react-sdk";
const RequestEntryDialog = ({isOpen,onOpen,onClose,cancelRef,onEntryRequested}) => {
  const {
    token,
    entryRequestLoading,
    setEntryRequestLoading,
    entryRequest,
    setEntryRequest,
    participantViewVisible,
    setParticipantViewVisible,
    myCookie,
    participantRequestAccepted,
    setParticipantRequestAccepted
  } = useVideoCall()
  
  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={()=>{
                  setParticipantRequestAccepted(false)
                  console.log(participantRequestAccepted)
              }}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>{
                  setParticipantRequestAccepted(true)
                  console.log(participantRequestAccepted)
              }} ml={3}>
                Allow
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}

export default RequestEntryDialog