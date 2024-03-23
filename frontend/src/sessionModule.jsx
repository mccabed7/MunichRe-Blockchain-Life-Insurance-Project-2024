let sessionID = null; // Default value

export const setSessionID = (newID) => {
  console.log("Updating SID to: " + newID);
  sessionID = newID;
};

export const getSessionID = () => sessionID;