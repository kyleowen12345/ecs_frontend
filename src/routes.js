import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import CreateMeeting from "./pages/CreateMeeting";
import Home from "./pages/Home";
import JoinMeeting from "./pages/JoinMeeting";
import Meeting from "./pages/Meeting";
import {  VideoCallProvider } from "./lib/callContext";


export default function AppRoutes() {

    
    return (
        <>
            <Helmet>
                <title>ECS - (Video Conferencing App)</title>
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