import React, { useEffect } from "react";
import { setSessionID, setEmail } from './sessionModule';
let sessionID = null;
let email = null;

const ThirdPartyClient = () => {
  useEffect(() => {
    // Automatically log in the third-party user when the component mounts
    const thirdPartyEmail = 'third@party.com';
    const thirdPartyPassword = 'asdfghjk';

    const loginThirdPartyUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/login?emailAddress=${thirdPartyEmail}&password=${thirdPartyPassword}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // console.log(response.text());
        const data = response.text();
        setSessionID(data); // Assuming the response contains a 'sid' field
        setEmail(thirdPartyEmail);
        // console.log(sessionID);
        // console.log(email);
        // console.log(data);

      } catch (error) {
        console.error('Error during third-party auto-login:', error);
      }
    };

    loginThirdPartyUser();
  }, []);

  return (
    <>
    </>
  );
};

export default ThirdPartyClient;