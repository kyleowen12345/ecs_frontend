import axios from 'axios'
const API_AUTH_URL = process.env.REACT_APP_SERVER_URL;

export const getToken = async () => {
    if(!API_AUTH_URL){
      console.error("Error: Provide only ONE PARAMETER - either Token or Auth API");
    }else if(API_AUTH_URL){
      const res = await fetch(`${API_AUTH_URL}/get-token`, {
        method: "GET",
      });
      const { token } = await res.json();
      return token;
    }else{
      console.error("Error: ", Error("Please add a token or Auth Server URL"));
    }
  };
  
  export const createMeeting = async ({ token,region }) => {
    const data =  await axios({
      method: 'post',
      url: `${API_AUTH_URL}/create-meeting/`,
      data: {
        token: token,
        region: region
      }
    });

    return data.data.meetingId;
  };
  
  export const validateMeeting = async ({ meetingId, token }) => {

    const data =  await axios({
      method: 'post',
      url: `${API_AUTH_URL}/validate-meeting/${meetingId}`,
      data: {
        token: token,
      }
    });
    const result = data.data.meetingId;

    return result ? data.data.meetingId === meetingId :false;
  
    // const url = `${API_AUTH_URL}/validate-meeting/${meetingId}`;
  
    // const options = {
    //   method: "POST",
    //   headers: { Authorization: token },
    // };
  
    // const result = await fetch(url, options)
    //   .then((response) => response.json()) //result will have meeting id
    //   .catch((error) => console.error("error", error));
    
    // return result? result.meetingId === meetingId :false;
  };