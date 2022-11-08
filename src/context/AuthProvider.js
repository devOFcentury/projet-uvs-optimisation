import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState([]);


  const value = {
    userSession,
    setUserSession,
    userData,
    setUserData
  }

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;