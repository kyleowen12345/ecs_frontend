import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { VideoCallProvider } from './lib/callContext';
import { ChakraProvider } from '@chakra-ui/react';
import {Global,css} from '@emotion/react'
import '@fontsource/poppins';

import theme from './utils/theme'

const GlobalStyle = ({ children }) => {
  return (
    <>

      <Global
        styles={css`
          body{
            background-color: black;
            scroll-behavior: smooth;
          }
        `}
      />
      {children}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
      <VideoCallProvider>
        <ChakraProvider theme={theme} colorScheme={'brand'}>
          <GlobalStyle>
            <App />
          </GlobalStyle> 
        </ChakraProvider> 
      </VideoCallProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
