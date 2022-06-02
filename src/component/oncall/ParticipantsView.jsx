import React from 'react'
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  useConnection,
  usePubSub,
} from "@videosdk.live/react-sdk";
import { Text  } from '@chakra-ui/react'
import { useVideoCall } from '../../lib/callContext';
import ParticipantView from './ParticipantView'
import { Grid,Box,useBreakpointValue,IconButton } from '@chakra-ui/react'
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const ParticipantsView = () => {
  const { participants } = useMeeting();
  const {chunk} = useVideoCall()
  const [slider, setSlider] = React.useState(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const settings = {
    dots: true,
    arrows: true,
    // fade: true,
    infinite: false,
    // autoplay: true,
    // speed: 500,
    // autoplaySpeed: 5000,
    centerMode: true,
    slidesToShow: 1,
    rows: 2,
    slidesPerRow: 2
  };
  
  return (
    <Box
    position={'relative'}
    minH={'800px'}
    width={'full'}
    overflow={'hidden'}
  >
     
    <Grid 
      templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)' ,'repeat(2, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)'  ]}
      mb={"10px"}
    >
     
        {chunk([...participants.keys()]).map((k) => (
          <Box key={k}
        
          >
            {k.map((l) => (
              <ParticipantView key={l} participantId={l} />
            ))}
          </Box>
        ))}
     
    </Grid>
  </Box>
  )
}

export default ParticipantsView