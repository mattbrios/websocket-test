/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const AppContext = React.createContext({});
export const AppProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ socket, setSocket ] = useState(null);

  return (
    <AppContext.Provider
      value={{
        socket,
        setSocket,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);