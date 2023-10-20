import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const setUserName = (name) => {
    setUsername(name);
  };

  return (
    <UserContext.Provider value={{ username, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};