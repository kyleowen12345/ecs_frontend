import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import CreateMeeting from "./pages/CreateMeeting";
import Home from "./pages/Home";
import JoinMeeting from "./pages/JoinMeeting";
import Meeting from "./pages/Meeting";
import { useVideoCall, VideoCallProvider } from "./lib/callContext";

// const ProtectedRoutes = ({children}) =>{
//     return (
//         <Route 
//           {...props} 
//           render={props => (
//             this.state.authenticated ?
//               <Component {...props} /> :
//               <Redirect to='/' />
//           )} 
//         />
//       )

// }

export default function AppRoutes() {
 
    // const {readyToJoin} = useVideoCall()
    // useEffect(() => {
    //   if(readyToJoin){
        
    //   }
    
      
    // }, [readyToJoin])
    
    return (
        <>
            <Helmet>
                <title>ECS (Video Conferencing App)</title>
            </Helmet>
            <VideoCallProvider>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/" 
                        element={<Home/>} 
                    />
                    <Route 
                        path="/create-meeting"
                        element={<CreateMeeting/>} 
                    />
                    <Route 
                        path="/join-meeting"
                        element={<JoinMeeting />}
                    />

                    <Route 
                        path='/meeting/:meetingID'
                        element={<Meeting/>}
                    />
                </Routes>  
            </BrowserRouter>
            </VideoCallProvider>
        </>
    )
}