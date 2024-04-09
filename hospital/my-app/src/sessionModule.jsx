let sessionID = null;     // Default value
let emailAddress = null;  // Default email

export const setSessionID = (newID) => {
  console.log("Updating SID to: " + newID);
  sessionID = newID;
};

export const getSessionID = () => sessionID;


export const setEmail = (newEmail) => {
  console.log("Updating email to: " + newEmail);
  emailAddress = newEmail;
}

export const getEmail = () => emailAddress;